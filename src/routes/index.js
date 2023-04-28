const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");
const gameRoutes = require("./game.route");

router.use("/auth", authRoutes);
router.use("/user", auth, userRoutes);
router.use("/game", auth, gameRoutes);

module.exports = router;
