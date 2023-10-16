import Login from "./pages/Login";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./pages/Admin/HomeScreen";
import { IconButton } from "react-native-paper";

import viewScreen from "./pages/Admin/viewScreen";
import UserScreen from "./pages/Admin/userScreen";

const Tab = createMaterialBottomTabNavigator();

export function ProtectedRoute({ isAdmin, data }) {
  // role based rendering ui

  if (isAdmin) {
    return (
      <Tab.Navigator
        // screenOptions={{ tabBarColor: "red", tabBarActiveTintColor: "#e91e63" }}
        activeColor="black"
        inactiveColor="white"
        barStyle={{ backgroundColor: "rgb(49, 77, 223)" }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: "home" }}
        />
        <Tab.Screen
          name="This Month"
          component={viewScreen}
          options={{ tabBarIcon: "calendar" }}
        />
        <Tab.Screen
          name="Users"
          component={UserScreen}
          options={{ tabBarIcon: "account" }}
        />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    );
  }

  return <div></div>;
}

export function PublicRoute() {
  return (
    <>
      <Login />
    </>
  );
}
