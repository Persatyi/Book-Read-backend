const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 4444 } = process.env;

mongoose
  .connect(DB_HOST, { dbName: "books_reader" })
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
