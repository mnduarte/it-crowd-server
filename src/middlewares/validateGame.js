const validateGame = (req, res, next) => {
  const { name, released, backgroundImage, rating, ratingTop } = req.body;

  if (!name || !released || !backgroundImage) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (rating < 0 || ratingTop < 0) {
    return res
      .status(400)
      .json({ message: "Rating fields must be non-negative" });
  }

  next();
};

module.exports = validateGame;
