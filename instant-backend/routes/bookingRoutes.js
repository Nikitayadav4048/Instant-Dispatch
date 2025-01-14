const express = require('express');
const router = express.Router();
const { createBooking, getAllBookings } = require('../controllers/bookingController');

router.post('/book', createBooking);
router.get('/bookings', getAllBookings);

module.exports = router;
