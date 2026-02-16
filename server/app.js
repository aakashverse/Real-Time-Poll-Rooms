require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const pollRoutes = require("./routes/pollRoutes");
const pollSocket = require("./service/pollSockets");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err);
  }
};

connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

app.use("/api/polls", pollRoutes);

pollSocket(io);

server.listen(process.env.PORT || 8080, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
