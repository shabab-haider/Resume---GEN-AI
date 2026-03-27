const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blackListedToken.model");

/**
 * Authentication middleware that verifies JWT tokens from request cookies.
 *
 * @async
 * @function authUser
 * @throws {Error} Sends 401 status with error message if token is invalid or missing
 * @description Extracts JWT token from request cookies, verifies it using JWT_SECRET environment variable,
 * and attaches the decoded user data to req.user. If token is missing or invalid,
 * responds with 401 status code and error message.
 * @example app.get('/protected-route', authUser, (req, res) => {
 *   const {username, id} = req.user.id;
 * });
 */
async function authUser(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No user loggedIn" });
    }
    const isBlackListed = await tokenBlacklistModel.findOne({ token });
    if (isBlackListed) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

module.exports = { authUser };
