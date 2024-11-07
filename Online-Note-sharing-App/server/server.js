const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user'); // Assuming you have user routes
const app = express();

dotenv.config();
connectDB();

app.use(express.json()); // For parsing application/json
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // Add protected routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
