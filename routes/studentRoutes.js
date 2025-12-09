// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

// CREATE - ADMIN ONLY
router.post(
  '/',
  authenticateToken,
  requireRole('admin'),
  async (req, res) => {
    try {
      const { name, email, course, year } = req.body;
      const newStudent = new Student({ name, email, course, year });
      await newStudent.save();
      res.status(201).json({ message: "Student added successfully!", student: newStudent });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error adding student" });
    }
  }
);

// READ ALL - PUBLIC
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching students" });
  }
});

// READ ONE - PUBLIC
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// UPDATE - ADMIN ONLY
router.put(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!student) return res.status(404).json({ error: "Student not found" });
      res.json({ message: "Student updated successfully!", updatedStudent: student });
    } catch (err) {
      console.error("Update Error:", err);
      res.status(400).json({ error: "Error updating student" });
    }
  }
);

// DELETE - ADMIN ONLY
router.delete(
  '/:id',
  authenticateToken,
  requireRole('admin'),
  async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) return res.status(404).json({ error: "Student not found" });
      res.json({ message: "Student deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting student" });
    }
  }
);

module.exports = router;
