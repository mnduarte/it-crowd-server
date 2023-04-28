// @Vendors
const Controllers = {};
const BaseModel = require("../models/base.model");
const Game = new BaseModel("Game");
const User = new BaseModel("User");
// @Services
const AuditLogService = require("../services/log.service");

const LIMIT_GAMES = 10;

Controllers.getById = async (req, res) => {
  const { id } = req.query;
  const user = await User.findOne({ _id: req.userId });

  const game = await Game.findOne({ _id: id });

  game.isFavorite = user.favoritesId.includes(id);

  AuditLogService.log("Info", "Game/getById");

  res.send({
    results: { ...game._doc, isFavorite: user.favoritesId.includes(id) },
  });
};

Controllers.getByName = async (req, res) => {
  const { name } = req.query;

  const games = await Game.find(
    { name: { $regex: name, $options: "i" } },
    { rating: -1 },
    LIMIT_GAMES
  );

  AuditLogService.log("Info", "Game/getByName");

  res.send({ results: games });
};

Controllers.create = async (req, res) => {
  try {
    const { name, released, backgroundImage, rating, ratingTop } = req.body;

    const newGame = await Game.create({
      name,
      released,
      backgroundImage,
      rating,
      ratingTop,
    });
    AuditLogService.log("Info", "Game/create");

    res.send({ results: newGame });
  } catch (error) {
    res.status(500).json({ message: "Error when creating the game" });
  }
};

Controllers.update = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body);

    if (updatedGame) {
      AuditLogService.log("Info", "Game/create");
      res.send({
        message: "Game successfully updated",
        results: updatedGame,
      });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating the game" });
  }
};

Controllers.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGame = await Game.remove({ _id: id });
    if (deletedGame) {
      res.json({ message: "Game successfully deleted", results: deletedGame });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting game" });
  }
};

module.exports = {
  Controllers,
};
