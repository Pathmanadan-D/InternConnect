const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },

    // PROFILE FIELDS (NEW)
    course: {
      type: String,
      default: "",
    },
    
    year: {
      type: String,
      default: "",
    },
    
    phone: {
      type: String,
      default: "",
    },
    
    location: {
      type: String,
      default: "",
    },
    
    skills: {
      type: [String],
      default: [],
    },
    
    about: {
      type: String,
      default: "",
    },
    

    // RESUME FILE (NEW)
    resume: { type: String, default: "" }
  },
  { timestamps: true }

);

module.exports = mongoose.model("User", userSchema);
