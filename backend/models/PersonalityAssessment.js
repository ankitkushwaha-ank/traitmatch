const mongoose = require("mongoose")

const AnswerSchema = new mongoose.Schema({
  questionId: Number,
  trait: String,
  value: Number,
})

const PersonalityAssessmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [AnswerSchema],
  scores: {
    openness: Number,
    conscientiousness: Number,
    extraversion: Number,
    agreeableness: Number,
    neuroticism: Number,
  },
  assessedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("PersonalityAssessment", PersonalityAssessmentSchema)
