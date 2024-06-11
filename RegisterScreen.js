
import { View, Text, Image, StatusBar, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useCallback, useReducer, useState } from 'react'
import image from '../assets/background.png';
import lights from '../assets/light.png';
import { useDispatch } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const auth = getAuth();

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationMessage, setValidationMessage] = useState('')


  let validateAndSet = (value,setValue) => {
   setValue(value)
}
function checkPassword(firstpassword,secondpassword) {
  if(firstpassword !== secondpassword){
    setValidationMessage('Passwords do not match') 
  }
  else setValidationMessage('')
}
  async function createAccount() {
    email === '' || password === '' 
    ? setValidationMessage('Required fields are missing')
    : ''
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('LoginScreen');
    } catch (error) {
      setValidationMessage(error.message);
    }
  }
  return (
    <View className="bg-slate-200 h-full w-full">

      <Image className="h-full w-full absolute" source={image} />


      <View className="flex-row justify-around w-full absolute">
        <Image className="h-[225] w-[90]" source={lights} />
        <Image className="h-[160] w-[65]" source={lights} />
      </View>

      <View className="h-full w-full flex justify-around pt-52 pb-10">

        <View className="flex items-center">
          <Text className="text-slate-100 font-bold tracking-wider text-5xl">
            Register
          </Text>
        </View>

        <View className="flex items-center mx-4 space-y-4">
          <View className="bg-black/5 h-16 p-2 rounded-full w-full">
            <Input placeholder='studentnumber@isik.edu.tr' placeholderTextColor={'gray'} value={email} onChangeText={(text) => setEmail(text)} />
          </View>

            <View className="bg-black/5 h-16 p-2 rounded-full w-full">
              <Input  placeholder='Enter a password' placeholderTextColor={'gray'} value={password} onChangeText={(value) => validateAndSet(value, setPassword)}
          secureTextEntry  />
            </View>

            <View className="bg-black/5 h-16 p-2 rounded-full w-full">
              <Input  placeholder='Confirm password' placeholderTextColor={'gray'} value={confirmPassword} onChangeText={(value) => validateAndSet(value, setConfirmPassword)} onBlur={()=>checkPassword(password,confirmPassword)}
          secureTextEntry  />
            </View>
            {<Text style={styles.error}>{validationMessage}</Text>}
            <View className="w-full">
            <Button style={{ width: '100%'}} isLoading = 'true' title="Sign Up" titleStyle={{fontSize:24}} onPress={createAccount} buttonStyle={{borderRadius:100, borderWidth:1, overflow:'hidden', height: 55, borderColor: '#64748B', backgroundColor:'#64748B'}}/>
              
            </View>
            <View className="flex-row justify-items-stretch">
              <Text className="text-lg">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                <Text className="text-gray-500 text-lg"> Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      )

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      bottom:50,
    },
    error: { marginTop: 10,
      color: '#881337',
      fontSize: 18
    }
  });

export default RegisterScreen;