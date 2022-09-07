import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { DeleteIcon } from 'core/assets';
import { generateId } from 'core/services';
import { Button, Separator, Text, TextInput } from 'core/ui';

import { DroneSelectors } from 'features/drones';
import { PointSelectors } from 'features/points';
import { colors } from 'features/theme';

import { PlanActions } from '../redux';

export const NewPlan = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { id, name: planTitle, selectedPoints: sPoints, drone } = route.params || {};

  const [name, setName] = useState(id ? planTitle : '');
  const [selectedPoints, setSelectedPoints] = useState(id ? sPoints : []);
  const drones = useSelector(DroneSelectors.getAll);

  const [selectedDrone, setSelectedDrone] = useState(drone ?? null);
  const points = useSelector(PointSelectors.getAll);

  const handleDelete = useCallback(() => {
    dispatch(PlanActions.remove(id));
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
    if (planTitle) {
      navigation.setOptions({
        title: planTitle,
        headerRight: RightIcon,
      });
    }
  }, [planTitle, navigation, RightIcon]);

  const handleTextChange = (text) => {
    setName(text);
  };

  const handleNewPress = () => {
    const newId = generateId();

    dispatch(PlanActions.add({ id: newId, name, selectedPoints, drone: selectedDrone }));
    return navigation.goBack();
  };

  const handleUpdatePress = () => {
    dispatch(PlanActions.update({ id, name, selectedPoints, drone: selectedDrone }));
    return navigation.goBack();
  };

  const renderPointItem = ({ item }) => (
    <Pressable
      onPress={() => {
        setSelectedPoints([...selectedPoints, item]);
      }}
      style={styles.buttonPadding}
    >
      <Text size={18}>{item.name}</Text>
    </Pressable>
  );

  const renderSelectedPointItem = ({ item }) => (
    <Pressable
      onPress={() => {
        setSelectedPoints(selectedPoints.filter((d) => d.id !== item.id));
      }}
      style={styles.buttonPadding}
    >
      <Text size={18}>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        <Text bold size={18}>
          Ime plana
        </Text>
        <TextInput onChangeText={handleTextChange} value={name} placeholder="Ime plana" />
        <Separator style={styles.separator} />
        <View style={styles.selectWrapper}>
          <Text bold size={18}>
            Letjelica
          </Text>
          <SelectDropdown
            data={drones}
            defaultButtonText="Odaberi letjelicu"
            onSelect={(selectedItem) => {
              setSelectedDrone(selectedItem);
            }}
            rowTextForSelection={(item) => item.name}
            buttonTextAfterSelection={(item) => item.name}
            defaultValue={selectedDrone}
          />
        </View>
        <Separator style={styles.separator} />
        <Text bold size={18}>
          Točke plana
        </Text>
        <FlatList
          style={styles.flex}
          data={selectedPoints}
          renderItem={renderSelectedPointItem}
          contentContainerStyle={styles.flatListContainerStyle}
        />
        <Separator style={styles.separator} />
        <Text bold size={18}>
          Sve točke
        </Text>
        <FlatList
          style={styles.flex}
          data={points}
          renderItem={renderPointItem}
          contentContainerStyle={styles.flatListContainerStyle}
        />
      </View>
      {id ? (
        <View>
          <Button title="Azuriraj" onPress={handleUpdatePress} />
        </View>
      ) : (
        <Button title="Dodaj" onPress={handleNewPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
  },
  flatListContainerStyle: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  icon: {
    marginRight: 12,
    color: 'black',
  },
  buttonPadding: {
    padding: 8,
  },
  flex: {
    flex: 1,
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
  },
  selectWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

NewPlan.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      selectedPoints: PropTypes.arrayOf(PropTypes.shape()),
      drone: PropTypes.shape(),
    }),
  }).isRequired,
};
