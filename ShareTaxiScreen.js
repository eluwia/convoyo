import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectPhoneNumber } from '../slices/profileSlice';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '../config/firebase';
import { getAuth } from 'firebase/auth';

const ShareTaxiScreen = ({ route, navigation }) => {
  const { origin, destination } = route.params || {};
  const phoneNumber = useSelector(selectPhoneNumber);
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth();
  const user = auth.currentUser;

  const [details, setDetails] = useState({
    origin: origin ? origin.description : '',
    destination: destination ? destination.description : '',
    time: '',
    notes: '',
    email: user?.email,
    phoneNumber: phoneNumber,
  });

  const handleInputChange = (field, value) => {
    setDetails({ ...details, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(firestore, "rides"), details);
      navigation.navigate('MainScreen');
    } catch (error) {
      console.error("Error adding ride to Firestore: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share a Taxi</Text>
      <TextInput
        style={styles.input}
        placeholder="Origin"
        value={details.origin}
        onChangeText={(text) => handleInputChange('origin', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={details.destination}
        onChangeText={(text) => handleInputChange('destination', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={details.time}
        onChangeText={(text) => handleInputChange('time', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={details.notes}
        onChangeText={(text) => handleInputChange('notes', text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default ShareTaxiScreen;
