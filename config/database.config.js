const mongoose = require("mongoose");
const MongoConfig = require("./mongo.config");

const env = process.env.IT_CROWD_ENV || "local";
const databases = [MongoConfig];

databases.forEach((database) => {
  mongoose.connect(database[env].build(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on(
    "error",
    console.error.bind(
      console,
      `connection error with Database ${database.name}`
    )
  );
  db.once("open", () => {
    if (env !== "test")
      console.log(
        `Connection with database ${database.name} succeeded: ${env}`
      );
  });

  exports.db = db;
});
