import React, {useState, useCallback} from 'react';

import {Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import * as Location from 'expo-location';

const GetOutApp = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [homeLocation, setHomeLocation] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let {status} = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //     }
  //
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     console.log("ASD")
  //   })();
  // });

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  const saveHomeLocation = useCallback(() => {
    const save = async () => {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      try {
        await AsyncStorage.setItem(
          '@home_location',
          JSON.stringify(currentLocation.coords),
        );

        setHomeLocation(currentLocation.coords);
      } catch (e) {
        // saving error
      }
    };
    save();
  }, []);

  return !homeLocation ? (
    <>
      <Button title={'Set Home Location'} onPress={saveHomeLocation} />
    </>
  ) : (
    <Text>home: {JSON.stringify(homeLocation)}</Text>
  );
};

export default GetOutApp;
