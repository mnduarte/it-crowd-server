const BaseModel = require("../src/models/base.model");
const Game = new BaseModel("Game");
const games = require("../games.json");

module.exports = async () => {
  return Game.insertMany(games);
};
