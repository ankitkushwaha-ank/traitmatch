const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  goals: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ["Currently in School", "Currently in College/University", "Currently Working", "Not Currently Working"],
    default: "Currently in College/University"
  },
  avatar_url: {
    type: String
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
