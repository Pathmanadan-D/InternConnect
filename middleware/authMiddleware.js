// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this';

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    // Attach user basic info to req.user (you can fetch more if needed)
    req.user = { id: payload.id, role: payload.role };

    // Optional: fetch full user from DB
    // req.userDoc = await User.findById(payload.id).select('-password');

    next();
  } catch (err) {
    console.error('JWT verify error', err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

/**
 * requireRole('admin') - middleware factory
 */
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden: insufficient role' });
    next();
  };
}

module.exports = { authenticateToken, requireRole };
