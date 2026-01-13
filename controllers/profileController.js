const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      course,
      year,
      phone,
      location,
      skills,
      about,
    } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        course,
        year,
        phone,
        location,
        skills,
        about,
      },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};
