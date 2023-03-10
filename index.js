const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data");
const cors = require("cors");
const connect = require("./config/mongodb");
const userRouter = require("./router/userRouter");
const chatRouter = require("./router/chatRouter.js");
const ErrorHandler = require("./middleware/errorHandler");
const messageRouter = require("./router/messageRouter");
const profileRouter = require("./router/profileRouter");
const projectRouter = require("./router/projectRouter");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connect();
app.get("/", (req, res) => {
  console.log("hello");
  res.json("backend is running");
});
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);
app.use("/api/profile", profileRouter);
app.use("/api/project", projectRouter);

app.use(ErrorHandler);

const APP_PORT = process.env.APP_PORT || 3000;
const server = app.listen(
  5000,
  console.log("server is running on the port ", APP_PORT)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://projectshare.netlify.app",
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);

    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing", room);
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing", room);
  });
  socket.on("new message", (newMessageReceived) => {
    // console.log(newMessageReceived);
    var chat = newMessageReceived.Chat;
    if (!chat.users) {
      return console.log("chat.users is not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) {
        return;
      }

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
  socket.off("setup", () => {
    socket.in(user._id).emit("reconnect");
    socket.leave(userData._id);
  });
});
