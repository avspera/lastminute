
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Hotel from './Hotel';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{gestureEnabled: true, headerShown: true}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({route}) => ({title: 'Wrecking hotel rooms'})}
      />
      <Stack.Screen
        name="Hotel"
        component={Hotel}
        options={({ route }) => ({ title: !!route.params.item.name && route.params.item.name })}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
