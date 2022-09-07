import React from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Button, Separator, Text } from 'core/ui';

import { PlanSelectors } from '../redux';

export const PlanScreen = () => {
  const plans = useSelector(PlanSelectors.getAll);

  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate('Novi Plan', item);
  };

  const renderItem = ({ item }) => (
    <Pressable style={styles.itemWrapper} onPress={() => handleItemPress(item)}>
      <Text bold>{item.name}</Text>
    </Pressable>
  );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={plans}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Separator}
      />
      <Button
        title="Novi plan"
        onPress={() => {
          navigation.navigate('Novi Plan');
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
