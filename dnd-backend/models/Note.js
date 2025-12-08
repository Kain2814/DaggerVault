// this is the "Campaign Vault" content. It links to a Campgain and a GM

const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Session', 'Lore', 'NPC', 'Location', 'Quest'],
        default: 'Session'
    },
    visibility: {
        type: String,
        enum: ['Public', 'GM', 'Private'], 
        default: 'Public' // Public = Everyone in campaign, GM = GM Only, Private = Author Only
    },
    realDate: {
        type: Date,
        default: Date.now // This powers your Calendar view
    },
    inGameDate: {
        type: String // e.g. "3rd of Winter"
    }
});

module.exports = mongoose.model('Note', noteSchema);