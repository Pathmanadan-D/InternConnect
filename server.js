require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes'); // ✅ import routes
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body
// serve uploaded resume files
app.use("/uploads", express.static("uploads"));
// profile routes
app.use("/profile", require("./routes/profileRoutes"));


// MongoDB connection
const mongoURL = process.env.MONGO_URL;

async function startServer() {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully via Mongoose!");


    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("❌ MongoDB connection error:", err);
  }
}

startServer();

// Routes
app.get('/', (req, res) => {
  res.send('Hello, InternConnect Backend is Running!');
});

// ✅ ADD THIS LINE
app.use('/auth', authRoutes);

// ✅ Use Student Routes
app.use('/students', studentRoutes);
