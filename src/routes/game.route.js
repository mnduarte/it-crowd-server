const express = require("express");
const router = express.Router();
const { Controllers } = require("../controllers/game.controller");
const validateGame = require("../middlewares/validateGame");

//Search Game by id
router.get("/", Controllers.getById);

//Create Game
router.post("/", validateGame, Controllers.create);

//Update Game
router.put("/:id", validateGame, Controllers.update);

//Delete Game
router.delete("/:id", Controllers.delete);

//Search Game by name
router.get("/search/", Controllers.getByName);

module.exports = router;
