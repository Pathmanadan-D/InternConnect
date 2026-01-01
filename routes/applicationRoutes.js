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

    if (internship.status !== "open") {
      return res.status(400).json({
        message: "This internship is closed",
      });
    }
    

    await application.save();

    res.status(201).json({ message: "Application submitted" });
  } catch (err) {
    console.error("Apply error:", err);
    res.status(500).json({ message: "Failed to apply" });
  }
});

/* ---------------- ADMIN ONLY ---------------- */

// View all applications
router.get("/admin", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const filter = {};

    if (req.query.internship) {
      filter.internship = req.query.internship;
    }

    const applications = await Application.find()
      .populate("student", "name email resume")
      .populate("internship", "title company")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to load applications" });
  }
});

// STUDENT view own applications
router.get("/my", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Access denied" });
    }

    const applications = await Application.find({
      student: req.user.id,
    })
      .populate("internship", "title company location")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: "Failed to load applications" });
  }
});


// Update application status
router.put("/:id/status", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated", application: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
