const mongoose = require('mongoose');

// Define Student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  year: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
