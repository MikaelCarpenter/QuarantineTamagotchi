/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App: () => React$Node = () => {
  return (
    // <View styles={styles.appContainer}>
    //   <StatusBar barStyle="dark-content" />
    //   <SafeAreaView>
    //     <View styles={styles.avatarContainer}>
    //       <Text>Test</Text>
    //     </View>
    //   </SafeAreaView>
    // </View>

    <View style={styles.appContainer}>
      <SafeAreaView>
        <Text style={styles.appTitle}>Quarantine Tamagotchi</Text>
        <View>
          <Text style={styles.pointCounter}>$209</Text>
          <View style={styles.avatarContainer}>
            <Text>Hello World!</Text>
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
    fontWeight: '900',
    fontSize: 24,
    marginBottom: 100,
    textAlign: 'center',
  },

  pointCounter: {
    marginLeft: 8,
    marginBottom: 4,
    fontWeight: '600',
  },

  avatarContainer: {
    height: 300,
    width: 300,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
