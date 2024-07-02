const reader = require("xlsx");

const axios = require("axios");

const file = reader.readFile("./main.xlsx");

let data = [];

const sheets = file.SheetNames;

let users = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

const usersAccounts = reader.utils.sheet_to_json(
  file.Sheets[file.SheetNames[1]]
);

usersAccounts.map((item, pos) => {

  if (!("emis" in users[item["sno"] - 1])) {
    users[item["sno"] - 1]["emis"] = [];
  }

  users[item["sno"] - 1]["emis"].push(item);

});



async function createUser() {
  const resp = await axios.post("https://finance-app-2jdx.onrender.com/api/users/create-users", {
    data: users,
  });
  console.log(resp);
}

createUser();

// const date = new Date()

// const startDate =  new Date("10-03-2024")

// console.log(startDate.getFullYear() , startDate.getMonth())

// startDate.setMonth( startDate.getMonth()+5 )

// console.log(startDate.getFullYear() , startDate.getMonth())

// console.log(date.getFullYear())
// console.log(date.getMonth())