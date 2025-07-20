const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./db");
const userRoutes = require("./routes/users");
const assessmentRoutes = require("./routes/assessment");
const personalityRoutes = require("./routes/personality")
const { verifyToken } = require("./middleware/auth");
const guidanceRoutes = require("./routes/guidance")
const geminiRoutes = require("./routes/gemini");
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/assessment", verifyToken, assessmentRoutes);
app.use("/api/personality", personalityRoutes)
app.use("/api/guidance", guidanceRoutes)
app.use("/api/gemini", geminiRoutes);
app.use("/api", profileRoutes);

app.get("/", (req, res) => res.send("Traitmatch API running"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
