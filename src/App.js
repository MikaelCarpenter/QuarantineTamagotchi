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
      <SafeAreaView>
        <Text style={styles.appTitle}>Quarantine Tamagotchi</Text>
        <View>
          <Text style={styles.pointCounter}>${points}</Text>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../assets/animations/short/Idle.gif')}
              style={styles.avatar}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: '#f2f3f4',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },

  appTitle: {
    fontFamily: 'Connection III',
    fontWeight: '900',
    fontSize: 24,
    marginBottom: 100,
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
    height: 300,
    width: 300,
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
});

export default App;
