const app = require("./app");
const dotenv = require("dotenv");
const path  = require("path");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
    console.log(err);
    process.exit(1);
  });
  
  const http = require("http");
  const User = require("./models/user");

  const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const DB = process.env.DBURI.replace("<PASSWORD>", process.env.DBPASSWPRD);

mongoose
  .connect(DB)
  .then((con) => {
    console.log("DB connection is successful");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
    console.log(err);
    server.close(() => {
      process.exit(1);
    });
  });