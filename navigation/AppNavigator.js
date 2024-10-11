import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../Screens/WelcomeScreen";
import MainTabNavigator from "./MainTabNavigator";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Main" component={MainTabNavigator} />
  </Stack.Navigator>
);

export default AppNavigator;
