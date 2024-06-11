
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainScreen from '../screens/MainScreen';
import NewRideScreen from '../screens/NewRideScreen';
import RequestRideScreen from '../screens/RequestRideScreen';
import ShareTaxiScreen from '../screens/ShareTaxiScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown:false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="MainScreen" component={MainScreen}/>
      <Stack.Screen name="NewRideScreen" component={NewRideScreen}/>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      <Stack.Screen name="RequestRideScreen" component={RequestRideScreen}/>
      <Stack.Screen name="ShareTaxiScreen" component={ShareTaxiScreen}/>
    </Stack.Navigator>
  );
}
