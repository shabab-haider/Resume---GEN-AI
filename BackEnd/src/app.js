const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.setAuthCookie = (token) => {
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  };
  next();
});

// Render ke liye ye line bhi zaroori hai (Middleware ke bahar)
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const allowedOrigins = [
  // Correct origin without the trailing slash
  "http://localhost:5173",
  // ... other allowed origins
  "https://resume-gen-ai-sp07.onrender.com",
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
const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");

app.get("/", (req, res) => {
  res.send("server si runing...");
});

/** Use all routes here */
app.use("/api/auth", authRoutes);
app.use("/api/interview", interviewRoutes);

module.exports = app;
