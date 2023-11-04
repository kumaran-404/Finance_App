import React, { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  Avatar,
  Button,
  Chip,
  FAB,
  IconButton,
  Text,
} from "react-native-paper";
import { FlexColumn } from "../../../utils/components";
import Svg, { Circle, Text as SvgText } from "react-native-svg";
import { updateUsers } from "../../../api";
import { Context } from "..";

function Profile({ data, navigation, setRefetch }) {
  const [paid, setPaid] = useState(false);
  const ctx = useContext(Context);
  useEffect(() => {
    const thisMonth = new Date().getMonth();

    data.Pays.map((item) => {
      if (item.month == thisMonth) {
        setPaid(true);
      }
    });
  }, []);

  const update = async () => {
    const resp = await updateUsers({
      paid: !paid,
      id: [data.id],
    });

    if (resp) {
      setPaid((prev) => !prev);
      setRefetch((prev) => !prev);
      ctx.setRefetch((prev) => !prev);
    }
  };

  return (
    <div>
      <div style={styles.container1}>
        <IconButton
          style={{ backgroundColor: "white" }}
          icon="arrow-left-bold"
          onPress={() => {
            navigation.navigate("Home");
          }}
        ></IconButton>
        <FlexColumn alignItems={"center"}>
          <Avatar.Text
            color="white"
            label={data.name.substring(0, 2)}
          ></Avatar.Text>
          <Text
            style={{ color: "white", margin: "1rem 0" }}
            variant="headlineMedium"
          >
            {data.name}
          </Text>
          <Text
            style={{ color: "white", margin: "1rem 0" }}
            variant="titleMedium"
          >
            {data.phoneNumber}
          </Text>
          <Text style={{ color: "white", margin: "1rem" }}>
            Since
            {new Date(data.emiStartDate).toLocaleDateString().split(",")[0]}
          </Text>
          <FAB
            icon={paid ? "check-outline" : "timelapse"}
            style={{
              width: "max-content",
              border: paid ? "1px solid green" : "1px solid red",
              backgroundColor: paid ? "#77dd77" : "#DB7093",
              marginRight: "1rem",
            }}
            color={"white"}
            label={paid ? "Paid for this Month" : "Not Paid for this Month"}
          ></FAB>
          {
            <Button
              onPress={update}
              mode="contained"
              style={{ marginTop: "2rem" }}
            >
              {paid ? "Remove From Paid" : "Add to Paid"}
            </Button>
          }
        </FlexColumn>
      </div>

      <FlexColumn alignItems={"center"}>
        <div style={styles.container3}>
          <FlexColumn alignItems={"center"}>
            <Text
              style={{ marginBottom: "1rem", color: "white" }}
              variant="titleMedium"
            >
              Months
            </Text>
            <Text style={{ marginBottom: "1rem", color: "white" }}>
              {data.monthsAlreadyPaid} months of {data.loanTenure} months
            </Text>
            <CircularProgress
              percentage={Number(
                (data.monthsAlreadyPaid * 100) / data.loanTenure
              ).toFixed(2)}
            ></CircularProgress>
          </FlexColumn>
        </div>

        <div style={styles.container3}>
          <FlexColumn alignItems={"center"}>
            <Text
              style={{ marginBottom: "1rem", color: "white" }}
              variant="titleMedium"
            >
              Amount
            </Text>
            <Text style={{ marginBottom: "1rem", color: "white" }}>
              ₹{data.totalAmount - data.remainingAmount} of ₹{data.totalAmount}
            </Text>
            <CircularProgress
              percentage={Number(
                ((data.totalAmount - data.remainingAmount) * 100) /
                  data.totalAmount
              ).toFixed(2)}
            ></CircularProgress>
          </FlexColumn>
        </div>
      </FlexColumn>

      <div style={styles.container}>
        <table>
          <tr>
            <td>
              <Text variant="titleMedium">Loan Tenure </Text>
            </td>
            <td>
              {data.loanTenure}
              {" Months"}
            </td>
          </tr>
          <tr>
            <td>
              <Text variant="titleMedium">Principal Amount</Text>
            </td>
            <td> ₹{data.principal}</td>
          </tr>
          <tr>
            <td>
              <Text variant="titleMedium">Interest Rate</Text>{" "}
            </td>
            <td>
              {data.interestRate}
              {"%"}
            </td>
          </tr>
          <tr>
            <td>
              <Text variant="titleMedium">Total Amount</Text>{" "}
            </td>
            <td> ₹{data.totalAmount}</td>
          </tr>
        </table>
      </div>
      <div style={styles.container}>
        <table>
          <tr>
            <td>
              <Text variant="titleMedium">Remaining Amount</Text>
            </td>
            <td> ₹{data.remainingAmount}</td>
          </tr>
          <tr>
            <td>
              <Text variant="titleMedium">Months Paid</Text>
            </td>
            <td>{data.monthsAlreadyPaid}</td>
          </tr>
        </table>
      </div>
      <div style={styles.container}>
        <Text variant="titleMedium">Month-wise</Text>
        <table>
          {data.Pays.map((item) => {
            return (
              <tr>
                <td>
                  <Text>
                    {item.date}/{item.month + 1}/{item.year}
                  </Text>
                </td>
                <td>At {item.time}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

const CircularProgress = ({ percentage }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 10;
  const progress = (percentage / 100) * circumference;

  return (
    <View style={styles.circular}>
      <Svg
        width={2 * (radius + strokeWidth)}
        height={2 * (radius + strokeWidth)}
      >
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="transparent"
          stroke="#d1d1d1"
          strokeWidth={strokeWidth}
        />
        <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="transparent"
          stroke="#00796B"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress}
        />
        <SvgText
          x={radius + strokeWidth}
          y={radius + strokeWidth + 5}
          textAnchor="middle"
          fill="white"
          fontSize="20"
        >
          {`${percentage}%`}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "2rem",

    backgroundColor: "white",
    borderRadius: "10px",

    margin: "2rem",
    marginBottom: "0rem",
  },
  container1: {
    padding: "2rem",
    borderRadius: "10px",
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
    backgroundColor: "rgb(49, 77, 223)",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  heading: {
    fontWeight: "600",
  },
  circular: {
    justifyContent: "center",
    alignItems: "center",
  },
  container3: {
    padding: "2rem",
    width: "max-content",
    borderRadius: "10px",
    margin: "2rem",
    marginBottom: "0rem",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px", //backgroundImage: "linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)",
    backgroundColor: "#2a52be",
    // backgroundImage: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
  },
});

export default Profile;
