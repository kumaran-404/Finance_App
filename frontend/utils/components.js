import { ActivityIndicator, Button, Text } from "react-native-paper";

// helps to center a compnent , make sure outer component has position: relative
export function CenterItem({ children }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      {children}
    </div>
  );
}

export function FlexRow({ children, alignItems, justifyContent }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignItems: alignItems ? alignItems : "center",
        justifyContent: justifyContent ? justifyContent : "space-around",
      }}
    >
      {children}
    </div>
  );
}

export function FlexColumn({ children, alignItems, justifyContent }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: alignItems ? alignItems : "center",
        justifyContent: justifyContent ? justifyContent : "space-around",
      }}
    >
      {children}
    </div>
  );
}

