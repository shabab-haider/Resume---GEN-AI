const mongoose = require("mongoose");

const blackListedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "A token is required to blacklist"],
    },
  },
  { timestamps: true },
);

const tokenBlacklistModel = mongoose.model(
  "blacklistedTokens",
  blackListedTokenSchema,
);

module.exports = tokenBlacklistModel;
