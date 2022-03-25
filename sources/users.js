const bycypt = require("bcrypt");
const User = {
  id: 1,
  username: "qurrota@gmail.com",
  password: bycypt.hashSync("akucantik123", 10),
  login: false,

  id: 2,
  username: "admin@gmail.com",
  password: bycypt.hashSync("admin1", 10),
  login: false,
};

module.exports = User;
