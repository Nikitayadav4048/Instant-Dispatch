const Booking = require('../models/Booking.js');

// Create a booking
exports.createBooking = async (req, res) => {
    const { name, contact, pickupAddress, deliveryAddress, parcelDescription, weight, pickupTime, deliveryTime, vehicle, price } = req.body;
    const newBooking = new Booking({
        name,
        contact,
        pickupAddress,
        deliveryAddress,
        parcelDescription,
        weight,
        pickupTime,
        deliveryTime,
        vehicle,
        price
    });
    try {
        const savedBooking = await newBooking.save();
        res.status(200).json(savedBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
