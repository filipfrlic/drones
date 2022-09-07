import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { DeleteIcon } from 'core/assets';
import { generateId } from 'core/services';
import { Button, TextInput } from 'core/ui';

import { DroneActions } from '../redux';

export const NewDrone = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id, title } = route.params || {};

  const [name, setName] = useState(id ? title : '');
  const newId = generateId();

  const handleDelete = useCallback(() => {
    dispatch(DroneActions.remove(id));
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
    dispatch(DroneActions.add({ id: newId, name }));
    return navigation.goBack();
  };

  const handleUpdatePress = () => {
    dispatch(DroneActions.update({ id, name }));
    return navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      <TextInput onChangeText={handleTextChange} value={name} placeholder="Ime" />
      {id ? (
        <Button title="Azuriraj" onPress={handleUpdatePress} />
      ) : (
        <Button title="Dodaj" onPress={handleNewPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: 12,
    color: 'black',
  },
});
