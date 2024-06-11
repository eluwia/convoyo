import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen}  />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
}