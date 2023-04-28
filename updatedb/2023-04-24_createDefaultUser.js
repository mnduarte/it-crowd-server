const BaseModel = require("../src/models/base.model");

const User = new BaseModel("User");

const newUser = {
  name: "Guest",
  email: "guest@itcrowd.com",
  favoritesId: [],
};

module.exports = async () => {
  return User.create(newUser);
};
