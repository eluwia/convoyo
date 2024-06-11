import { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import image from '../assets/background.png';
import lights from '../assets/light.png';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const auth = getAuth();

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const navigation = useNavigation();

  async function login() {
    if (email === '' || password === '') {
      setValidationMessage('Required fields are missing');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('MainScreen');
    } catch (error) {
      setValidationMessage(error.message);
    }
  }

  return (
    <View className="bg-slate-200 h-full w-full">
      <Image className="h-full w-full absolute" source={image} />

      <View className="flex-row justify-around w-full absolute" >
        <Image className="h-[225] w-[90]" source={lights} />
        <Image className="h-[160] w-[65]" source={lights} />
      </View>

      <View className="h-full w-full flex justify-around pt-52 pb-10">
        <View className="flex items-center">
          <Text className="text-slate-100 font-bold tracking-wider text-5xl">Login</Text>
        </View>

        <View className="flex items-center mx-4 space-y-4">
          <View className="bg-black/5 h-16 p-2 rounded-full w-full">
            <Input placeholder='studentnumber@isik.edu.tr' placeholderTextColor={'gray'} value={email} onChangeText={(text) => setEmail(text)} />
          </View>

          <View className="bg-black/5 h-16 p-2 rounded-full w-full ">
            <Input placeholder='Enter your password' placeholderTextColor={'gray'} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
          </View>
          {<Text style={styles.error}>{validationMessage}</Text>}

          <View className="w-full">
            <Button style={{ width: '100%'}} title="Login" titleStyle={{fontSize:24}} onPress={login} buttonStyle={{borderRadius:100, borderWidth:1, overflow:'hidden', height: 55, borderColor: '#64748B', backgroundColor:'#64748B'}} />
          </View>

          <View className="flex-row justify-items-stretch">
            <Text className="text-lg">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <Text className="text-gray-500 text-lg">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 50,
  },
  error: {
    marginTop: 10,
    color: '#881337',
    fontSize: 18
  },
});

export default LoginScreen;
