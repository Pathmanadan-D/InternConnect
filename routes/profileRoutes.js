const express = require("express");
const router = express.Router();

const User = require("../models/User");
const upload = require("../middleware/resumeUpload");
const { authenticateToken } = require("../middleware/authMiddleware");
const { updateProfile } = require("../controllers/profileController");

// 🔐 GET logged-in user profile
router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to load profile" });
  }
});

// 🔐 UPDATE profile details
router.put("/", authenticateToken, updateProfile);

// 🔐 UPLOAD resume
router.post(
  "/resume",
  authenticateToken,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const user = await User.findById(req.user.id);
      user.resume = req.file.path;
      await user.save();

      res.json({ message: "Resume uploaded successfully" });
    } catch (err) {
      res.status(500).json({ message: "Resume upload failed" });
    }
  }
);

module.exports = router;
