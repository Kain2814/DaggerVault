const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 1. IMPORT ROUTE FILES
const userRoutes = require('./routes/userRoutes');
const adversaryRoutes = require('./routes/adversaryRoutes');
const campaignRoutes = require('./routes/campaignRoutes'); 

// (Deleted 'savedRoutes' import because we don't use it anymore)

const app = express();

// Use the port defined in the environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Database Connection
// Uses environment variable for Cloud MongoDB or defaults to local
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dnd_monsters';

mongoose.connect(MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB!'))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 2. USE ROUTES
app.use('/api/users', userRoutes);
app.use('/api/reference', adversaryRoutes);
app.use('/api/campaigns', campaignRoutes); 

// Base Route
app.get('/', (req, res) => {
    res.send('Daggerheart Backend Server is Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});