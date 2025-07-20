const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  age: Number,
  currentStatus: String,
  academicBackground: String,
  futureGoals: String,
  mainConcerns: String,
  location: String,
  takenAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Assessment", assessmentSchema);
