const Chat = require("../models/chatModel");
const ObjectId = require("mongoose").Types.ObjectId;
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

function generateRandomHexString(length) {
  const characters = "abcdef0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to convert Django id to MongoDB _id
function convertDjangoIdToMongoId(djangoId) {
  // Convert Django id to hexadecimal string
  let hexId = generateRandomHexString(24);
  console.log(hexId);
  hexId = djangoId + hexId.slice(1);
  console.log(hexId);
  // Return ObjectId from the hexadecimal string
  return new ObjectId(hexId);
}

module.exports.createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    if (!firstId || !secondId) throw new Error("Missing parameter");

    const chat = await Chat.findOne({
      members: { $all: [parseInt(firstId), parseInt(secondId)] },
      type: "private",
    });
    console.log("found", chat);
    if (chat) return res.status(200).json(chat);
    const newchat = await Chat.create({
      members: [firstId, secondId],
      type: "private",
    });
    console.log("New private chat created!");
    return res.status(200).json(newchat);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports.createGroupChat = async (req, res) => {
  const { groupId, members } = req.body;
  try {
    if (!members) return res.status(400).json("Missing parameter");

    if (members.length < 1)
      return res.status(400).json("At least one member is required.");

    //console.log(typeof new ObjectId(parseInt(groupId)));
    const id = convertDjangoIdToMongoId(groupId);
    const chat = await Chat.findById(id);
    if (chat) return res.status(200).json(chat);
    const newchat = await Chat.create({
      _id: id,
      type: "group",
      members,
    });
    console.log("group chat created");
    return res.status(200).json(newchat);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports.getUserChats = async (req, res) => {
  const { type, userInfo } = req.params;
  try {
    let chats;
    chats = await Chat.find({
      members: { $in: [parseInt(userInfo)] },
      type,
    });
    // if (type === "private") {
    //   console.log("private", userInfo);
    // } else if (type === "group") {
    //   console.log("group", userInfo);
    //   chats = await Chat.find({
    //     members: { $in: [userInfo] },
    //     type,
    //   });
    // }
    //console.log(chats);
    return res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error getting the chats");
  }
};

module.exports.findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    if (!firstId || !secondId) throw new Error("Missing parameter");

    const chat = await Chat.findOne({ members: { $all: [firstId, secondId] } });
    if (chat) return res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
