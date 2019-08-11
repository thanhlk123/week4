import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ActiveScreen from '../screens/ActiveScreen';
import AllScreen from '../screens/AllScreen';
import CompleteScreen from '../screens/CompleteScreen';
import SingleTodoScreen from '../screens/SinghleTodoScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ActiveStack = createStackNavigator(
  {
    Active: ActiveScreen,
  },
  config
);

ActiveStack.navigationOptions = {
  tabBarLabel: 'Active',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

ActiveStack.path = '';

const AllStack = createStackNavigator(
  {
    All: AllScreen,
    SingleTodo: SingleTodoScreen

  },
  config
);

AllStack.navigationOptions = {
  tabBarLabel: 'All',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

AllStack.path = '';

const CompleteStack = createStackNavigator(
  {
    Complete: CompleteScreen,
  },
  config
);

CompleteStack.navigationOptions = {
  tabBarLabel: 'Complete',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

CompleteStack.path = '';

const tabNavigator = createBottomTabNavigator({
  CompleteStack,
  AllStack,
  ActiveStack,
});

tabNavigator.path = '';

export default tabNavigator;
