import React, { useState, useCallback, useEffect } from 'react';
import { Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as Location from 'expo-location';

const GetOutApp = (props) => {
  const { increment } = props;
  const [homeLocation, setHomeLocation] = useState(null);

  useEffect(() => {
    const getMyValue = async () => {
      await Location.requestPermissionsAsync();
      const value = await AsyncStorage.getItem('@home_location');
      setHomeLocation(JSON.parse(value));
    };
    if (!homeLocation) {
      getMyValue();
    }
  }, [homeLocation]);

  useEffect(() => {
    const cb = Location.watchPositionAsync(
      { timeInterval: 2000, accuracy: Location.Accuracy.Highest },
      handlePositionWatch
    );
    return () => {
      cb.then(({ remove }) => remove());
    };
  }, [handlePositionWatch]);

  const handlePositionWatch = useCallback(
    (observedLocation) => {
      const {
        coords: { longitude, latitude },
      } = observedLocation;

      if (homeLocation) {
        const { longitude: homeLon, latitude: homeLat } = homeLocation;
        const diff = getDistanceFromLatLonInKm(homeLat, homeLon, latitude, longitude);
        console.log(diff);
        if (diff > 0.1) {
          console.log('addPoints');
          increment();
        }
      }
    },
    [increment, homeLocation]
  );

  const saveHomeLocation = useCallback(() => {
    const save = async () => {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      try {
        await AsyncStorage.setItem('@home_location', JSON.stringify(currentLocation.coords));
        setHomeLocation(currentLocation.coords);
      } catch (e) {
        // saving error
      }
    };
    save();
  }, []);

  const clearHome = useCallback(() => {
    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem('@home_location');
        setHomeLocation(null);
      } catch (e) {
        // remove error
      }
    };
    removeValue();
  }, []);

  return !homeLocation ? (
    <>
      <Button title={'Set Home Location'} onPress={saveHomeLocation} />
    </>
  ) : (
    <>
      <Button title={'Clear Home Location'} onPress={clearHome} />
    </>
  );
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export default GetOutApp;
