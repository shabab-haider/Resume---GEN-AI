const { Router } = require("express");
const authRouter = Router();
const authController = require("../Controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/**
 * @route post /api/auth/register
 * @description Create a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUser);

/**
 * @route POST /api/auth/login
 * @description Login an existing user
 * @access Public
 */

authRouter.post("/login", authController.loginUser);

/**
 * @route GET /api/auth/logout
 * @description logout the user and create a blacklisted token
 * @access Public
 */

authRouter.get("/logout", authController.logoutUser);

/**
 *@route GET /api/auth/get-me
 *@description Autheticate user and get data of current loggedIn user
 *@access Public
 */

authRouter.get("/get-me", authMiddleware.authUser, authController.getMe);
module.exports = authRouter;
