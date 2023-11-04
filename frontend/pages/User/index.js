import { useEffect, useRef, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Dialog,
  Divider,
  FAB,
  Headline,
  IconButton,
  List,
  Menu,
  Modal,
  Portal,
  RadioButton,
  Searchbar,
  SegmentedButtons,
  Surface,
  Switch,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import {
  Calendar,
  CalendarList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { SectionList, View } from "react-native";

const Tab = createMaterialBottomTabNavigator();

function Home() {
  const [expand, setExpand] = useState(false);

  return (
    <div style={{ overflow: "scroll" }}>
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "20vh",
          backgroundColor: "#6750A4",
          padding: "2rem",
          paddingBottom: "0",
        }}
      >
        <Headline style={{ color: "white" }}>Welcome Back!</Headline>
      </div>
      <div
        style={{
          position: "absolute",
          top: "18vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Card style={{ height: "10vh" }}>
            <Card.Content
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "left",
                gap: ".5rem",
              }}
            >
              <span>
                <span style={{ fontWeight: "bolder" }}>15</span>/20
              </span>
              <Text style={{ color: "gray", fontWeight: "700" }}>Paid</Text>
            </Card.Content>
          </Card>

          <Card style={{ height: "10vh" }}>
            <Card.Content
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "left",
                gap: ".5rem",
              }}
            >
              <span>
                <span style={{ fontWeight: "bolder" }}>₹345000</span>/₹1000000
              </span>
              <Text style={{ color: "green", fontWeight: "700" }}>
                Collected
              </Text>
            </Card.Content>
          </Card>
        </div>

        {/* <Card style={{margin:"1rem",color:"black"}}>
                    <Card.Title>Recent Actions</Card.Title>
                </Card> */}
        <Surface style={{ margin: "1rem" }}>
          <Calendar
            theme={{
              todayTextColor: "red",
              selectedDayBackgroundColor: "#6750A4",
            }}
            onDayPress={(date) => setExpand(true)}
            markedDates={{ "2023-10-06": { selected: true, color: "red" } }}
          ></Calendar>
        </Surface>
      </div>
    </div>
  );
}

let data = [];

for (let i = 0; i < 50; i++) {
  data.push({
    id: i + 1,
    Phone: "8524862383",
    Name: "kumaran",
    "Due Date": "10-2-2023",
    Amount: "10000",
  });
}

