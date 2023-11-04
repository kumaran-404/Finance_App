import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  Dialog,
  Divider,
  IconButton,
  List,
  Portal,
  Text,
} from "react-native-paper";
import { monthWise } from "../../../api";
import { Context } from "..";
import { View } from "react-native";
import { FlexColumn } from "../../../utils/components";

function CustomCalendar() {
  const [visible, setVisible] = useState(null);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthWiseData, setMonthWiseData] = useState({});
  const ctx = useContext(Context);
  const [initial, setInitial] = useState(true);

  useEffect(() => {
    let temp = {};

    Object.keys(ctx.monthWiseData).map((item) => {
      if (item === "amount") return;

      let t = item.split("-");

      let date =
        t[2] + "-" + t[1] + "-" + (t[0].length === 1 ? "0" + t[0] : t[0]);

      temp[date] = ctx.monthWiseData[item];

      temp[date]["marked"] = true;
    });
    setMonthWiseData(temp);
  }, [ctx.monthWiseData]);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      return;
    }

    (async () => {
      const resp = await monthWise(month, year);

      if (resp) {
        let temp = {};

        Object.keys(resp.data.data.dateWise).map((item) => {
          if (item === "amount") return;

          let t = item.split("-");

          let date =
            t[2] + "-" + t[1] + "-" + (t[0].length === 1 ? "0" + t[0] : t[0]);

          temp[date] = resp.data.data.dateWise[item];

          temp[date]["marked"] = true;
        });
        setMonthWiseData(temp);
      }
    })();
  }, [month, year]);

  return (
    <View style={{ marginTop: "2rem" }}>
      <Calendar
        renderArrow={(direction) => {
          if (direction === "left")
            return <IconButton icon="menu-left"></IconButton>;

          return <IconButton icon="menu-right"></IconButton>;
        }}
        markedDates={monthWiseData}
        onDayPress={(day) => {
          if (monthWiseData[day.dateString]) {
            setVisible(monthWiseData[day.dateString]);
          }
        }}
        onMonthChange={(e) => {
          setMonth(e.month - 1);
          setYear(e.year);
        }}
      ></Calendar>
      <Portal>
        <Dialog
          visible={visible !== null}
          onDismiss={() => {
            setVisible(null);
          }}
          style={{ borderRadius: "10px", backgroundColor: "white" }}
        >
          <Dialog.Title>DateWise</Dialog.Title>

          <Dialog.Content>
            {visible &&
              visible.users.map((user) => {
                return (
                  <View
                    style={{
                      display: "flex",

                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <FlexColumn alignItems={"flex-start"}>
                      <Text>{user.name}</Text>
                      <Text>{user.phoneNumber}</Text>
                    </FlexColumn>

                    <Text> ₹{user.amount}</Text>
                  </View>
                );
              })}
            {visible && (
              <Text variant="titleMedium" style={{ marginTop: "1rem" }}>
                {"Total : ₹" + JSON.stringify(visible.amount)}
              </Text>
            )}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}

export default CustomCalendar;
