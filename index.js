// navigation/index.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import AuthStack from './authStack';
import UserStack from './userStack';
import { useAuthentication } from '../utils/useAuthentication';

const Stack = createStackNavigator();

export default function RootNavigation() {
  const { user, isLoading } = useAuthentication();
  const [isSplashLoading, setIsSplashLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashLoading(false);
    }, 3500); // 3 seconds for splash screen

    return () => clearTimeout(timer);
  }, []);

  if (isSplashLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        ) : user ? (
          <Stack.Screen name="UserStack" component={UserStack} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
