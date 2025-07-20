const express = require("express")
const router = express.Router()
const PersonalityAssessment = require("../models/PersonalityAssessment")
const { verifyToken } = require("../middleware/auth")

// POST /api/personality/submit
router.post("/submit", verifyToken, async (req, res) => {
  const { answers, scores } = req.body

  try {
    if (!answers || !scores) {
      return res.status(400).json({ message: "Missing data" })
    }

    const assessment = new PersonalityAssessment({
      user: req.user._id,
      answers,
      scores,
    })

    await assessment.save()

    res.status(201).json({ message: "Assessment saved successfully", assessment })
  } catch (err) {
    console.error("Assessment Save Error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
