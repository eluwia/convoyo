// screens/SplashScreen.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import logo from '../assets/splashscreenicon.png';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#334155',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
