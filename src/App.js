/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useReducer } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GetOutApp from './listeners/location';

const INIT_STATE = { points: 500, showActionMenu: false, showSuccess: false };

const reducer = (state, action) => {
  const { points } = state;
  switch (action.type) {
    case 'OPEN_ACTIONS':
      return { ...state, showActionMenu: true };
    case 'WALK':
      return { points: points + 50, showActionMenu: false, showSuccess: true };
    case 'END_SUCCESS':
      return { ...state, showSuccess: false };
    default:
      return state;
  }
};

const App: () => React$Node = () => {
  const [{ points, showActionMenu, showSuccess }, dispatch] = useReducer(reducer, INIT_STATE);

  const handleWalkCompleted = useCallback(() => {
    dispatch({ type: 'WALK' });

    setTimeout(() => {
      dispatch({ type: 'END_SUCCESS' });
    }, 3000);
  }, []);

  const handleActionPress = useCallback(() => {
    dispatch({ type: 'OPEN_ACTIONS' });
  }, []);

  return (
    <View style={styles.appContainer}>
      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        <Text style={styles.appTitle}>Quarantine Tamagotchi</Text>
        <View style={{ flex: 4 }}>
          <Text style={styles.pointCounter}>${points}</Text>
          <View style={styles.avatarContainer}>
            {showSuccess && (
              <>
                <Image source={require('../assets/animations/fireworks_1.gif')} style={styles.fireworks1} />
                <Image source={require('../assets/animations/fireworks_2.gif')} style={styles.fireworks2} />
              </>
            )}
            <Image source={require('../assets/animations/plain_idle.gif')} style={styles.avatar} />
          </View>
        </View>
        <View style={styles.menuContainer}>
          {showActionMenu && (
            <>
              <TouchableOpacity onPress={handleWalkCompleted}>
                <Text style={styles.actionMenuOption}>• Went for a walk</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleWalkCompleted}>
                <Text style={styles.actionMenuOption}>• Journaled</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleWalkCompleted}>
                <Text style={styles.actionMenuOption}>• Cooked a healthy meal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleWalkCompleted}>
                <Text style={styles.actionMenuOption}>• Called a friend</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
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
        <GetOutApp />
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

  fireworks1: {
    position: 'absolute',
    top: 16,
    left: 32,
    width: 64,
    height: 64,
  },

  fireworks2: {
    position: 'absolute',
    top: 64,
    right: 32,
    width: 64,
    height: 64,
  },

  menuContainer: {
    flex: 4,
    width: '100%',
    marginTop: 32,
  },

  actionMenuOption: {
    fontFamily: 'Connection III',
    fontSize: 24,
    marginBottom: 8,
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
