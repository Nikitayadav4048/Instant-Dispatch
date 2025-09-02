const express = require('express');
const router = express.Router();

// Simple notification routes
router.get('/', (req, res) => {
  res.json({ message: 'Notifications API endpoint', notifications: [] });
});

router.get('/:email', (req, res) => {
  const { email } = req.params;
  console.log(`Getting notifications for email: ${email}`);
  res.json([]);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  console.log(`Deleting notification: ${id}`);
  res.json({ message: 'Notification deleted' });
});

module.exports = router;