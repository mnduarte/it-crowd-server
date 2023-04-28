// @Vendors
const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");
const Autopopulate = require("mongoose-autopopulate");
const _ = require("lodash");

const GameSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    released: {
      type: Date,
    },
    backgroundImage: {
      type: String,
    },
    rating: {
      type: Number,
    },
    ratingTop: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

/**
 * Instance method to expose to the LatBoard API only the related fields.
 */

GameSchema.methods.toJSON = function () {
  const obj = this.toObject();

  return _.omit(obj, ["__v"]);
};

GameSchema.plugin(autoIncrement, {
  model: "Game",
  startAt: 1,
});
GameSchema.plugin(Autopopulate);

module.exports = mongoose.model("Game", GameSchema);
