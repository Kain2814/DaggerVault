const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 1. IMPORT ROUTE FILES
const userRoutes = require('./routes/userRoutes');
const adversaryRoutes = require('./routes/adversaryRoutes');
const savedRoutes = require('./routes/savedRoutes');       // For "Save to Vault"
const campaignRoutes = require('./routes/campaignRoutes'); // For "Campaigns"

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/dnd_monsters')
.then(() => console.log('✅ Connected to MongoDB via Compass!'))
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
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


