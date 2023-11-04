import HomeScreen from "./HomeScreen";
import UserScreen from "./userScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useState, useEffect, createContext } from "react";
import { monthWise } from "../../api";

const Tab = createMaterialBottomTabNavigator();

export const Context = createContext(null);

function Admin({ setSnackbarData }) {
  const [data, setData] = useState([]);
  const [paid, setPaid] = useState([]);
  const [unpaid, setUnpaid] = useState([]);
  const [amount, setAmount] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [monthWiseData, setMonthWiseData] = useState({});

  // initally fetch for current month !!
  useEffect(() => {
    (async () => {
      const date = new Date(),
        month = date.getMonth(),
        year = date.getFullYear();

      const resp = await monthWise(month, year);

      if (resp) {
        setPaid(resp.data.data.paid);
        setUnpaid(resp.data.data.unpaid);

        let temp = [];

        resp.data.data.paid.map((item) => temp.push(item));
        resp.data.data.unpaid.map((item) => temp.push(item));

        setMonthWiseData(resp.data.data.dateWise);

        setData(temp);

        let current = resp.data.data.dateWise.amount;
        setAmount({ paid: current.paid, total: current.total });
      }
    })();
  }, [refetch]);

  return (
    <Context.Provider
      value={{
        data,
        paid,
        unpaid,
        amount,
        setRefetch,
        monthWiseData,
        setMonthWiseData,
      }}
    >
      <Tab.Navigator
 
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
          name="Users"
          component={UserScreen}
          options={{ tabBarIcon: "account" }}
        />
      </Tab.Navigator>
    </Context.Provider>
  );
}

export default Admin;
