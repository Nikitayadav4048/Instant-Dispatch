const mongoose = require('mongoose');
const generateId = require('../utils/generateId');

// Clear any existing model to avoid caching issues
if (mongoose.models.Booking) {
    delete mongoose.models.Booking;
}

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true , default: generateId },
    contact: { type: Number, required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    parcelDescription: { type: String, required: true },
    weight: { type: String, required: true },
    vehicle: { type: String, required: true, enum: ['scooter', 'motorcycle', 'miniTruck'] },
    price: { type: Number, required: true },
    status: {type: String , default: 'Pending'},
    paymentStatus: { type: String, default: 'cod', enum: ['cod', 'online', 'upi'] },
    customerUsername: { type: String },
    customerName: { type: String }
}, { strict: false, timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
