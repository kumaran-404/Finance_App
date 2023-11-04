import { View } from "react-native";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  configureFonts,
  Snackbar,
} from "react-native-paper";
import { PublicRoute, ProtectedRoute } from "./Routes";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Loader from "./components/loader";
import { verifyJWT } from "./api";

// entry of app
export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(null);
  const [isAdmin, setAdmin] = useState(true);
  const [data, setData] = useState(false);
  const [isSnackbar, setSnackbar] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
     severity : "",
     message : "", 
  });

  const onDismiss = () => {
    setSnackbar(false);
    setSnackbarData("");
  };

  useEffect(() => {
    (async () => {
      const resp = await verifyJWT();

      if (!resp) {
        setLogin(false);
        localStorage.removeItem("jwtToken");
      } else {
        setLogin(true);
        setData(resp.data.data);
      }
    })();
  }, []);

  useEffect(() => {
    if (isLogin !== null) {
      setLoading(false);
    }
  }, [isLogin]);

  return (
    <NavigationContainer>
      <PaperProvider>
        <View
          style={{ position: "relative", height: "100%", overflow: "hidden" }}
        >
          {loading ? (
            <Loader />
          ) : isLogin ? (
            <ProtectedRoute
              isAdmin={isAdmin}
              data={data}
              setSnackbar={setSnackbar}
              setSnackbarData={setSnackbarData}
              setLogin={setLogin}
            />
          ) : (
            <PublicRoute
              setSnackbar={setSnackbar}
              setSnackbarData={setSnackbarData}
            />
          )}
          <Snackbar
            style={{ backgroundColor: snackbarData.severity==="error"?"red":"green" }}
            visible={isSnackbar}
            onDismiss={onDismiss}
          >
            {snackbarData.message}
          </Snackbar>
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}
