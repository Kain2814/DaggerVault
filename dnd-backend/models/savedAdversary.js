const mongoose = require('mongoose');

const savedAdversarySchema = new mongoose.Schema({
    // 1. Link to the Campaign
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Campaign'
    },
    // 2. Link to the User (The GM who saved it)
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // 3. Monster Data
    index: { type: String, required: true },
    name: { type: String, required: true },
    tier: String,
    type: String,
    difficulty: Number,
    hit_points: Number,
    stress: Number,
    thresholds: String,
    attack: String,
    damage: String,
    
    savedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SavedAdversary', savedAdversarySchema);