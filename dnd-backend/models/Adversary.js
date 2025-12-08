const mongoose = require('mongoose');

const adversarySchema = new mongoose.Schema({
    index: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tier: { type: String, required: true }, // e.g., "Tier 1"
    type: { type: String, required: true }, // e.g., "Solo", "Minion"
    flavor_text: { type: String },
    difficulty: { type: Number, required: true },
    hit_points: { type: Number, required: true },
    stress: { type: Number, default: 0 },
    thresholds: { type: String, required: true }, // e.g. "5/10/15"
    attack: { type: String },
    damage: { type: String }
});

module.exports = mongoose.model('Adversary', adversarySchema);