const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://resume-gen-ai-kocz.vercel.app", credentials: true }));

/** Require all routes here */
const authRoutes = require("../src/routes/auth.routes");
const interviewRoutes = require("../src/routes/interview.routes");

/** Use all routes here */
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;
