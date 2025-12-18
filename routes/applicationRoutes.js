const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Internship = require("../models/Internship");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/authMiddleware");

/* ---------------- STUDENT APPLY ---------------- */

// Apply to internship
router.post("/apply/:internshipId", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can apply" });
    }

    const internship = await Internship.findById(req.params.internshipId);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    const user = await User.findById(req.user.id);
    if (!user.resume) {
      return res.status(400).json({ message: "Upload resume first" });
    }

    const alreadyApplied = await Application.findOne({
      student: req.user.id,
      internship: internship._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = new Application({
      student: req.user.id,
      internship: internship._id,
      resume: user.resume,
    });

    await application.save();

    res.status(201).json({ message: "Application submitted" });
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ message: "Failed to apply" });
  }
});

/* ---------------- ADMIN VIEW ---------------- */

// View all applications (admin)
router.get("/admin", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const applications = await Application.find()
      .populate("student", "name email")
      .populate("internship", "title company")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("Fetch applications error:", err);
    res.status(500).json({ message: "Failed to load applications" });
  }
});

module.exports = router;
