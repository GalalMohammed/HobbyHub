const express = require("express");
const app = express();
const createError = require("http-errors");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socket = require("socket.io");
const request = require("request");
const { createServer } = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
mongoose.connect(process.env.MONGO_URL);

function isAuthorized(token) {
  return new Promise((resolve, reject) => {
    request.get(
      "http://localhost:8000/api/user",
      { headers: { Authorization: token } },
      (_err, res, body) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          reject(res.statusCode);
        }
      }
    );
  });
}

app.use("/api/chats", require("./routes/chatRoutes"));
app.use("/api/messages", require("./routes/messageRoute"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: "http://localhost:3000" });

let onlineUsers = [];

io.on("connection", (socket, req) => {
  console.log(socket.id + " connected");
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    console.log("onlineU", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers); //send users
  });
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find((u) => u.userId === message.recipientId);
    console.log("Sending to ", user);
    if (user) io.to(user.socketId).emit("getMessage", message);
  });
  socket.on("disconnect", () => {
    onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

// io.on("connection", (connection, req) => {
//   const token = req.headers?.authorization;
//   if (token) {
//     getUserName(token).then((username) => {
//       connection.username = username;
//       connection.on("message", async (message) => {
//         try {
//           const parsedMessage = JSON.parse(message);
//           const { _id } = await Message.create({
//             sender: connection.username,
//             recipient: parsedMessage.recipient,
//             text: parsedMessage.text,
//           });
//           wss.clients.forEach((client) => {
//             if (client.username === parsedMessage.recipient) {
//               client.send(
//                 JSON.stringify({
//                   sender: connection.username,
//                   text: parsedMessage.text,
//                   _id,
//                 })
//               );
//             }
//           });
//         } catch (e) {
//           console.log(e);
//         }
//       });
//     });
//   }
// });

const server = httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
