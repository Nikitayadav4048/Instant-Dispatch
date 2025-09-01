const mongoose = require('mongoose');

const connectDB = async () => {
    // Try multiple connection options
    const connectionStrings = [
        "mongodb+srv://nikitayadavktg2003:YdWB6tQCfp2jHwAk@cluster0.te2iyse.mongodb.net/?retryWrites=true&w=majority", // Original Atlas (no database name)
        "mongodb+srv://Nikita:instant@cluster0.kzwf8.mongodb.net/?retryWrites=true&w=majority", // Alternative Atlas
        "mongodb://localhost:27017/instant-dispatch" // Local MongoDB (fallback)
    ];

    for (let i = 0; i < connectionStrings.length; i++) {
        try {
            await mongoose.connect(connectionStrings[i], {
                serverSelectionTimeoutMS: 3000,
                connectTimeoutMS: 3000
            });
            console.log(`✅ MongoDB connected successfully (${i < 2 ? 'Atlas' : 'Local'})`);
            console.log(`🔗 Connected to: ${connectionStrings[i].split('@')[1]?.split('/')[0] || 'localhost'}`);
            return;
        } catch (err) {
            console.log(`❌ Connection ${i + 1} failed: ${err.message}`);
            if (i === connectionStrings.length - 1) {
                console.log('⚠️  All MongoDB connections failed. Using in-memory storage...');
                // Set up in-memory storage for development
                global.inMemoryDB = {
                    bookings: [],
                    notifications: [],
                    users: []
                };
                console.log('✅ In-memory database initialized');
            }
        }
    }
};

module.exports = connectDB;


//http://localhost:5000/api/bookings
//http://localhost:5000/api/book   -- post
  