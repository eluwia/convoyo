import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setOrigin, selectOrigin, selectDestination } from '../slices/navSlice';
import NavOptions from '../components/NavOptions';
import UpcomingRides from '../components/UpcomingRides';
import { GOOGLE_MAPS_APIKEY } from '@env';
import Map from '../components/Map';
import { useNavigation } from '@react-navigation/native';
import profile from '../assets/profile-circle.png';

const MainScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map origin={origin?.location} destination={destination?.location} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Image style={{ height: 35, width: 35 }} source={profile} />
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.searchContainer}>
          <GooglePlacesAutocomplete
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            placeholder="Where From?"
            styles={autocompleteStyles}
            onPress={(data, details = null) => {
              dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description,
              }));
              dispatch(setDestination(null));
            }}
            fetchDetails={true}
            returnKeyType="search"
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
          />
          <GooglePlacesAutocomplete
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            placeholder="Where To?"
            styles={autocompleteStyles}
            onPress={(data, details = null) => {
              dispatch(setDestination({
                location: details.geometry.location,
                description: data.description,
              }));
            }}
            fetchDetails={true}
            returnKeyType="search"
            enablePoweredByContainer={false}
            minLength={2}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
          />
        </View>
        <NavOptions origin={origin} destination={destination} />
        <TouchableOpacity
          style={styles.requestRideButton}
          onPress={() => navigation.navigate('RequestRideScreen', { origin, destination })}
        >
          <Text style={styles.requestRideButtonText}>Request a Ride</Text>
        </TouchableOpacity>
        <Text style={styles.upcomingRidesText}>Upcoming Rides</Text>
        <UpcomingRides />
      </View>
    </View>
  );
};

export default MainScreen;

const autocompleteStyles = {
  container: {
    marginTop: 4,
    flex: 0,
    paddingLeft: 3,
  },
  textInput: {
    borderRadius: 90,
    fontSize: 18,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edeef0",
  },
  mapContainer: {
    width: '100%',
    height: Dimensions.get('window').height / 2.5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 8,
  },
  welcomeText: {
    color: '#2d3748',
    fontWeight: 'bold',
    fontSize: 24,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  searchContainer: {
    paddingRight: 5,
    width: Dimensions.get('screen').width - 14,
    marginTop: 5,
  },
  upcomingRidesText: {
    color: '#2d3748',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: -230,
    paddingLeft: 7,
  },
  requestRideButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  requestRideButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
