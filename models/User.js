const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Field email is required"],
  },
  password: {
    type: String,
    required: [true, "Field password is required"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
