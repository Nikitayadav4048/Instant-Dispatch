const express = require('express');
const { createBooking, getAllBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/bookings', createBooking);
router.get('/bookings', getAllBookings);

module.exports = router;
