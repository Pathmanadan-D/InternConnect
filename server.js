const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes'); // ✅ import routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// MongoDB connection
const mongoURL = "mongodb+srv://internconnect_user:Internmongo21@internconnectcluster.gpuq8ax.mongodb.net/internconnectDB?retryWrites=true&w=majority";

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

// ✅ Use Student Routes
app.use('/students', studentRoutes);
