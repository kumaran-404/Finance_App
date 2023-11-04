import { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Text, TextInput } from "react-native-paper";
import CustomButton from "../../components/custom-bottom";
import { login } from "../../api";

function Login({ setSnackbar, setSnackbarData }) {
  const [loading, setLoading] = useState(false);
  const [isPassword, setPassword] = useState(true);

  const handler = async () => {
    const phoneNumber = document.getElementById("phoneNumber").value,
      password = document.getElementById("password").value;

    const resp = await login(
      { phoneNumber, password },
      setSnackbar,
      setSnackbarData
    );

    if (resp) {
      console.log(resp);
      localStorage.setItem("jwtToken", resp);
      window.location.reload();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/welcome.png")}
      ></Image>
      <TextInput.Icon icon=""></TextInput.Icon>

      <div style={styles.box}>
        <Text style={{  fontWeight: "600" }}>Login</Text>
        <Text>Please Signin to Continue</Text>
        <TextInput
          id="phoneNumber"
          mode="outlined"
          label="Phone Number"
        ></TextInput>
        <TextInput
          id="password"
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
