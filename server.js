const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(`ERROR_NAME: ${err.name}, ERROR_MESSAGE: ${err.message}`);
  console.log("uncaughtException REJECTION! Shutting down...");
  process.exit(1);
});

// read env from file and add them to node env
dotenv.config({ path: "./config.env" });

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("DB Connection SUCCESSFUL!"));

mongoose.set("strictQuery", false);

// start server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR_NAME: ${err.name}, ERROR_MESSAGE: ${err.message}`);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
