const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    "http://localhost:5173",
    // Correct origin without the trailing slash
  // ... other allowed origins
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // If you need to send cookies/auth headers
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

/** Require all routes here */
const authRoutes = require("../src/routes/auth.routes");
const interviewRoutes = require("../src/routes/interview.routes");

/** Use all routes here */
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;
