const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
