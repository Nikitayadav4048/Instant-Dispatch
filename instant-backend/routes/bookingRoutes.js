// const express = require('express');
// const router = express.Router();
// const { createBooking, getAllBookings } = require('../controllers/bookingController');

// router.post('/book', createBooking);
// router.get('/bookings', getAllBookings);

// module.exports = router;


const express = require('express');
const { createBooking, getAllBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/api/bookings', createBooking);
router.get('/api/bookings', getAllBookings);

module.exports = router;
