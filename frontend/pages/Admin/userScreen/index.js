import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  FAB,
  Text,
  IconButton,
  Searchbar,
  Chip,
  SegmentedButtons,
  ToggleButton,
  Divider,
} from "react-native-paper";
import { fetchAllUser, fetchUser, searchUser, updateUsers } from "../../../api";
import Profile from "./profile";
import UserList from "./userList";
import { Context } from "..";
import { FlexRow } from "../../../utils/components";
const Stack = createNativeStackNavigator();

function UserScreen({ route, navigation }) {
  return (
    <ScrollView>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Entry}></Stack.Screen>
        <Stack.Screen name="UserDetails" component={User}></Stack.Screen>
      </Stack.Navigator>
    </ScrollView>
  );
}

const mp = {
  Name: "name",
  Date: "endsOn",
  Amount: "amount",
};

// screen shown on rendering
function Entry({ navigation, route }) {
  const ctx = useContext(Context);
  const [selectedUser, setSelectedUser] = useState({});
  const [currentData, setCurrentData] = useState(ctx.data);
  const [mode, setMode] = useState(0); // 0 : view all , 1 : view paid , 2 : view unpaid
  const [amount, setAmount] = useState(ctx.amount);
  const [filtered, setFiltered] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [value, setValue] = useState("Amount");
  const [order, setOrder] = useState("ascending");
  const [initial, setInitial] = useState(true);

  const handleKeyPress = async (event) => {
    if (event.keyCode !== 13) return;

    if (document.getElementById("search-bar").value.length === 0) return;

    const resp = await searchUser({
      searchParam: document.getElementById("search-bar").value,
      mode,
    });

    if (resp) {
      setCurrentData(resp.data.data);
      setFiltered(true);
    }
  };

  const util = (temp, newVal) => {
    temp.sort((a, b) => {
      var keyA = a[newVal],
        keyB = b[newVal];

      if (newVal === "endsOn") {
        keyA = new Date(keyA);
        keyB = new Date(keyB);
      }

      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;

      return 0;
    });

    if (order === "descending") {
      return [...temp].reverse();
    }
    return temp;
  };

  useEffect(() => {
    let newVal = mp[value];

    let temp;

    if (filtered) {
      temp = [...currentData];
    } else {
      if (mode === 0) temp = [...ctx.data];
      else if (mode === 1) temp = [...ctx.paid];
      else if (mode === 2) temp = [...ctx.unpaid];
    }
    setCurrentData(util(temp, newVal));
  }, [order, value]);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      return;
    }

    let newVal = mp[value];
    setFiltered(false);

    let temp;
    if (mode === 0) temp = [...ctx.data];
    else if (mode === 1) temp = [...ctx.paid];
    else if (mode === 2) temp = [...ctx.unpaid];
    setCurrentData(util(temp, newVal));
    setSelectedUser([]);
    document.getElementById("search-bar").value = "";
  }, [mode, ctx.paid, ctx.unpaid]);

  const update = async () => {
    console.log(selectedUser);
    if (Object.keys(selectedUser).length === 0) return;

    const resp = await updateUsers({
      id: Object.keys(selectedUser),
      paid: mode == 1 ? false : true,
    });

    if (resp) {
      ctx.setRefetch((prev) => !prev);
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        onKeyPress={handleKeyPress}
        id="search-bar"
        placeholder="Phone No./Name"
      ></Searchbar>
      {filtered && (
        <Button
          icon={"close"}
          onPress={() => {
            if (mode === 0) {
              setCurrentData(ctx.data);
            } else if (mode == 1) {
              setCurrentData(ctx.paid);
            } else {
              setCurrentData(ctx.unpaid);
            }
            setFiltered(false);
            document.getElementById("search-bar").value = "";
          }}
          style={{ width: "max-content" }}
          mode="contained"
        >
          Clear search
        </Button>
      )}

      <FlexRow>
        <FAB
          style={{
            width: "max-content",
            border: mode === 0 && "1px solid blue",
            backgroundColor: mode === 0 ? "blue" : "white",
            marginRight: "2rem",
          }}
          color={mode === 0 ? "white" : "black"}
          label="View All"
          onPress={() => setMode(0)}
        ></FAB>
        <FAB
          style={{
            width: "max-content",
            border: mode === 1 && "1px solid green",
            backgroundColor: mode === 1 ? "#77dd77" : "white",
            marginRight: "1rem",
          }}
          color={mode === 1 ? "white" : "black"}
          label="Paid"
          onPress={() => setMode(1)}
        ></FAB>
        <FAB
          style={{
            width: "max-content",
            border: mode === 2 && "1px solid red",
            backgroundColor: mode === 2 ? "#DB7093" : "white",
          }}
          color={mode === 2 ? "white" : "black"}
          label="Yet To Pay"
          onPress={() => setMode(2)}
        ></FAB>
      </FlexRow>

      <Button
        onPress={() => setShowMore((prev) => !prev)}
        icon="chevron-down"
        mode={"contained-tonal"}
        style={{ width: "max-content" }}
      >
        {showMore ? "Hide" : "Show"} Filters
      </Button>

      {showMore && (
        <>
          <Text>Sort By</Text>
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
          <ToggleButton.Row
            value={order}
            onValueChange={(order) => {
              if (order === null) return;
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
        </>
      )}

      <Divider></Divider>

      {Object.keys(selectedUser).length > 0 ? (
        <View
          style={{
            display: "flex",
            gap: "1rem",
            flexDirection: "row",
          }}
        >
          {Object.keys(selectedUser).map((item) => {
            return (
              <Chip
                style={{ width: "max-content", borderRadius: "10px" }}
                closeIcon={"close"}
                onClose={(e) => {
                  setSelectedUser((prev) => {
                    const newData = { ...prev };
                    delete newData[selectedUser[item].id];
                    return newData;
                  });
                }}
              >
                {selectedUser[item].name}
              </Chip>
            );
          })}
        </View>
      ) : (
        <></>
      )}

      {mode > 0 && Object.keys(selectedUser).length > 0 && (
        <Button
          style={{ width: "max-content", borderRadius: "10px" }}
          mode="contained"
          onPress={update}
        >
          Move to {mode == 1 ? "Unpay" : "Pay"}
        </Button>
      )}

      <UserList
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
        navigation={navigation}
        data={currentData}
        mode={mode}
      ></UserList>
    </View>
  );
}

// screen for particular user
function User({ route, navigation }) {
  const [refetch, setRefetch] = useState(false);

  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    //setLoading(true);
    const func = async () => {
      const { data } = route.params;
      const resp = await fetchUser(data.id);

      if (resp) {
        setUserData(resp.data.data);
      }
      setLoading(false);
    };

    func();
  }, [refetch]);

  return (
    <div>
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator />
        </div>
      ) : (
        userData && (
          <Profile
            setRefetch={setRefetch}
            navigation={navigation}
            data={userData}
          />
        )
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
});

export default UserScreen;
