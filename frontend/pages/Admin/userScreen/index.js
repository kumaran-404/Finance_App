import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, FAB, IconButton, Searchbar } from "react-native-paper";

const Stack = createNativeStackNavigator();

function UserScreen({ route }) {
  console.log(route);
  return (
    <ScrollView>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Entry}></Stack.Screen>
        <Stack.Screen name="UserDetails" component={User}></Stack.Screen>
      </Stack.Navigator>
    </ScrollView>
  );
}

function Entry() {
  return (
    <div style={styles.container}>
      <Searchbar
        right={() => {
          return (
            <Button style={{ marginRight: "1rem" }} mode="outlined">
              Search
            </Button>
          );
        }}
      ></Searchbar>
      <FAB
        icon="plus"
        label="Add User"
        style={{ backgroundColor: "black", width: "max-content" }}
        color="white"
      ></FAB>
    </div>
  );
}

function User({ route }) {
  const { data } = route.params;

  if (!data) return <></>;
  return <div>{JSON.stringify(data)}</div>;
}

const styles = StyleSheet.create({
  container: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
});

export default UserScreen;
