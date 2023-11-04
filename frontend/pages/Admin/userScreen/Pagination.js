import React from "react";
import { IconButton, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

function Pagination({ state, dispatch, totalPages }) {
  const start = Math.ceil(state / 3) * 3 - 2;
  const end = Math.ceil(state / 3) * 3;
  const theme = useTheme();
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <IconButton
          onPress={() => dispatch({ type: "left-most" })}
          icon="chevron-double-left"
        ></IconButton>
        <IconButton
          onPress={() => dispatch({ type: "left" })}
          icon="menu-left"
        ></IconButton>

        {Array.from(Array(end - start + 1).keys()).map((item) => {
          return (
            <div
              onClick={() => {
                item + start <= totalPages &&
                  dispatch({ type: "change", to: item + start });
              }}
              style={{
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: item + start > totalPages && "#EBEBE4",
                backgroundColor:
                  item + start == state ? theme.colors.inversePrimary : "",
                opacity: item + start > totalPages && "50%",
              }}
            >
              {item + Math.ceil(state / 3) * 3 - 2}
            </div>
          );
        })}

        <IconButton
          onPress={() => dispatch({ type: "right" })}
          icon="menu-right"
        ></IconButton>
        <IconButton
          onPress={() => dispatch({ type: "right-most" })}
          icon="chevron-double-right"
        ></IconButton>
      </div>
      <span style={styles.label}>
        {state} of {totalPages}
      </span>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#EBEBE4",
    borderRadius: "10px",
    marginTop: "2rem",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  label: {
    color: "#808080",
  },
});
export default Pagination;
