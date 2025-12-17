const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");
const { authenticateToken } = require("../middleware/authMiddleware");

/* ---------------- ADMIN ONLY ---------------- */

// CREATE internship
router.post("/", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const internship = new Internship({
      ...req.body,
      createdBy: req.user.id,
    });

    await internship.save();
    res.status(201).json({ message: "Internship created", internship });
  } catch (err) {
    res.status(500).json({ message: "Failed to create internship" });
  }
});

// UPDATE internship
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Internship updated", internship: updated });
  } catch (err) {
    console.error("CREATE INTERNSHIP ERROR:", err);
    res.status(500).json({ message: err.message });
  }
  
});

// DELETE internship
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await Internship.findByIdAndDelete(req.params.id);
    res.json({ message: "Internship deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete internship" });
  }
});

/* ---------------- PUBLIC / STUDENT ---------------- */

// GET all internships
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: "Failed to load internships" });
  }
});

module.exports = router;
