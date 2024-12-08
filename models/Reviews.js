const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    required: true,
  },
  // cloudinaryId: {
  //   type: String,
  //   require: true,
  // },
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
