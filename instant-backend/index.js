// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// const bookingRoutes = require('./routes/bookingRoutes');

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use('/api', bookingRoutes);

// // Health check
// app.get('/', (req, res) => {
//   res.send('🚀 Server is up and running!');
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const connectDB = require('./config/db');
const bookingRoutes = require('./routes/bookingRoutes');
const careerRoutes = require('./routes/career');
const orderRoutes = require('./routes/orderRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const socketManager = require('./socketServer');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Server is up and running!');
});

// Initialize Socket.IO
socketManager.init(server);

// Start server
server.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`🔌 Socket.IO server ready for real-time connections`);
});