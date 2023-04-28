const express = require("express");
const router = express.Router();
const { Controllers } = require("../controllers/user.controller");

router.get("/", Controllers.getUser);
//Add favorite
router.put("/add-favorite", Controllers.addFavorite);
//Remove favorite
router.put("/remove-favorite", Controllers.removeFavorite);

module.exports = router;
