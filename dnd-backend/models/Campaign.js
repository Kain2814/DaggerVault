const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    gm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }],
    // Daggerheart Specific Trackers
    currentFear: {
        type: Number,
        default: 0
    },
    currentHope: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Hiatus', 'Cancelled', 'Delayed'],
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Campaign', campaignSchema);
