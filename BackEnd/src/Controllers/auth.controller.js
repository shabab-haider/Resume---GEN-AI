const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const tokenBlacklistModel = require("../models/blackListedToken.model");

/**
 * @name Registeruser
 * @description Create a new user, require username, email and password in req.body
 * @access Public
 */
async function registerUser(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res
      .status(400)
      .json({ message: "Please provide username, email and password" });
  }
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (isUserAlreadyExists) {
    res.status(400).json({ message: "Username or Email Already Exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "User created successfully",
    user: { id: user._id, username: user.username, email: user.email },
  });
}

/**
 * @name Loginuser
 * @description Login User with email and password
 * @access Public
 */

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(400).json({ message: "invalid email or password" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    res.status(400).json({ message: "invalid email or password" });
  }
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    messgae: "user loggedIn successfully",
    user: { id: user._id, email: user.email, username: user.username },
  });
}

/**
 * @name LogoutUser
 * @description Logout user and create a blacklisted token
 * @acess Public
 */

async function logoutUser(req, res) {
  const token = req.cookies.token;
  if (!token) {
    res.status(400).json({ message: "Unable to logout" });
  }
  await tokenBlacklistModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "user logged out successfully" });
}

/**
 * Retrieves the current authenticated user's information
 * @name getMe
 * @description return loggedIn user data
 * @returns {void} Sends JSON response with user data (id, email, username)
 * @throws {Error} If user not found in database
 * @access Public
 */
async function getMe(req, res) {
  const { id, username } = req.user;
  const user = await userModel.findOne({ _id: id, username });
  res.status(200).json({
    message: "user details fetched successfully",
    user: { id: user._id, email: user.email, username: user.username },
  });
}

module.exports = { registerUser, loginUser, logoutUser, getMe };
