const mongoose = require("mongoose");
const { Schema } = mongoose;

const newUser = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model("user", newUser);
console.log(User);
module.exports = User;
