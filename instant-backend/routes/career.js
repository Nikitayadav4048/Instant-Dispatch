const express = require('express');
const router = express.Router();

// Simple career routes
router.get('/', (req, res) => {
  res.json({ message: 'Career API endpoint' });
});

router.post('/apply', (req, res) => {
  console.log('Career application received:', req.body);
  res.json({ message: 'Application submitted successfully' });
});

module.exports = router;