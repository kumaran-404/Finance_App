import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Surface, Text } from "react-native-paper";
import Pagination from "./Pagination";
import { useReducer } from "react";

const colors = ["#89CFF0", "#7393B3", "#0047AB", "#088F8F", "#5D3FD3"];

// for handling pagination

function UserList({ data, navigation }) {
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
    <div style={styles.container}>
      {data.slice((state - 1) * 10, state * 10).map((item, pos) => {
        return (
          <TouchableOpacity>
            <Surface
              onClick={() => {
                navigation.navigate("Users", {
                  screen: "UserDetails",
                  params: {
                    data: item,
                  },
                });
              }}
              elevation={1}
              style={styles.person}
            >
              <Text>{(state - 1) * 10 + pos + 1}</Text>
              <Avatar.Text
                color={"white"}
                size={28}
                style={{
                  backgroundColor: colors[pos % colors.length],
                }}
                label={item.Name.substring(0, 2)}
              ></Avatar.Text>

              <div style={styles.person__div_1}>
                <Text variant="headlineSmall" style={{ fontSize: "1.2rem" }}>
                  {item.Name}
                </Text>
                <Text>{item.Phone}</Text>
              </div>

              <div style={styles.person__div_2}>
                <Text variant="headlineSmall" style={{ fontSize: "1.2rem" }}>
                  {item.Balance}
                </Text>
                <Text>{item.Date}</Text>
              </div>
            </Surface>
          </TouchableOpacity>
        );
      })}
      <Pagination
        totalPages={totalPages}
        state={state}
        dispatch={dispatch}
      ></Pagination>
    </div>
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
    alignItems: "center ",
    gap: "1rem",
    backgroundColor: "white",
  },
  person__div_1: {
    display: "flex",
    flexDirection: "column",
  },
  person__div_2: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "3rem",
  },
});

export default UserList;
