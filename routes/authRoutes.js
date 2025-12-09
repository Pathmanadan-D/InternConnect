// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

// Helper: remove password from user object before sending
function sanitizeUser(user) {
  const u = user.toObject ? user.toObject() : user;
  delete u.password;
  return u;
}

/**
 * POST /auth/register
 * body: { name, email, password, role? }
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email and password are required' });
    }

    // Prevent duplicate email
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    // Hash password
    const saltRounds = 10;
    const hashed = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: role === 'admin' ? 'admin' : 'student'
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    res.status(201).json({ message: 'Registered', token, user: sanitizeUser(user) });
  } catch (err) {
    console.error('Register error', err);
    res.status(500).json({ error: 'Server error registering user' });
  }
});

/**
 * POST /auth/login
 * body: { email, password }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    res.json({ message: 'Logged in', token, user: sanitizeUser(user) });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ error: 'Server error logging in' });
  }
});

module.exports = router;
