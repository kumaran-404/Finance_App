import { Surface, Text } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import { useContext } from "react";
import { Context } from "..";
import { FlexColumn, FlexRow } from "../../../utils/components";

const Balance = () => {
  const ctx = useContext(Context);

  return (
    <Surface elevation={3} style={styles.balance}>
      <FlexRow>
        <FlexColumn alignItems={"flex-start"} gap="1rem">
          <Text>Monthly Balance</Text>

          <View style={styles.balance_amount}>
            <Text variant="titleLarge">
              ₹{JSON.stringify(ctx.amount.paid)} of
            </Text>
            <Text variant="titleLarge">
              {" "}
              ₹{JSON.stringify(ctx.amount.total)}
            </Text>
          </View>
        </FlexColumn>
        <Image
          source={require("./image.jpg")}
          style={{ height: 100, width: 100, resizeMode: "contain" }}
        />
      </FlexRow>
    </Surface>
  );
};

const styles = StyleSheet.create({
  balance: {
    padding: "2rem",
    borderRadius: "10px",
    backgroundColor: "white",
  },
});

export default Balance;
