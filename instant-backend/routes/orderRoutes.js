const express = require('express');
const router = express.Router();

// Simple order routes
router.get('/', (req, res) => {
  res.json({ message: 'Orders API endpoint', orders: [] });
});

router.get('/:email', (req, res) => {
  const { email } = req.params;
  console.log(`Getting orders for email: ${email}`);
  res.json([]);
});

module.exports = router;