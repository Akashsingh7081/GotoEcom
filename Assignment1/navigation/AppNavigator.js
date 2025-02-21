import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MovieListScreen from "../screens/MovieListScreen";
import ShortlistedMoviesScreen from "../screens/ShortlistedMoviesScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name="Movies" component={MovieListScreen} />
      <Tab.Screen name="Shortlisted" component={ShortlistedMoviesScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;