const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  emiStartDate: {
    type: Date,
  },
  loanTenure: {
    type: Date,
  },
  interestRate: {
    type: Number,
  },
  monthlyPay: {
    type: [
      {
        month: Number,
        year: Number,
        date: Date,
      },
    ],
  },  
  balance : {
    type :  Number ,
    default : 0 
  }
},{timestamps : true});

module.exports =mongoose.model("Users", UserSchema);
