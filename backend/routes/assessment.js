const express = require("express");
const Assessment = require("../models/Assessment");
const router = express.Router();

router.post("/submit", async (req, res) => {
  try {
    const {
      name,
      age,
      currentStatus,
      academicBackground,
      futureGoals,
      mainConcerns,
      location,
    } = req.body;

    const assessment = new Assessment({
      user: req.user._id,
      name,
      age,
      currentStatus,
      academicBackground,
      futureGoals,
      mainConcerns,
      location,
    });

    await assessment.save();
    res.status(201).json({ message: "Assessment submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get latest assessment scores for a user
router.get("/latest/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const latest = await Assessment.findOne({ user: userId })
      .sort({ timestamp: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No assessment found." });
    }

    return res.status(200).json({ scores: latest.scores });
  } catch (err) {
    console.error("Error fetching latest assessment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
