import { View } from "react-native";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  configureFonts,
  Snackbar,
  ActivityIndicator,
} from "react-native-paper";
import { PublicRoute, ProtectedRoute } from "./Routes";
import { createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Loader from "./components/loader";
import { verifyJWT } from "./api";

export const customContext = createContext();

// entry of app
export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(null);
  const [isAdmin, setAdmin] = useState(true);
  const [data, setData] = useState(false);
  const [snackbarData, setSnackbarData] = useState({
    severity: null,
    message: null,
  });

  const onDismiss = () => {
    setSnackbarData({ severity: null, message: null });
  };

  useEffect(() => {
    (async () => {
      const resp = await verifyJWT();

      if (!resp) {
        setLogin(false);
        localStorage.removeItem("jwtToken");
      } else {
        setLogin(true);
        setAdmin(resp.data.data.isAdmin)
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
      <customContext.Provider
        value={{
          setSnackbarData,
        }}
      >
        <PaperProvider>
          <View
            style={{ position: "relative", height: "100%", overflow: "hidden" }}
          >
            {loading ? (
              <ActivityIndicator style={{position:"absolute" , top:"50%" , left:"50%" , transform : "translate(-50%,-50%)"}}/>
            ) : isLogin ? (
              <ProtectedRoute
                isAdmin={isAdmin}
                data={data}
                setLogin={setLogin}
              />
            ) : (
              <PublicRoute />
            )}
            <Snackbar
              style={{
                backgroundColor:
                  snackbarData&& (snackbarData.severity === "error" ? "red" : "green"),
              }}
              visible={snackbarData.message !== null}
              onDismiss={onDismiss}
            >
              {snackbarData.message}
            </Snackbar>
          </View>
        </PaperProvider>
      </customContext.Provider>
    </NavigationContainer>
  );
}
