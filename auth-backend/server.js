const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session');
require("dotenv").config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token']
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-csrf-token');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

const PORT = process.env.PORT || 4002;
const DB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/instant-dispatch";

const { safeLog } = require('./utils/logger');

// MongoDB connection with fallback
const connectDB = async () => {
  const connectionStrings = [
    "mongodb://localhost:27017/instant-dispatch",
    process.env.MONGODB_ATLAS_URI,
    DB_URI
  ].filter(Boolean);

  for (let i = 0; i < connectionStrings.length; i++) {
    try {
      await mongoose.connect(connectionStrings[i], {
        serverSelectionTimeoutMS: 3000,
        connectTimeoutMS: 3000
      });
      safeLog('log', `Auth MongoDB connected (${i === 0 ? 'Local' : 'Atlas'})`);
      return;
    } catch (err) {
      safeLog('log', `Auth connection ${i + 1} failed`, { error: err.message });
      if (i === connectionStrings.length - 1) {
        safeLog('log', 'Auth backend continuing without database...');
      }
    }
  }
};

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "API is running", time: new Date().toISOString() });
});

const userRoutes = require("./routes/userRoutes");
const csrfRoutes = require("./routes/csrfRoutes");
app.use("/api/users", userRoutes);
app.use("/api/auth", csrfRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
