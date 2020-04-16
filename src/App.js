/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useCallback, useMemo, useReducer } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GetOutApp from './listeners/location';

const INIT_STATE = {
  avatar: 'plain_idle',
  points: 1200,
  items: [],
  showActionMenu: false,
  showSuccess: false,
  showStore: false,
};

const reducer = (state, action) => {
  const { points, items } = state;
  switch (action.type) {
    case 'OPEN_ACTIONS':
      return { ...state, showActionMenu: true, showStore: false };
    case 'OPEN_STORE':
      return { ...state, showStore: true, showActionMenu: false };
    case 'WALK':
      return { ...state, points: points + 50, showActionMenu: false, showSuccess: true };
    case 'CURLS':
      return { ...state, points: points + 100, showActionMenu: false, showSuccess: true, avatar: 'plain_curls' };
    case 'BUY_FLOWERS':
      return { ...state, showStore: false, items: items.concat(['Flowers']), points: points - 100 };
    case 'BUY_DRESSER':
      return { ...state, showStore: false, items: items.concat(['Dresser']), points: points - 400 };
    case 'BUY_PICTURE':
      return { ...state, showStore: false, items: items.concat(['Picture']), points: points - 700 };
    case 'BUY_HEADBAND':
      return { ...state, showStore: false, avatar: 'headband_idle', points: points - 50 };
    case 'END_SUCCESS':
      return { ...state, showSuccess: false, avatar: 'plain_idle' };
    default:
      return state;
  }
};

const App: () => React$Node = () => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { avatar, points, items, showActionMenu, showSuccess, showStore } = state;

  const handleWalkCompleted = useCallback(() => {
    dispatch({ type: 'WALK' });

    setTimeout(() => {
      dispatch({ type: 'END_SUCCESS' });
    }, 2500);
  }, []);

  const handleCurlsCompleted = useCallback(() => {
    dispatch({ type: 'CURLS' });

    setTimeout(() => {
      dispatch({ type: 'END_SUCCESS' });
    }, 2500);
  }, []);

  const handleBuyFlowers = useCallback(() => {
    dispatch({ type: 'BUY_FLOWERS' });
  }, []);

  const handleBuyDresser = useCallback(() => {
    dispatch({ type: 'BUY_DRESSER' });
  }, []);

  const handleBuyPicture = useCallback(() => {
    dispatch({ type: 'BUY_PICTURE' });
  }, []);

  const handleBuyHeadband = useCallback(() => {
    dispatch({ type: 'BUY_HEADBAND' });
  }, []);

  const handleActionPress = useCallback(() => {
    dispatch({ type: 'OPEN_ACTIONS' });
  }, []);

  const handleStorePress = useCallback(() => {
    dispatch({ type: 'OPEN_STORE' });
  }, []);

  const avatarImage = useMemo(() => {
    switch (avatar) {
      case 'plain_curls':
        return require('../assets/animations/plain_curls.gif');
      case 'headband_idle':
        return require('../assets/animations/headband_idle.gif');
      default:
        return require('../assets/animations/plain_idle.gif');
    }
  }, [avatar]);

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
            {items.includes('Flowers') && (
              <Image source={require('../assets/static/2x/Flowers.gif')} style={styles.flowers} />
            )}
            {items.includes('Dresser') && (
              <Image source={require('../assets/static/2x/Dresser.gif')} style={styles.dresser} />
            )}
            {items.includes('Picture') && (
              <Image source={require('../assets/static/2x/Picture.gif')} style={styles.picture} />
            )}
            <Image source={avatarImage} style={styles.avatar} />
          </View>
        </View>
        <View style={styles.menuContainer}>
          {showActionMenu && (
            <>
              <TouchableOpacity onPress={handleWalkCompleted}>
                <Text style={styles.actionMenuOption}>• Went for a walk</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCurlsCompleted}>
                <Text style={styles.actionMenuOption}>• Worked out</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleWalkCompleted}>
                <Text style={styles.actionMenuOption}>• Journaled</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleWalkCompleted}>
                <Text style={styles.actionMenuOption}>• Called a friend</Text>
              </TouchableOpacity>
            </>
          )}
          {showStore && (
            <>
              <TouchableOpacity onPress={handleBuyHeadband}>
                <Text style={styles.actionMenuOption}>• Headband-$50</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBuyFlowers}>
                <Text style={styles.actionMenuOption}>• Flowers-$100</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBuyDresser}>
                <Text style={styles.actionMenuOption}>• Dresser-$400</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBuyPicture}>
                <Text style={styles.actionMenuOption}>• Picture-$700</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleActionPress}>
            <Text style={styles.buttonText}>?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleStorePress}>
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

  flowers: {
    position: 'absolute',
    bottom: 4,
    right: 16,
    width: 32,
    height: 32,
  },

  picture: {
    position: 'absolute',
    bottom: 32,
    right: 64,
    width: 32,
    height: 32,
  },

  dresser: {
    position: 'absolute',
    bottom: 4,
    left: 16,
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
