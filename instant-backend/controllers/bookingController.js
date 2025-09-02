const Booking = require('../models/Booking.js');
const generateId = require('../utils/generateId');
const User = require('../../auth-backend/models/User');
const inMemoryDB = require('../utils/inMemoryDB');
const mongoose = require('mongoose');
const socketManager = require('../socketServer');
// Create a booking
exports.createBooking = async (req, res) => {
    console.log('Incoming booking data:', !!req.body);

    const {
        name,
        contact,
        pickupAddress,
        deliveryAddress,
        parcelDescription,
        weight,
        vehicle,
        price,
        paymentStatus,
        customerUsername
    } = req.body;

    const bookingData = {
        name: generateId(), // Generates booking code internally
        contact,
        pickupAddress,
        deliveryAddress,
        parcelDescription,
        weight,
        vehicle,
        price,
        paymentStatus: paymentStatus || 'cod',
        customerUsername,
        customerName: name,
        status: "Pending"
    };

    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState === 1) {
            const newBooking = new Booking(bookingData);
            const savedBooking = await newBooking.save();
            console.log('Booking saved to MongoDB');
            
            // Emit socket event to notify riders and customer
            if (socketManager.io) {
                // Notify all riders
                socketManager.riders.forEach((riderSocket) => {
                    riderSocket.emit('newOrder', savedBooking);
                });
                
                // Notify customer
                const customerSocket = socketManager.customers.get(customerUsername);
                if (customerSocket) {
                    customerSocket.emit('newOrder', savedBooking);
                }
                
                safeLog('log', 'Socket events emitted to riders and customer');
            }
            
            res.status(200).json(savedBooking);
        } else {
            // Use in-memory database
            const savedBooking = inMemoryDB.createBooking(bookingData);
            console.log('Booking saved to in-memory DB');
            
            // Emit socket event to notify riders and customer
            if (socketManager.io) {
                // Notify all riders
                socketManager.riders.forEach((riderSocket) => {
                    riderSocket.emit('newOrder', savedBooking);
                });
                
                // Notify customer
                const customerSocket = socketManager.customers.get(customerUsername);
                if (customerSocket) {
                    customerSocket.emit('newOrder', savedBooking);
                }
                
                safeLog('log', 'Socket events emitted to riders and customer');
            }
            
            res.status(200).json(savedBooking);
        }
    } catch (err) {
        console.error('Booking creation failed:', err.message);
        // Fallback to in-memory database
        try {
            const savedBooking = inMemoryDB.createBooking(bookingData);
            console.log('Fallback: Booking saved to in-memory DB');
            res.status(200).json(savedBooking);
        } catch (fallbackErr) {
            res.status(400).json({ message: fallbackErr.message });
        }
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    console.log('Fetching all bookings...');
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState === 1) {
            const bookings = await Booking.find();
            console.log('Found bookings from MongoDB:', bookings.length);
            res.status(200).json(bookings);
        } else {
            // Use in-memory database
            const bookings = inMemoryDB.getAllBookings();
            console.log('Found bookings from in-memory DB:', bookings.length);
            res.status(200).json(bookings);
        }
    } catch (err) {
        console.error('Failed to fetch bookings:', err.message);
        // Fallback to in-memory database
        const bookings = inMemoryDB.getAllBookings();
        console.log('Fallback: Found bookings from in-memory DB:', bookings.length);
        res.status(200).json(bookings);
    }
};

// Get rider-specific bookings
exports.getRiderBookings = async (req, res) => {
    try {
        const { email } = req.params;
        const bookings = await Booking.find({ riderEmail: email });
        res.status(200).json(bookings);
    } catch (err) {
        console.error('Failed to fetch rider bookings:', err.message);
        res.status(400).json({ message: err.message });
    }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (err) {
        console.error('Failed to fetch booking:', err.message);
        res.status(400).json({ message: err.message });
    }
};

// Get bookings by rider vehicle type
exports.getBookingsByVehicle = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (!user || !user.vehicle) {
            return res.status(404).json({ message: 'Rider vehicle not found' });
        }
        const bookings = await Booking.find({ vehicle: user.vehicle });
        res.status(200).json(bookings);
    } catch (err) {
        console.error('Failed to fetch vehicle bookings:', err.message);
        res.status(400).json({ message: err.message });
    }
};

// Update booking status
exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, paymentStatus, riderEmail, riderName } = req.body;
        
        const updateData = { status };
        if (paymentStatus) {
            updateData.paymentStatus = paymentStatus;
        }
        if (riderEmail) {
            updateData.riderEmail = riderEmail;
        }
        if (riderName) {
            updateData.riderName = riderName;
        }
        
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
        
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        
        // Emit real-time notification to customer
        if (socketManager.io && updatedBooking.customerUsername) {
            if (status === 'Out for Delivery') {
                socketManager.io.emit('orderStatusUpdate', {
                    orderId: updatedBooking.name,
                    status: status,
                    riderName: riderName,
                    riderEmail: riderEmail,
                    customerEmail: updatedBooking.customerUsername,
                    timestamp: new Date().toISOString()
                });
            } else if (status === 'Delivered') {
                socketManager.io.emit('orderCompleted', {
                    orderId: updatedBooking.name,
                    customerEmail: updatedBooking.customerUsername,
                    timestamp: new Date().toISOString()
                });
            }
            console.log('Notification sent for booking update:', id, status);
        }
        
        res.status(200).json(updatedBooking);
    } catch (err) {
        console.error('Failed to update booking:', err.message);
        res.status(400).json({ message: err.message });
    }
};
