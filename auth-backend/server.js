const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request body

// MongoDB Connection
const PORT = 5000;
const DB_URI = "mongodb+srv://anushkatada08:mongo-auth@cluster-0.ru8ir.mongodb.net/?retryWrites=true"

mongoose.connect(DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Import user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
