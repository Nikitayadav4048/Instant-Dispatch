// const mongoose = require('mongoose');

// const BookingSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     contact: { type: Number, required: true },
//     pickupAddress: { type: String, required: true },
//     deliveryAddress: { type: String, required: true },
//     parcelDescription: { type: String, required: true },
//     weight: { type: String, required: true },
//     pickupTime: { type: Date, required: true },
//     deliveryTime: { type: Date, required: true },
//     vehicle: { type: String, required: true, enum: ['scooter', 'bike', 'miniTruck'] },
//     price: { type: Number, required: true },
//     status: { type: String, default: 'Pending' }
// });

// module.exports = mongoose.model('Booking', BookingSchema);

const mongoose = require('mongoose');
const generateId = require('../utils/generateId');

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true , default: generateId },
    contact: { type: Number, required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    parcelDescription: { type: String, required: true },
    weight: { type: String, required: true },
    pickupTime: { type: Date, required: true },
    deliveryTime: { type: Date, required: true },
    vehicle: { type: String, required: true, enum: ['scooter', 'bike', 'miniTruck'] },
    price: { type: Number, required: true },
    status: {type: String , default: 'Pending'}
});

module.exports = mongoose.model('Booking', BookingSchema);
