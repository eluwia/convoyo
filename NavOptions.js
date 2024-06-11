import React from 'react';
import { Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: "001",
    title: "New",
    image: require('../assets/rider.png'), // Update with correct image path
    screen: "NewRideScreen",
  },
  {
    id: "003",
    title: "Request",
    image: require('../assets/create.png'), // Update with correct image path
    screen: "RequestRideScreen",
  },
  {
    id: "004",
    title: "Taxi",
    image: require('../assets/taxi.png'), // Update with correct image path
    screen: "ShareTaxiScreen",
  },
];

const NavOptions = ({ origin, destination }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen, { origin, destination })}
          style={{
            backgroundColor: 'white',
            padding: 5,
            paddingLeft: 10,
            paddingBottom: 0,
            paddingTop: 0,
            margin: 14,
            width: 100,
            height: 150,
            top: -2,
            borderRadius: 10,
            alignItems: "center"
          }}>
          <View>
            <Image style={{ width: 80, height: 80, resizeMode: "contain", opacity: 0.9 }} source={item.image} />
            <Text style={{
              color: '#29343C',
              marginTop: 6,
              textAlign: 'left',
              fontWeight: '600',
              fontSize: 16,
              paddingBottom: 5
            }}>{item.title}</Text>
            <Icon
              style={{ padding: 3, backgroundColor: '#c8c8c8', borderRadius: 120, width: 30, height: 30, marginTop: 4, opacity: 0.9, }}
              type="antdesign" color="white" name="arrowright"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

export default NavOptions;
