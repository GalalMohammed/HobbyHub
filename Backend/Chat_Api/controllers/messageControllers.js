const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

module.exports.createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  if (!chatId || !senderId || !text)
    return res.status(400).send({ error: "Missing fields" });

  try {
    const message = await Message.create({ chatId, senderId, text });
    const chat = await Chat.findByIdAndUpdate(chatId, {
      updated_at: new Date(),
    });
    return res.status(200).json({ message, chat });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

module.exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  if (!chatId) return res.status(400).send({ error: "Missing fields" });

  try {
    const messages = await Message.find({ chatId });
    return res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
