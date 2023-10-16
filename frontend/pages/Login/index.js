import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, TextInput } from "react-native-paper";
import CustomButton from "../../components/custom-bottom";
import { Platform } from "react-native";
function Login() {
  const [loading, setLoading] = useState(false);
  const [isPassword, setPassword] = useState(true);

  const handler = () => {};

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/welcome.png")}
      ></Image>
      <TextInput.Icon icon=""></TextInput.Icon>

      <div style={styles.box}>
        <Text style={{ fontSize: "20px", fontWeight: "bolder" }}>Login</Text>
        <Text>Please Signin to Continue</Text>
        <TextInput mode="outlined" label="Phone Number"></TextInput>
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry={isPassword}
          right={
            <TextInput.Icon
              onPress={() => {
                setPassword((prev) => !prev);
              }}
              icon={isPassword ? "eye-off" : "eye"}
            ></TextInput.Icon>
          }
        ></TextInput>
        <CustomButton
          text="Login"
          onPress={handler}
          isLoading={false}
        ></CustomButton>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "1rem",
  },
  container: {
    display: "flex",
    gap: "1rem",
    // ...Platform.select({
    //   web: {
    //     width: "30%",

    //     position: "absolute",
    //     top: "50%",
    //     left: "50%",
    //     transform: "translate(-50%,-50%)",
    //   },
    //   android: {
    //     width: "100%",
    //   },
    //   ios: {
    //     width: "100%",
    //   },
    // }),
  },
  box: {
    display: "flex",
    gap: "2rem",
    padding: "2rem",
    flexDirection: "column",
  },
  shape: {
    height: "15rem",
    width: "100%",
    "-webkit-clip-path": " circle(63.3% at 59% 12%)",
    "clip-path": "circle(63.3% at 59% 12%)",
    backgroundColor: "#0E2375",
  },
  image: {
    height: "15rem",
    width: "100%",
  },
  button: {
    backgroundColor: "#0E2375",
    borderRadius: 10,
  },
});

export default Login;
