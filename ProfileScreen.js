import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { setLicense, setPhoneNumber, selectLicense, selectPhoneNumber } from '../slices/profileSlice';
import { getAuth } from 'firebase/auth';

const ProfileScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const license = useSelector(selectLicense);
  const phoneNumber = useSelector(selectPhoneNumber);
  const [loading, setLoading] = useState(false);
  const [inputPhoneNumber, setInputPhoneNumber] = useState(phoneNumber || '');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Assuming we have phoneNumber stored elsewhere and fetched here
        const profileData = await new Promise((resolve) =>
          setTimeout(() => resolve({ license: null, phoneNumber: null }), 1000)
        );
        dispatch(setLicense(profileData.license));
        dispatch(setPhoneNumber(profileData.phoneNumber));
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      dispatch(setLicense(result.uri));
    }
  };

  const handleSaveProfile = () => {
    dispatch(setPhoneNumber(inputPhoneNumber));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Text>Email: {user?.email}</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={inputPhoneNumber}
        onChangeText={setInputPhoneNumber}
      />
      <Button title="Save Profile" onPress={handleSaveProfile} />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {license && <Image source={{ uri: license }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default ProfileScreen;
