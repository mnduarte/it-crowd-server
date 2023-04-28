module.exports = {
  name: "MongoDB",
  local: {
    dbname: process.env.MONGO_DBNAME || "it-crowd",
    host: process.env.MONGO_DBHOST || "localhost",
    build() {
      return `mongodb://${this.host}/${this.dbname}`;
    },
  },
  test: {
    dbname: "it-crowd-test",
    host: "127.0.0.1",
    build() {
      return `mongodb://${this.host}/${this.dbname}`;
    },
  },
};
