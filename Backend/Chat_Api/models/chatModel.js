const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    members: Array,
    type: String, // group or private
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatSchema);