function Users({ navigation }) {
  const [value, setValue] = useState(1);

  const [pages, setPages] = useState([]);

  const [tab, setTab] = useState("Paid");

  const [visible, setVisible] = useState(false);

  // Amount , Name, Date
  const [sortBy, setSortBy] = useState([]);

  const handler = (label) => {
    let arr = [];

    if (sortBy.indexOf(label) === -1) {
      setSortBy((prev) => [...prev, label]);
    } else {
      sortBy.map((item) => {
        if (item !== label) arr.push(item);
      });
      setSortBy(arr);
    }
  };

  useEffect(() => {
    if (sortBy.length === 0) {
      setSortBy(["Amount"]);
    }
  }, [sortBy]);

  useEffect(() => {
    let len = data.length,
      mx = Math.ceil(len / 10);

    let arr = [];

    for (
      let i = parseInt(value);
      i <= Math.min(mx + 2, parseInt(value) + 2);
      i++
    ) {
      arr.push({
        value: String(i),
        label: String(i),
        disabled: i > mx,
      });
    }

    setPages(arr);
  }, [value]);

  const moveLeft = () => {
    if (value == 1) return;
    setValue((value) => value - 1);
  };

  const moveRight = () => {
    let len = data.length,
      mx = Math.ceil(len / 10);

    if (value == mx) return;
    setValue((value) => value + 1);
  };

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "white",
        overflow: "scroll",
        position: "relative",
      }}
    >
      <TextInput
        size="small"
        mode="outlined"
        placeholder="Search User"
        right={<TextInput.Icon icon="magnify"></TextInput.Icon>}
      ></TextInput>

      <SegmentedButtons
        value={tab}
        onValueChange={setTab}
        buttons={[
          {
            value: "Paid",
            label: "Paid (3)",
            icon: "check",
            uncheckedColor: "green",
            checkedColor: "green",
          },
          {
            value: "Pending",
            label: "Pending (10)",
            icon: "clock-outline",
            uncheckedColor: "red",
            checkedColor: "red",
          },
        ]}
        style={{ marginTop: "2rem" }}
      ></SegmentedButtons>

      <div
        style={{ marginTop: "1rem", flexDirection: "column", display: "flex" }}
      >
        <div style={{ display: "flex" }}>
          {/* sort by due date , name , amount  */}
          <Portal>
            <Dialog
              onDismiss={() => {
                setVisible(false);
              }}
              visible={visible}
              style={{ zIndex: "1" }}
            >
              <Dialog.Title style={{ padding: "1rem" }}>Order</Dialog.Title>
              <Dialog.Content>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>
                    {" "}
                    <IconButton icon="sort-alphabetical-ascending"></IconButton>
                    Ascending
                  </Text>
                  <RadioButton></RadioButton>
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>
                    {" "}
                    <IconButton icon="sort-alphabetical-descending"></IconButton>{" "}
                    Descending
                  </Text>
                  <RadioButton></RadioButton>
                </span>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setVisible(false);
                  }}
                >
                  Select
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <Button
            onPress={() => setVisible(true)}
            mode="elevated"
            icon="sort-alphabetical-descending"
          >
            Sort
          </Button>

          {["Name", "Amount", "Date"].map((item) => {
            return (
              <span style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  onPress={() => handler(item)}
                  status={sortBy.indexOf(item) == -1 ? "unchecked" : "checked"}
                ></Checkbox>
                <Text>{item}</Text>
              </span>
            );
          })}
        </div>
      </div>

      <div style={{ margin: "2rem 0" }}>
        {data.slice((value - 1) * 10, value * 10).map((person) => {
          return (
            <>
              <Button
                onPress={() => {
                  navigation.navigate("User-Info", {
                    person,
                  });
                }}
                mode="outlined"
                style={{ borderRadius: "10px", marginTop: "1rem" }}
                rippleColor="#FF000020"
              >
                <div
                  style={{
                    display: "flex",
                    gap: ".75rem",
                    alignItems: "center",
                  }}
                >
                  {person.id}
                  <Avatar.Text
                    size={34}
                    label={person.Name.substring(0, 2).toLocaleUpperCase()}
                  ></Avatar.Text>
                  <List.Item
                    right={() => {
                      <List.Icon icon="folder"></List.Icon>;
                    }}
                    title={person.Name}
                    description={person.Phone}
                  ></List.Item>

                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ fontWeight: "600" }}>₹{person.Amount}</Text>
                    <span>{person["Due Date"]}</span>
                  </div>
                </div>
              </Button>
            </>
          );
        })}
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <IconButton
              icon="chevron-double-left"
              onPress={() => setValue(1)}
            ></IconButton>
            <IconButton icon="menu-left" onPress={moveLeft}></IconButton>
          </div>
          <div style={{ display: "flex" }}>
            <IconButton icon="menu-right" onPress={moveRight}></IconButton>
            <IconButton
              icon="chevron-double-right"
              onPress={() => setValue(parseInt(Math.ceil(data.length / 10)))}
            ></IconButton>
          </div>
        </div>

        <SegmentedButtons
          value={String(value)}
          onValueChange={(prev) => {
            setValue(parseInt(prev));
          }}
          buttons={pages}
        ></SegmentedButtons>
      </div>

      <FAB style={{ position: "fixed", bottom: "10px" }} icon="calendar"></FAB>
    </div>
  );
}

function Update() {
  return <div>update</div>;
}

function User() {
  return (
    <Tab.Navigator activeColor="#0E2375">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: "home" }}
      ></Tab.Screen>
      <Tab.Screen
        name="Users"
        component={Users}
        options={{ tabBarIcon: "account-group" }}
      ></Tab.Screen>
      <Tab.Screen
        name="Update"
        component={Update}
        options={{ tabBarIcon: "update" }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export default User;
