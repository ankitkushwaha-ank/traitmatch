const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const UserProfile = require("../models/UserProfile");

// Middleware to protect route (basic demo version)
const authenticate = (req, res, next) => {
  const userId = req.headers["x-user-id"]; // You should replace this with JWT in production
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Validate if it's a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  req.userId = userId;
  next();
};

// Save or update profile
router.post("/my-profile", authenticate, async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.userId);
    const { name, email, phone, goals, status, avatar_url } = req.body;

    const profileData = {
      userId: userObjectId,
      name,
      email,
      phone,
      goals,
      status,
      avatar_url,
      updated_at: new Date(),
    };

    const profile = await UserProfile.findOneAndUpdate(
      { userId: userObjectId },
      profileData,
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Profile saved successfully", profile });
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ error: "Failed to save profile" });
  }
});

// Get profile
router.get("/my-profile", authenticate, async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.userId);

    const profile = await UserProfile.findOne({ userId: userObjectId });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;
