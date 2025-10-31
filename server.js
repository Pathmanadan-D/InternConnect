const express = require('express');
const app = express();
app.use(express.json()); // To parse JSON body in POST/PUT requests
const PORT = 5000;

const mongoose = require('mongoose');  // <-- Mongoose import

// Connect to MongoDB via Mongoose
const mongoURL = "mongodb+srv://internconnect_user:Internmongo21@internconnectcluster.gpuq8ax.mongodb.net/internconnectDB?retryWrites=true&w=majority";

async function startServer() {
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected successfully via Mongoose!");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
}

startServer();

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, InternConnect Backend is Running!');
});

const Student = require('./models/Student');

// Create a new student (POST)
app.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error creating student" });
  }
});

// Get all students (GET)
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching students" });
  }
});

// Get a single student by ID (GET)
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching student" });
  }
});

// Update a student (PUT)
app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error updating student" });
  }
});

// Delete a student (DELETE)
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error deleting student" });
  }
});
