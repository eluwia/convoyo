import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import firebaseApp from '../config/firebase';

const RideItem = React.memo(({ ride }) => {
  return (
    <View style={styles.rideContainer}>
      <Text style={styles.rideDetail}>Origin: {ride.origin}</Text>
      <Text style={styles.rideDetail}>Destination: {ride.destination}</Text>
      <Text style={styles.rideDetail}>Time: {ride.time}</Text>
      <Text style={styles.rideDetail}>Notes: {ride.notes}</Text>
      <Text style={styles.rideDetail}>Email: {ride.email}</Text>
      <Text style={styles.rideDetail}>Phone: {ride.phoneNumber}</Text>
    </View>
  );
});

const UpcomingRides = () => {
  const [rides, setRides] = useState([]);
  const firestore = getFirestore(firebaseApp);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'rides'), (querySnapshot) => {
      const ridesArray = [];
      querySnapshot.forEach((doc) => {
        ridesArray.push({ id: doc.id, ...doc.data() });
      });

      // Sort rides by time
      const sortedRides = ridesArray.slice(0, 5).sort((a, b) => {
        const [aTime] = a.time.split(',');
        const [bTime] = b.time.split(',');
        const [aHour, aMinute] = aTime.split('.').map((str) => parseInt(str));
        const [bHour, bMinute] = bTime.split('.').map((str) => parseInt(str));

        if (aHour !== bHour) {
          return aHour - bHour;
        } else {
          return aMinute - bMinute;
        }
      });

      setRides(sortedRides);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RideItem ride={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    maxHeight: 150,
    flex: 1,
    padding: 4,
    borderRadius: 20,
    backgroundColor: '#ffffff',
  },
  rideContainer: {
    padding: 8,
    borderBottomWidth: 3,
    borderBottomColor: '#cccccc',
  },
  rideDetail: {
    fontSize: 14,
    marginBottom: 1,
  },
});

export default UpcomingRides;
