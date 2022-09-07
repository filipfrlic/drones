/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

import { DronesScreen, NewDrone } from 'features/drones';
import { MapScreen } from 'features/map';
import { NewPlan, PlanScreen } from 'features/plan';
import { NewPoint, PointScreen } from 'features/points';

import { DroneIcon, MapIcon, PlanIcon, PointIcon } from '../assets';

const Tab = createBottomTabNavigator();

const DroneStackNavigator = createStackNavigator();

const PointsStackNavigator = createStackNavigator();

const PlanTabNavigator = createStackNavigator();

const PointsStack = () => (
  <PointsStackNavigator.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: 'black',
    }}
  >
    <PointsStackNavigator.Screen name="Tocke" component={PointScreen} />
    <PointsStackNavigator.Screen name="Nova Tocka" component={NewPoint} />
  </PointsStackNavigator.Navigator>
);

const DroneStack = () => (
  <DroneStackNavigator.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: 'black',
    }}
  >
    <DroneStackNavigator.Screen name="Letjelice" component={DronesScreen} />
    <DroneStackNavigator.Screen name="Nova letjelica" component={NewDrone} />
  </DroneStackNavigator.Navigator>
);

const PlanStack = () => (
  <PlanTabNavigator.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerTintColor: 'black',
    }}
  >
    <PlanTabNavigator.Screen name="Plan" component={PlanScreen} />
    <PlanTabNavigator.Screen name="Novi Plan" component={NewPlan} />
  </PlanTabNavigator.Navigator>
);

const Icon = ({ Svg, focused }) => (
  <Svg
    width={24}
    height={24}
    // eslint-disable-next-line react-native/no-inline-styles
    style={{
      color: focused ? 'black' : 'gray',
    }}
  />
);

Icon.propTypes = {
  Svg: PropTypes.elementType.isRequired,
  focused: PropTypes.bool.isRequired,
};

export const App = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
    <Tab.Screen
      name="DroneStack"
      component={DroneStack}
      options={{
        tabBarIcon: ({ focused }) => <Icon Svg={DroneIcon} focused={focused} />,
      }}
    />
    <Tab.Screen
      name="PointsStack"
      component={PointsStack}
      options={{
        tabBarIcon: ({ focused }) => <Icon Svg={PointIcon} focused={focused} />,
      }}
    />
    <Tab.Screen
      name="PlanStack"
      component={PlanStack}
      options={{
        tabBarIcon: ({ focused }) => <Icon Svg={PlanIcon} focused={focused} />,
      }}
    />
    <Tab.Screen
      name="Karta"
      component={MapScreen}
      options={{
        tabBarIcon: ({ focused }) => <Icon Svg={MapIcon} focused={focused} />,
      }}
    />
  </Tab.Navigator>
);
