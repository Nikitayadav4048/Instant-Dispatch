const express = require('express');
const router = express.Router();

// Simple CSRF routes
router.get('/token', (req, res) => {
  res.json({ csrfToken: 'mock-csrf-token' });
});

module.exports = router;