import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import readXlsxFile from "read-excel-file";

import Balance from "./Balance";
import CustomCalendar from "./CustomCalendar";
import { useContext, useState } from "react";
import { createUsers } from "../../../api";
import { Context } from "..";

const day = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

function HomeScreen() {
  const [user, setUsers] = useState([]);

  const ctx = useContext(Context);

  const upload = async () => {
    const resp = await createUsers(user);
    console.log(resp);

    if (resp) {
      ctx.setRefetch((prev) => !prev);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text>{day[new Date().getDay()]}</Text>
        <Text variant="headlineSmall">
          {new Date().getDate()} / {new Date().getMonth() + 1}
        </Text>
      </View>
      <Balance />

      <View
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          marginTop: "2rem",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(e) => {
            let label = [];
            readXlsxFile(e.target.files[0]).then((row, pos) => {
              let users = [];

              let label = row["0"];

              Object.keys(row).map((item) => {
                if (item === "0") return;

                let arr = row[item],
                  obj = {};

                for (let i = 0; i < label.length; i++) {
                  obj[label[i]] = row[item][i];
                }

                users.push(obj);
              });
              setUsers(users);
            });
          }}
        ></input>
        <Button
          mode="contained"
          style={{
            width: "max-content",
            borderRadius: "10px",
            backgroundColor: "blue",
          }}
          onPress={upload}
        >
          Upload Excel Sheet
        </Button>
      </View>

      <CustomCalendar />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    //backgroundColor: "rgb(49, 77, 223)",
    height: "10vh",
    width: "100%",
    color: "white",
    display: "flex",
    flexDirection: "column",
  },

  container: {
    padding: ".5rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
});

export default HomeScreen;
