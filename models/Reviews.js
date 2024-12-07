const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
