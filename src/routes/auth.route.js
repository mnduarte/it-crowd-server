const express = require("express");
const router = express.Router();
const { Controllers } = require("../controllers/auth.controller");

//Login Initial
router.post("/login", Controllers.login);

module.exports = router;
