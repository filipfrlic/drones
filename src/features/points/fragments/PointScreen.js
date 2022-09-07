import React, { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Button, Separator, Text } from 'core/ui';

import { PointSelectors } from '../redux';

export const PointScreen = () => {
  const navigation = useNavigation();
  const points = useSelector(PointSelectors.getAll);

  useEffect(() => {
    navigation.setOptions({
      title: 'Točke',
    });
  }, [navigation]);

  const handleItemPress = (item) => {
    navigation.navigate('Nova Tocka', { id: item.id, title: item.name });
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.itemWrapper} onPress={() => handleItemPress(item)}>
      <Text bold>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={points}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Separator}
      />
      <Button
        title="Nova Točka"
        onPress={() => {
          navigation.navigate('Nova Tocka');
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
});
