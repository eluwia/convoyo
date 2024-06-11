import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';

const Map = ({ origin, destination }) => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (origin) {
      setRegion({
        latitude: origin.lat,
        longitude: origin.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [origin]);

  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={region}
      region={region}
    >
      {origin && <Marker coordinate={{ latitude: origin.lat, longitude: origin.lng }} title="Origin" />}
      {destination && <Marker coordinate={{ latitude: destination.lat, longitude: destination.lng }} title="Destination" />}
      {origin && destination && (
        <MapViewDirections
          origin={{ latitude: origin.lat, longitude: origin.lng }}
          destination={{ latitude: destination.lat, longitude: destination.lng }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onError={(errorMessage) => {
            console.warn(`MapViewDirections Error: ${errorMessage}`);
          }}
        />
      )}
    </MapView>
  );
};

export default Map;
