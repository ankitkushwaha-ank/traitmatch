const express = require("express")
const router = express.Router()
const axios = require("axios")
const { GoogleAuth } = require("google-auth-library")

const GEMINI_ENDPOINT = process.env.GEMINI_ENDPOINT

router.post("/", async (req, res) => {
  const { name, age, interests, personality, goals } = req.body

  const prompt = `
You are a career guidance assistant. Given this student info, suggest 3 ideal career paths. Explain each one clearly, along with required skills and why it fits.

- Name: ${name}
- Age: ${age}
- Interests: ${interests}
- Personality Traits: ${personality}
- Future Goals: ${goals}

Respond in structured JSON:
{
  "recommendations": [
    {
      "career": "",
      "reason": "",
      "requiredSkills": []
    }
  ]
}
  `

  try {
    const auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/cloud-platform",
    })
    const client = await auth.getClient()
    const accessToken = await client.getAccessToken()

    const response = await axios.post(
      GEMINI_ENDPOINT,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken.token}`,
          "Content-Type": "application/json",
        },
      }
    )

    const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text
    const jsonResponse = JSON.parse(content)

    res.json(jsonResponse)
  } catch (error) {
    console.error("Gemini API error:", error.message)
    res.status(500).json({ message: "Failed to fetch career guidance." })
  }
})

module.exports = router
