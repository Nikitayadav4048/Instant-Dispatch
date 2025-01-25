

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // replaces bodyParser.json()
app.use(cors()); // enables CORS for all routes

// Connect to MongoDB
connectDB();
// console.log("MongoDb connected");


// Routes
app.use('/api', bookingRoutes);


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

