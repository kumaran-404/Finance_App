import { View } from "react-native";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from "react-native-paper";
import { PublicRoute, ProtectedRoute } from "./Routes";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Loader from "./components/loader";
import { colorConfig } from "./utils/stylings";

// entry of app
export default function App() {
  const [loading, setLoading] = useState(false);
  const [isLogin, setLogin] = useState(true);
  const [isAdmin, setAdmin] = useState(true);
  const [data, setData] = useState(false);
  return (
    <NavigationContainer>
      <PaperProvider>
        <View
          style={{ position: "relative", height: "100%", overflow: "hidden" }}
        >
          {loading ? (
            <Loader />
          ) : isLogin ? (
            <ProtectedRoute isAdmin={isAdmin} data={data} setLogin={setLogin} />
          ) : (
            <PublicRoute />
          )}
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}
