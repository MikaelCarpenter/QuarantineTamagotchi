/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useReducer, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const INIT_STATE = { points: 500 };

const reducer = (state, action) => {
  const { points } = state;
  switch (action.type) {
    case 'WALK':
      return { points: points + 50 };
    default:
      return state;
  }
};

const App: () => React$Node = () => {
  const [{ points }, dispatch] = useReducer(reducer, INIT_STATE);

  const [showActionMenu, setShowActionMenu] = useState(false);

  const handleActionPress = useCallback(() => {
    setShowActionMenu(true);
  }, []);

  return (
    <View style={styles.appContainer}>
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <Text style={styles.appTitle}>Quarantine Tamagotchi</Text>
        <View style={{ flex: 4 }}>
          <Text style={styles.pointCounter}>${points}</Text>
          <View style={styles.avatarContainer}>
            <Image source={require('../assets/animations/Idle.gif')} style={styles.avatar} />
          </View>
        </View>
        <View style={styles.menuContainer}>{showActionMenu && <Text>Menu</Text>}</View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleActionPress}>
            <Text style={styles.buttonText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleActionPress}>
            <Text style={styles.buttonText}>$</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleActionPress}>
            <Text style={styles.buttonText}>A</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    ...StyleSheet.absoluteFill,
  },

  appTitle: {
    flex: 1,
    fontFamily: 'Connection III',
    fontWeight: '900',
    fontSize: 24,
    letterSpacing: 1.4,
    textAlign: 'center',
  },

  pointCounter: {
    fontFamily: 'Connection III',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    marginBottom: 4,
  },

  avatarContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 4,
  },

  avatar: {
    width: 32,
    height: 32,
  },

  menuContainer: {
    flex: 4,
    width: '100%',
    marginTop: 32,
  },

  buttonContainer: {
    flex: 1,
    width: '100%',
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontFamily: 'Connection III',
    fontSize: 32,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default App;
