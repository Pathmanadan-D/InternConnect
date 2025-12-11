const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authenticateToken } = require("../middleware/authMiddleware");
const upload = require("../middleware/resumeUpload");

// GET profile (self)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE basic profile
router.put("/", authenticateToken, async (req, res) => {
  try {
    const { name, email, course, year } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, course, year },
      { new: true }
    ).select("-password");

    res.json({ message: "Profile updated", user: updated });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Error updating profile" });
  }
});

// UPLOAD resume
router.post(
  "/resume",
  authenticateToken,
  upload.single("resume"),
  async (req, res) => {
    try {
      const updated = await User.findByIdAndUpdate(
        req.user.id,
        { resume: req.file.filename },
        { new: true }
      ).select("-password");

      res.json({
        message: "Resume uploaded",
        file: req.file.filename,
        user: updated,
      });
    } catch (err) {
      console.error("Resume upload error:", err);
      res.status(500).json({ message: "Error uploading resume" });
    }
  }
);

module.exports = router;
