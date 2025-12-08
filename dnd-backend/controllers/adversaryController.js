const Adversary = require('../models/Adversary');

// GET ALL (With Filtering)
const getAdversaries = async (req, res) => {
    try {
        const { tier, search } = req.query;
        let query = {};

        if (tier && tier !== 'All') {
            query.tier = tier; 
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        // --- THE FIX IS HERE ---
        // We chain .sort() directly to .find().
        // We DO NOT put 'await' inside the chain or split it into two lines.
        const adversaries = await Adversary.find(query).sort({ name: 1 });
        
        res.json({ 
            count: adversaries.length,
            results: adversaries 
        }); 

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get ONE by Index
const getAdversary = async (req, res) => {
    try {
        const adversary = await Adversary.findOne({ index: req.params.index });
        if (!adversary) return res.status(404).json({ message: "Adversary not found" });
        res.json(adversary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Save (for User Favorites)
const SavedAdversary = require('../models/SavedAdversary');

const saveAdversary = async (req, res) => {
    const { index, name, tier, type, difficulty, hit_points, stress, thresholds } = req.body;

    try {
        const exists = await SavedAdversary.findOne({ 
            index: index, 
            user: req.user.id 
        });

        if (exists) {
            return res.status(400).json({ message: 'You already saved this adversary.' });
        }

        const newSave = await SavedAdversary.create({
            user: req.user.id,
            index,
            name,
            tier,
            type,
            difficulty,
            hit_points,
            stress,
            thresholds
        });

        res.status(201).json(newSave);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAdversaries, getAdversary, saveAdversary };