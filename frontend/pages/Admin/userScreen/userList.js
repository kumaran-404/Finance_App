import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Avatar,
  Checkbox,
  IconButton,
  Surface,
  Text,
} from "react-native-paper";
import Pagination from "./Pagination";
import { useEffect, useReducer, useState } from "react";

const colors = ["#89CFF0", "#7393B3", "#0047AB", "#088F8F", "#5D3FD3"];

// for handling pagination

function UserList({ data, selectedUser, setSelectedUser, mode, navigation }) {
  const totalPages = Math.ceil(data.length / 10);

  function reducer(state, action) {
    switch (action.type) {
      case "left":
        return Math.max(1, state - 1);
      case "right":
        return Math.min(totalPages, state + 1);
      case "left-most":
        return 1;
      case "right-most":
        return Math.ceil(data.length / 10);
      case "change":
        return action.to;
    }
  }

  const [state, dispatch] = useReducer(reducer, 1);

  return (
    <View style={styles.container}>
      {data.slice((state - 1) * 10, state * 10).map((item, pos) => {
        return (
          <View
            onClick={() => {
              navigation.navigate("UserDetails", {
                data: item,
              });
            }}
            style={styles.person}
          >
            {mode !== 0 && (
              <Checkbox
                onPress={(e) => {
                  if (item.id in selectedUser) {
                    setSelectedUser((prev) => {
                      const newData = { ...prev };
                      delete newData[item.id];
                      return newData;
                    });
                  } else {
                    setSelectedUser((prev) => ({
                      ...prev,
                      [item.id]: item,
                    }));
                  }
                }}
                status={item.id in selectedUser ? "checked" : "unchecked"}
              ></Checkbox>
            )}

            <Avatar.Text
              color={"white"}
              size={28}
              style={{
                backgroundColor: colors[pos % colors.length],
              }}
              label={item.name.substring(0, 2)}
            ></Avatar.Text>

            <View style={styles.person__div_1}>
              <Text>{item.name}</Text>
              <Text>{item.phoneNumber}</Text>
            </View>

            <View style={styles.person__div_2}>
              {item.amount && <Text>₹{item.amount}</Text>}
              {item.endsOn && (
                <Text style={{ color: "blue" }}>{item.endsOn}</Text>
              )}
            </View>
          </View>
        );
      })}
      {data.slice((state - 1) * 10, state * 10).length === 0 && (
        <Text style={{ padding: "1rem" }}>No Users Found</Text>
      )}
      <Pagination
        totalPages={totalPages}
        state={state}
        dispatch={dispatch}
      ></Pagination>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    margin: "2rem 0",
  },
  person: {
    padding: "1rem",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center ",
    gap: "1rem",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  person__div_1: {
    display: "flex",
    flexDirection: "column",
  },
  person__div_2: {
    display: "flex",
    flexDirection: "column",
  },
});

export default UserList;
