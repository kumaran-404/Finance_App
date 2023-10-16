import { CenterItem, FlexColumn } from "../utils/components";
import { ActivityIndicator, Text } from "react-native-paper";

function Loader() {
  return (
    <CenterItem>
      <FlexColumn>
        <ActivityIndicator size="large" />
        <Text style={{ padding: "1rem", width: "100%" }} variant="titleLarge">
          BV Finance
        </Text>
      </FlexColumn>
    </CenterItem>
  );
}

export default Loader;
