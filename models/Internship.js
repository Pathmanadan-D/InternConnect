const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Remote", "Onsite", "Hybrid"],
      default: "Remote",
    },
    duration: {
      type: String, // e.g. "3 Months"
      required: true,
    },
    stipend: {
      type: String, // e.g. "LKR 25,000"
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);
