/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useReducer} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const INIT_STATE = {points: 500};

const reducer = (state, action) => {
  const {points} = state;
  switch (action.type) {
    case 'WALK':
      return {points: points + 50};
    default:
      return state;
  }
};

const App: () => React$Node = () => {
  const [{points}, dispatch] = useReducer(reducer, INIT_STATE);

  return (
    <View style={styles.appContainer}>
      <SafeAreaView style={{flex: 1, width: '100%'}}>
        <Text style={styles.appTitle}>Quarantine Tamagotchi</Text>
        <View style={{flex: 4}}>
          <Text style={styles.pointCounter}>${points}</Text>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/animations/Idle.gif')}
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.menuContainer}>
          <Text>Menu</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text>Button</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
    paddingLeft: 32,
    paddingRight: 32,
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
  },
});

export default App;
