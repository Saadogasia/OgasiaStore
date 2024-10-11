import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Listingdatabase from "../Screens/Listingdatabase";
import ListingDetailsScreen from "../Screens/ListingdetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={Listingdatabase} />
    <Stack.Screen name="ListingDetails" component={ListingDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
