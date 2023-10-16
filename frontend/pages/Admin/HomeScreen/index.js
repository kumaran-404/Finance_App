import { ScrollView, StyleSheet } from "react-native";
import {
  Button,
  Card,
  IconButton,
  Searchbar,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

import Balance from "./Balance";
import AddUser from "./AddUser";
import CustomCalendar from "./CustomCalendar";

function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      {/*date day */}

      <div style={styles.header}>
        <Text>Sunday</Text>
        <Text variant="headlineSmall">26 November</Text>
      </div>

      <Balance></Balance>

      <AddUser />

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
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  
});

export default HomeScreen;
