import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screen/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import AddNameScreen from './src/screen/AddNameScreen';
import {navigationRef} from './src/Utils/utils';
import UpadetUser from './src/screen/UpadetUser';
import SpeachToText from './src/screen/SpeachToText';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
      <Stack.Screen name="SpeachToText" component={SpeachToText} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddUser" component={AddNameScreen} />
        <Stack.Screen name="EditUser" component={UpadetUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
