const express = require("express");
const router = express.Router();
const Internship = require("../models/Internship");
const { authenticateToken } = require("../middleware/authMiddleware");
const Application = require("../models/Application");
const mongoose = require("mongoose");

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

/* ---------------- GET internships ---------------- */
router.get("/", authenticateToken, async (req, res) => {
  try {
    // ADMIN: only their internships + application count
    if (req.user.role === "admin") {
      const internships = await Internship.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.id) } },
        {
          $lookup: {
            from: "applications",
            localField: "_id",
            foreignField: "internship",
            as: "applications",
          },
        },
        {
          $addFields: {
            applicationCount: { $size: "$applications" },
          },
        },
        {
          $project: {
            applications: 0,
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      return res.json(internships);
    }

    // STUDENT / PUBLIC: only OPEN internships
    const internships = await Internship.find({ status: "open" }).sort({
      createdAt: -1,
    });

    res.json(internships);
  } catch (err) {
    res.status(500).json({ message: "Failed to load internships" });
  }
});

// TOGGLE internship status
router.put("/:id/toggle-status", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    internship.status =
      internship.status === "open" ? "closed" : "open";

    await internship.save();

    res.json({
      message: `Internship ${internship.status}`,
      status: internship.status,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
});


module.exports = router;
