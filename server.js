const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
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

const Student = require('./models/Student');

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, InternConnect Backend is Running!');
});


// CREATE - Add a new student
app.post('/students', async (req, res) => {
  try {
    const { name, email, course, year } = req.body;

    const newStudent = new Student({ name, email, course, year });
    await newStudent.save();

    res.status(201).json({ message: "Student added successfully!", student: newStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding student" });
  }
});

// READ - Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching students" });
  }
});


// READ - Get one student by ID
app.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Invalid ID format" });
  }
});

// UPDATE - Edit a student
app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json({
      message: "Student updated successfully!",
      updatedStudent: student
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(400).json({ error: "Error updating student" });
  }
});


// DELETE - Remove a student
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting student" });
  }
});

// CREATE - Add a new student
app.post('/students', async (req, res) => {
  try {
    const { name, email, course, year } = req.body;

    const newStudent = new Student({
      name,
      email,
      course,
      year
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!", student: newStudent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding student" });
  }
});


// Update a student (PUT)
app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!student) return res.status(404).json({ error: "Student not found" });

    res.json({
      message: "Student updated successfully!",
      updatedStudent: student
    });
  } catch (err) {
    console.log("Update Error:", err);
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
