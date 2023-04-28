// @Vendors
const Controllers = {};
const BaseModel = require("../models/base.model");
const User = new BaseModel("User");
// @Services
const AuditLogService = require("../services/log.service");

Controllers.getUser = async (req, res) => {
  try {
    const [user] = await User.aggregate([
      {
        $match: { _id: req.userId },
      },
      {
        $lookup: {
          from: "games",
          localField: "favoritesId",
          foreignField: "_id",
          as: "favorites",
        },
      },
    ]);

    AuditLogService.log("Info", "User/getUser");
    res.send({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error to get the user" });
  }
};

Controllers.addFavorite = async (req, res) => {
  try {
    const { gameId } = req.body;
    const user = await User.findOne({ _id: req.userId });
    const isFavorite = user.favoritesId.indexOf(gameId) >= 0;

    if (isFavorite) {
      return res.send({
        message: "The game already exists as a favorite",
      });
    }
    user.favoritesId.push(gameId);

    user.save();

    AuditLogService.log("Info", "User/addFavorite");
    res.send({
      message: "Favorite successfully added",
      game: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating the user" });
  }
};

Controllers.removeFavorite = async (req, res) => {
  try {
    const { gameId } = req.body;
    const user = await User.findOne({ _id: req.userId });

    user.favoritesId = user.favoritesId.filter(
      (favoriteId) => favoriteId !== gameId
    );

    user.save();

    AuditLogService.log("Info", "User/removeFavorite");
    res.send({
      message: "Favorite successfully removed",
      game: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating the user" });
  }
};

module.exports = {
  Controllers,
};
