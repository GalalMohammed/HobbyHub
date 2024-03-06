const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXP_DATE,
  });
};

module.exports.signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      console.log("required failed");
      return res.status(400).json({ error: "All fields are required!" });
    }
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res
        .status(400)
        .json({ error: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res
        .status(400)
        .json({ error: "Email already used", status: false });
    const salt = await bcrypt.genSalt();
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({ email, username, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: false });
    delete user.password;
    return res
      .status(201)
      .json({ userId: user._id, username: user.username, token });
  } catch (err) {
    //const errors = handleErrors(err);
    console.log(err);
    return res.status(400).json({ error: "Failed to create user" });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ error: "Invalid username or Password" });

  const token = createToken(user._id);
  res.cookie("jwt", token, { httpOnly: true });
  return res
    .status(200)
    .json({ userId: user._id, username: user.username, token });
};

module.exports.findUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user) return res.status(200).json({ username: user.username });
    return res.status(400).json({ error: "user not found" });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) return res.status(200).json({ users });
    return res.status(400).json({ error: "users not found" });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
