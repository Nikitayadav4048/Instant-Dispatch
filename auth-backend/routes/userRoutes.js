// const express = require('express');
// const User = require('../models/User'); // Import User model
// const router = express.Router();

// // POST: Register a new user
// router.post('/signup', async (req, res) => {
//   const { username, email, password, role } = req.body;

//   // Validate input
//   if (!username || !email || !password || !role) {
//     return res.status(400).json({ message: 'Please fill all fields' });
//   }

//   // Check if role is valid
//   if (!['customer', 'rider'].includes(role)) {
//     return res.status(400).json({ message: 'Invalid role' });
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Create a new user
//     const newUser = new User({ username, email, password, role });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // GET: Get user by email
// router.get('/:email', async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// POST: Register
router.post('/signup', async (req, res) => {
  console.log('Signup request received:', req.body);
  const { username, email, password, role } = req.body;

  // Basic validation
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  if (!['customer', 'rider'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    // Create mock user for testing
    const mockUser = {
      _id: Date.now().toString(),
      username,
      email: email.toLowerCase().trim(),
      role
    };

    const token = jwt.sign(
      { userId: mockUser._id, email: mockUser.email, role: mockUser.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Mock signup successful for:', email);
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: mockUser
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST: Login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  // Mock login for testing
  const mockUser = {
    _id: Date.now().toString(),
    username: 'Test User',
    email: email.toLowerCase().trim(),
    role: role || 'customer'
  };

  const token = jwt.sign(
    { userId: mockUser._id, email: mockUser.email, role: mockUser.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: mockUser
  });
});

// GET: Retrieve user by email (protected route)
router.get('/:email', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      username: user.username,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

