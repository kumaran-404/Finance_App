import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { Dialog, IconButton, Portal } from "react-native-paper";

function CustomCalendar() {
  const [visible, setVisible] = useState(null);

  return (
    <div>
      <Calendar
        renderArrow={(direction) => {
          if (direction === "left")
            return <IconButton icon="menu-left"></IconButton>;

          return <IconButton icon="menu-right"></IconButton>;
        }}
        markedDates={{
          "2023-10-06": { marked: true },
        }}
        onDayPress={(day) => {
          setVisible(day.dateString);
          console.log(day);
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
          <Dialog.Title>Date - {visible}</Dialog.Title>
        </Dialog>
      </Portal>
    </div>
  );
}

export default CustomCalendar;
