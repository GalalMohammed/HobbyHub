const mongooses = require("mongoose");
const MessageScheme = new mongooses.Schema({
  sender: String,
  recipient: String,
  text: String,
}, { timestamps: true });

const MessageModel = mongooses.model("Message", MessageScheme);

module.exports = MessageModel;
