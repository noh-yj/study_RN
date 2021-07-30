import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigations/StackNavigator';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
import { Loading } from './pages';

export default function App() {
  const [ready, setReady] = useState(false);

  const loadFont = () => {
    setTimeout(async () => {
      // await Font.loadAsync({
      //   Roboto: require('native-base/Fonts/Roboto.ttf'),
      //   Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      //   ...Ionicons.font,
      // });
      setReady(true);
    }, 1000);
  };

  useEffect(() => {
    loadFont();
  }, []);

  return ready ? (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  ) : (
    <Loading />
  );
}

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
