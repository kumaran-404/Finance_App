import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { login } from "../../api";
import { customContext } from "../../App";

function Login() {
  const [loading, setLoading] = useState(false);
  const [isPassword, setPassword] = useState(true);

  const ctx = useContext(customContext);

  const handler = async () => {
    const phoneNumber = document.getElementById("phoneNumber").value,
      password = document.getElementById("password").value;

    if (phoneNumber.trim().length != 10) {
      ctx.setSnackbarData({
        message: "Number should be 10 digits",
        severity: "error",
      });
      return;
    }

    if (password.trim().length == 0) {
      ctx.setSnackbarData({
        message: "Empty password",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    const resp = await login({ phoneNumber, password }, ctx.setSnackbarData);

    setLoading(false);

    if (resp) {
      localStorage.setItem("jwtToken", resp);
      window.location.reload();
    }
  };

  useEffect(() => {
    document.title = "Login|BV_Finance";
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./login2.avif")}></Image>

      <View style={styles.box}>
        <Text variant="headlineSmall">Login</Text>
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

        <Button
          mode="contained"
          style={{
            backgroundColor: loading ? "#EBEBE4" : "blue",
            borderRadius: "7px",
          }}
          textColor="white"
          onPress={handler}
          disabled={loading}
        >
          {loading ? "Please Wait..." : "Login"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
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
    height: 200,
    width: 200,
    marginTop: "3rem",
  },
  button: {
    backgroundColor: "#0E2375",
    borderRadius: 10,
  },
});

export default Login;
