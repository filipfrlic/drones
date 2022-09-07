import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { DeleteIcon } from 'core/assets';
import { generateId } from 'core/services';
import { Button, TextInput } from 'core/ui';

import { PointActions } from '../redux';

export const NewPoint = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id, title } = route.params || {};

  const point = useSelector((state) => state.points.find((d) => d.id === id));

  const [name, setName] = useState(id ? title : '');
  const [markerPosition, setMarkerPosition] = useState(
    id
      ? {
          latitude: point?.latitude,
          longitude: point?.longitude,
        }
      : '',
  );

  const isDisabled = !name || !markerPosition;

  const newId = generateId();

  const handleDelete = useCallback(() => {
    dispatch(PointActions.remove(id));
    return navigation.goBack();
  }, [dispatch, id, navigation]);

  const RightIcon = useCallback(
    () => (
      <Pressable onPress={handleDelete}>
        <DeleteIcon width={24} height={24} style={styles.icon} />
      </Pressable>
    ),
    [handleDelete],
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Nova Točka',
    });
    if (title) {
      navigation.setOptions({
        title,
        headerRight: RightIcon,
      });
    }
  }, [title, navigation, RightIcon]);

  const handleTextChange = (text) => {
    setName(text);
  };

  const handleNewPress = () => {
    if (name && markerPosition) {
      dispatch(PointActions.add({ id: newId, name, ...markerPosition }));
      return navigation.goBack();
    }
  };

  const handleUpdatePress = () => {
    dispatch(PointActions.update({ id, name, ...markerPosition }));
    return navigation.goBack();
  };

  const handleMapPress = (e) => {
    setMarkerPosition(e.nativeEvent.coordinate);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput onChangeText={handleTextChange} value={name} placeholder="Ime" />
      <MapView
        onPress={handleMapPress}
        style={styles.map}
        initialRegion={{
          latitude: 45.5911677,
          longitude: 16.2285311,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markerPosition && <Marker coordinate={markerPosition} />}
      </MapView>
      {id ? (
        <View>
          <Button title="Ažuriraj" onPress={handleUpdatePress} />
        </View>
      ) : (
        <Button title="Dodaj" onPress={handleNewPress} disabled={isDisabled} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20,
  },
  icon: {
    marginRight: 12,
    color: 'black',
  },
  map: {
    height: '80%',
    marginVertical: 20,
  },
});

NewPoint.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  }),
};

NewPoint.defaultProps = {
  route: {
    params: {
      id: '',
      title: '',
    },
  },
};
