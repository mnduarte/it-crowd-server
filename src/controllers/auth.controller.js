// @Vendors
const Controllers = {};
const BaseModel = require("../models/base.model");
const User = new BaseModel("User");

const jwt = require("jsonwebtoken");

Controllers.login = async (req, res) => {
  try {
    // Verify if the user exists
    const user = await User.findOne();

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    // Send token to customer
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error has occurred" });
  }
};

module.exports = {
  Controllers,
};
