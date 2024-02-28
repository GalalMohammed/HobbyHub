const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ws = require("ws");
const request = require("request");
const Message = require("./models/Messages");
require("dotenv").config();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URL);

function getUserName(token) {
  return new Promise((resolve, reject) => {
    request.get(
      "http://localhost:8000/api/user",
      { headers: { Authorization: token } },
      (_err, res, body) => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(body).username);
        } else {
          reject(res.statusCode);
        }
      }
    );
  });
}

app.get("/messages/:anotherClient", async (req, res) => {
  const { anotherClient } = req.params;
  getUserName(req.headers?.authorization).then((user) => {
    Message.find({
      $or: [
        { sender: user, recipient: anotherClient },
        { sender: anotherClient, recipient: user },
      ],
    })
      .sort({ createdAt: 1 })
      .then((messages) => {
        res.json(messages);
      });
  });
});

app.get("/users", async (req, res) => {
  getUserName(req.headers?.authorization)
    .then((user) => {
      Message.find({ recipient: user }, { _id: 0, sender: 1 })
        .distinct("sender")
        .then((distinctSenderUsers) => {
          Message.find({ sender: user }, { _id: 0, recipient: 1 })
            .distinct("recipient")
            .then((distinctRecipientUsers) => {
              const set = new Set(
                distinctSenderUsers.concat(distinctRecipientUsers)
              );
              res.json([...set]);
            })
            .catch((e) => {
              console.log("Error", e);
            });
        })
        .catch((e) => {
          console.log("Error", e);
        });
    })
    .catch((e) => {
      console.log("Error", e);
    });
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const wss = new ws.WebSocketServer({
  server,
});

wss.on("connection", (connection, req) => {
  const token = req.headers?.authorization;
  console.log(req.headers);
  if (token) {
    console.log(`User ${token} connected`);
    getUserName(token).then((username) => {
      connection.username = username;
      console.log(`User ${username} connected`);
      connection.on("message", async (message) => {
        try {
          const parsedMessage = JSON.parse(message);
          const { _id } = await Message.create({
            sender: connection.username,
            recipient: parsedMessage.recipient,
            text: parsedMessage.text,
          });
          wss.clients.forEach((client) => {
            if (client.username === parsedMessage.recipient) {
              client.send(
                JSON.stringify({
                  sender: connection.username,
                  text: parsedMessage.text,
                  _id,
                })
              );
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
    });
  }
});
