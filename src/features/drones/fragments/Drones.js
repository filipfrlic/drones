import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Button, Separator, Text } from 'core/ui';

import { DroneSelectors } from '../redux';

export const DronesScreen = () => {
  const navigation = useNavigation();
  const drones = useSelector(DroneSelectors.getAll);

  const handleItemPress = (item) => {
    navigation.navigate('Nova letjelica', { id: item.id, title: item.name });
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.itemWrapper} onPress={() => handleItemPress(item)}>
      <Text bold align>
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={drones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Separator}
      />
      <Button
        title="Nova letjelica"
        onPress={() => {
          navigation.navigate('Nova letjelica');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    margin: 8,
    height: 32,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
});
