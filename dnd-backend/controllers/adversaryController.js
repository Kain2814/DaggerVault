const Adversary = require('../models/Adversary');

// @desc    Get all reference adversaries (with optional search/filter)
// @route   GET /api/reference
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

        const adversaries = await Adversary.find(query).sort({ name: 1 });
        
        res.json({ 
            count: adversaries.length,
            results: adversaries 
        }); 

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single adversary by Index
// @route   GET /api/reference/:index
const getAdversary = async (req, res) => {
    try {
        const adversary = await Adversary.findOne({ index: req.params.index });
        if (!adversary) return res.status(404).json({ message: "Adversary not found" });
        res.json(adversary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAdversaries,
    getAdversary
};