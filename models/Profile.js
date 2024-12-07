const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
 role: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
 name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  services: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  portfolio: {
    require: true,
    type: [{
      image: String,
      cloudinaryId: String,
    }], 
    default: []
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
