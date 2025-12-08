const mongoose = require('mongoose');
const Adversary = require('./models/Adversary');
const adversaries = require('./data/daggerheartData');

// Connect to your existing local DB
mongoose.connect('mongodb://127.0.0.1:27017/dnd_monsters')
    .then(() => console.log('✅ Connected to DB for Seeding'))
    .catch(err => console.log(err));

const seedDB = async () => {
    try {
        // 1. Clear existing Adversaries (start fresh)
        await Adversary.deleteMany({});
        console.log('🗑️  Old adversaries cleared.');

        // 2. Insert new data
        await Adversary.insertMany(adversaries);
        console.log(`🌱 ${adversaries.length} Daggerheart Adversaries seeded successfully!`);
        
    } catch (error) {
        console.error('❌ Error seeding:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();