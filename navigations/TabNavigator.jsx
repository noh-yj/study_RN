import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainPage, MyPage, AddPage } from '../pages';
import { Ionicons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

const TabNavigator = ({ navigation, route }) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          if (route.name === 'MainPage') {
            iconName += 'list';
          } else if (route.name === 'AddPage') {
            iconName += 'apps-outline';
          } else if (route.name === 'MyPage') {
            iconName += 'person';
          }
          return (
            <Ionicons
              name={iconName}
              color={focused ? 'hotpink' : 'gray'}
              size={26}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
        },
        // activeTintColor: 'tomato',
        // inactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen name="MainPage" component={MainPage} />
      <Tabs.Screen name="MyPage" component={MyPage} />
      <Tabs.Screen name="AddPage" component={AddPage} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
