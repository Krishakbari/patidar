// Existing imports & setup
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema & Model
const incidentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  problem: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Incident = mongoose.model("Incident", incidentSchema);

// Submit route
app.post("/api/submit", async (req, res) => {
  const { name, mobile, problem } = req.body;
  if (!name || !mobile || !problem) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newIncident = new Incident({ name, mobile, problem });
    await newIncident.save();
    res.status(201).json({ message: "Submission successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Password-protected view route
app.post("/api/get-all", async (req, res) => {
  const { password } = req.body;
  if (password !== "2454") {
    return res.status(401).json({ message: "Password is incorrect" });
  }

  try {
    const submissions = await Incident.find().sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 7070;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
