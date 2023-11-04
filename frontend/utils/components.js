import { View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

// helps to center a compnent , make sure outer component has position: relative
export function CenterItem({ children }) {
  return (
    <View
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "0",
      }}
    >
      {children}
    </View>
  );
}

export function FlexRow({ children, alignItems, justifyContent, gap }) {
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        alignItems: alignItems ? alignItems : "center",
        justifyContent: justifyContent ? justifyContent : "space-around",
        gap: gap ? gap : "",
      }}
    >
      {children}
    </View>
  );
}

export function FlexColumn({ children, alignItems, justifyContent, gap }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: alignItems ? alignItems : "center",
        justifyContent: justifyContent ? justifyContent : "space-around",
        gap: gap ? gap : "",
      }}
    >
      {children}
    </View>
  );
}
