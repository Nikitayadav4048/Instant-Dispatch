const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://anushkatada08:mongo@cluster0.kzwf8.mongodb.net/?retryWrites=true&w=majority");
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;


//http://localhost:5000/api/bookings
//http://localhost:5000/api/book   -- post
  