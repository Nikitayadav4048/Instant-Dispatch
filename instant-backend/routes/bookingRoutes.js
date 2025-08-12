const express = require('express');
const { createBooking, getAllBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/book', createBooking);
router.get('/bookings', getAllBookings);

module.exports = router;
