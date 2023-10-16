import { Card, Searchbar, Text, Button } from "react-native-paper";
import SvgComponent from "../../../components/svgs";

const AddUser = () => {
  return (
    <Card
      style={{
        padding: "1rem",
        marginBottom: "2rem",
        marginTop: "2rem",
        backgroundColor: "white",
      }}
    >
      <Card.Title title="Who Paid Today?"></Card.Title>
      <Searchbar></Searchbar>
      <div style={{ padding: "1rem" }}>
        <Text>No user selected..</Text>
      </div>
      <Button mode="contained" style={{ backgroundColor:"rgb(49, 77, 223)" , borderRadius: "10px" }}>
        Update
      </Button>
    </Card>
  );
};

export default AddUser;
