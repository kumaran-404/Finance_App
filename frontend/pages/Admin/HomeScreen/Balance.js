import { Surface,IconButton ,Text } from "react-native-paper";
import SvgComponent from "../../../components/svgs";
import { StyleSheet } from "react-native";

const Balance = () => {
  return (
    <Surface elevation={3} style={styles.balance}>
      <div>
        <SvgComponent />
      </div>

      <div>
        <div>
          <Text style={{ fontWeight: "700", fontFamily: "sans-serif" }}>
            Monthly Balance
          </Text>
        </div>
        <div style={styles.balance_amount}>
          <Text variant="titleLarge">$15,560.00</Text>
          <IconButton icon="menu-right"></IconButton>
        </div>
      </div>
    </Surface>
  );
};

const styles = StyleSheet.create({
  balance_amount: {
    display: "flex",
    alignItems: "center",
  },
  balance: {
    width: "100%",
    borderRadius: "20px",
    padding: "2rem",
    backgroundColor: "white",
    display: "flex",
    gap: "10px",
    flexDirection: "row-reverse",
    alignItems: "center",
  },
});

export default Balance;
