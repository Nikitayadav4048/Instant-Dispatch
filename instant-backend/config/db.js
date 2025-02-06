const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Nikita:instant@cluster0.kzwf8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" );
        console.log('MongoDB connected'); 
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;


//http://localhost:5000/api/bookings
//http://localhost:5000/api/book   -- post
  