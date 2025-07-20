const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "models/gemini-2.5-pro";

// POST /api/gemini/ask
router.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required." });
  }

  try {
    const result = await axios.post(
      `https://generativelanguage.googleapis.com/v1/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
You are Evolve Bot, an advanced AI career guidance counselor.

You are knowledgeable in:
- career paths
- education options
- personal development
- skill and personality alignment
- industry trends
- and professional growth.

✅ Respond with empathy, clarity, and actionable suggestions.
✅ Give short, helpful, and to-the-point answers by default.
✅ Only provide detailed guidance if the user asks things like:
  - "give me more detail"
  - "explain this in depth"
  - "elaborate" or similar

Now respond briefly to the following user question:
"${prompt}"
                `.trim(),
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseText =
      result.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    res.status(200).json({ reply: responseText });
  } catch (err) {
    console.error("Gemini API error:", err?.response?.data || err.message);
    res.status(500).json({
      message: "Gemini API error",
      error: err?.response?.data || err.message,
    });
  }
});

module.exports = router;
