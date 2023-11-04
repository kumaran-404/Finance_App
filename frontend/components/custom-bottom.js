import { Button, ActivityIndicator, Text } from "react-native-paper";

function CustomButton({ isLoading, onPress, text }) {
  return (
    <>
      <Button
        onPress={onPress}
        style={{ borderRadius: "5px", backgroundColor: "rgb(49, 77, 223)" }}
        mode="contained"
        disabled={isLoading}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <ActivityIndicator
            color="#0E2375"
            style={{ position: "absolute", left: "0" }}
            animating={isLoading}
          ></ActivityIndicator>
          <Text>{text}</Text>
        </div>
      </Button>
    </>
  );
}

export default CustomButton;
