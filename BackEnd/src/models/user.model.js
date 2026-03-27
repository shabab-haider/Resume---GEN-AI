const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username Already Exist"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email Already Exist"],
  },
  password: {
    type: String,
    required: true,
  },
 
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
