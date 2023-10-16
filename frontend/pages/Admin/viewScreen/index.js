import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Button,
  Text,
  Dialog,
  FAB,
  Portal,
  SegmentedButtons,
  ToggleButton,
  IconButton,
  Divider,
  Searchbar,
  RadioButton,
  Surface,
} from "react-native-paper";
import UserList from "./userList";
import { Calendar } from "react-native-calendars";
import { FlexRow } from "../../../utils/components";
const paid = [
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
  {
    Name: "Kumaran",
    Phone: "8524862383",
    Balance: "23000",
    Date: "03/10",
  },
];

const unpaid = paid;

function viewScreen({navigation}) {
  const [value, setValue] = useState("Amount");
  const [order, setOrder] = useState("ascending");
  const [showPaid, setShowPaid] = useState(true);
  const [showMore, setShowMore] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <FlexRow justifyContent={"flex-start"}>
          <FAB
            icon="calendar"
            style={{
              width: "max-content",
              border: showPaid && "1px solid green",
              backgroundColor: showPaid ? "#77dd77" : "white",
              marginRight: "1rem",
            }}
            color={showPaid ? "white" : "black"}
            label="Paid"
            onPress={() => setShowPaid(true)}
          ></FAB>
          <FAB
            icon="calendar"
            style={{
              width: "max-content",
              border: !showPaid && "1px solid red",
              backgroundColor: !showPaid ? "#DB7093" : "white",
            }}
            color={!showPaid ? "white" : "black"}
            label="Yet To Pay"
            onPress={() => setShowPaid(false)}
          ></FAB>
        </FlexRow>

        <Surface
          style={{
            padding: "1rem",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <Text style={{ fontWeight: "bolder" }} variant="headlineSmall">
            ₹13400 / ₹134000{" "}
          </Text>
        </Surface>

        <Button
          onPress={() => setShowMore((prev) => !prev)}
          icon="chevron-down"
          mode={"contained-tonal"}
          style={{ width: "max-content" }}
        >
          {showMore ? "Hide" : "Show"} Filters
        </Button>

        {showMore && <Searchbar></Searchbar>}

        {showMore && <Text>Sort By</Text>}

        {showMore && (
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: "Date",
                label: "Date",
                showSelectedCheck: true,
                style: { borderRadius: "0" },
              },
              {
                value: "Amount",
                label: "Amount",
                showSelectedCheck: true,
              },
              {
                value: "Name",

                showSelectedCheck: true,
                label: "Name",
                style: { borderRadius: "0" },
              },
            ]}
          ></SegmentedButtons>
        )}
        {showMore && (
          <ToggleButton.Row
            value={order}
            onValueChange={(order) => {
              if (order === null) return;
              console.log(order);
              setOrder(order);
            }}
          >
            <ToggleButton
              icon={"sort-ascending"}
              value="ascending"
            ></ToggleButton>
            <ToggleButton
              icon={"sort-descending"}
              value="descending"
            ></ToggleButton>
          </ToggleButton.Row>
        )}
        <Divider></Divider>
      </div>

      {value === "Paid" ? <UserList navigation={navigation} data={paid} /> : <UserList navigation={navigation} data={unpaid} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    backgroundColor: "#f8f8f8",
  },
  FAB: {
    width: "max-content",
  },
});

export default viewScreen;
