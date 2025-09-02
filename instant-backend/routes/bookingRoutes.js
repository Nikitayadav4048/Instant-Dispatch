const express = require('express');
const { createBooking, getAllBookings, getRiderBookings, getBookingById, updateBooking, getBookingsByVehicle } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/rider/:email', getRiderBookings);
router.get('/vehicle/:email', getBookingsByVehicle);
router.get('/:id', getBookingById);
router.put('/:id', updateBooking);

module.exports = router;
