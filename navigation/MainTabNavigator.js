import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedNavigator from "./FeedNavigator";
import Inputdatabase from "../Screens/Inputdatabse";
import NewListingButton from "./NewListingButton";
import NewListingHomeButton from "./NewListingHomeButton";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Feed"
      component={FeedNavigator}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingHomeButton onPress={() => navigation.navigate("Feed")} />
        ),
      })}
    />
    <Tab.Screen
      name="Add"
      component={Inputdatabase}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton onPress={() => navigation.navigate("Add")} />
        ),
      })}
    />
  </Tab.Navigator>
);

export default MainTabNavigator;
