const User = require("../models/User");

async function createUser(newUserData) {
  return (newUser = await User.create(newUserData));
}

module.exports = { createUser };
