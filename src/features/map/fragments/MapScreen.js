import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { useSelector } from 'react-redux';

import { PlanSelectors } from 'features/plan';

import { Map } from './Map';

export const MapScreen = () => {
  const plans = useSelector(PlanSelectors.getAll);
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  return (
    <SafeAreaView style={styles.contentWrapper}>
      <SelectDropdown
        data={plans}
        defaultButtonText="Odaberi letjelicu"
        onSelect={(selectedItem) => {
          setSelectedPlan(selectedItem);
        }}
        defaultValueByIndex={0}
        rowTextForSelection={(item) => item.name}
        buttonTextAfterSelection={(item) => item.name}
      />
      <View style={styles.mapWrapper}>
        <Map key={selectedPlan} points={selectedPlan.selectedPoints} isAnimated />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    justifyContent: 'space-around',
  },
  mapWrapper: {
    height: Platform.OS === 'ios' ? 680 : 640,
  },
});
