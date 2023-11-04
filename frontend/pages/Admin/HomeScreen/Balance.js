import { Surface, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useContext } from "react";
import { Context } from "..";
import { FlexColumn } from "../../../utils/components";

const Balance = () => {
  const ctx = useContext(Context);

  return (
    <Surface elevation={3} style={styles.balance}>
      <FlexColumn alignItems={"flex-start"} gap="1rem">
        <Text>Monthly Balance</Text>

        <View style={styles.balance_amount}>
          <Text variant="titleLarge">
            ₹{JSON.stringify(ctx.amount.paid)} of
          </Text>
          <Text variant="titleLarge"> ₹{JSON.stringify(ctx.amount.total)}</Text>
        </View>
      </FlexColumn>
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
