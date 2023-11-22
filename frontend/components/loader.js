import { CenterItem, FlexColumn } from "../utils/components";
import { ActivityIndicator, Text } from "react-native-paper";

function Loader() {
  return (
    <CenterItem>
      <FlexColumn>
        <ActivityIndicator size="large" />
        <Text  variant="titleLarge">
          BV Finance
        </Text>
      </FlexColumn>
    </CenterItem>
  );
}

export default Loader;
