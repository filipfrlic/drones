import React, { useEffect, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, View } from 'react-native';
import MapView, { AnimatedRegion, Marker } from 'react-native-maps';
import haversine from 'haversine-distance';
import PropTypes from 'prop-types';

import { Button } from 'core/ui';

import { DroneIcon } from '../assets';
import { calculateTime } from '../services';

const droneSpeed = 200 * 0.277777778; // 200 km/h to m/s

export const Map = ({ points, isAnimated }) => {
  const [animRegion, setAnimRegion] = useState(new AnimatedRegion(points[0]));

  const markerPoints = points.map(({ latitude, longitude }) => (
    <Marker key={latitude + longitude} coordinate={{ latitude, longitude }} />
  ));

  useEffect(() => {
    setAnimRegion(new AnimatedRegion(points[0]));
  }, [points]);

  const startAnimation = () => {
    const data = points.map((nextPoint, index) => {
      if (!points[index + 1]) {
        return null;
      }
      const distance = haversine(nextPoint, points[index + 1]);

      const duration = calculateTime(distance, droneSpeed);

      return {
        ...points[index + 1],
        duration,
      };
    });

    const animatedList = data.filter((d) => d).map((d) => animRegion.timing(d));

    Animated.sequence(animatedList).start();
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 45.5911677,
            longitude: 16.2285311,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markerPoints}
          <Marker.Animated coordinate={animRegion}>
            <DroneIcon style={styles.droneColor} width={40} height={40} />
          </Marker.Animated>
        </MapView>
      </SafeAreaView>
      {isAnimated && (
        <View style={styles.buttonWrapper}>
          <Button title="Pokreni" onPress={startAnimation} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  wrapper: {
    height: '100%',
    justifyContent: 'flex-end',
  },
  droneColor: {
    color: 'black',
  },
  buttonWrapper: {
    padding: 12,
  },
});

Map.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  ).isRequired,
  isAnimated: PropTypes.bool,
};

Map.defaultProps = {
  isAnimated: false,
};
