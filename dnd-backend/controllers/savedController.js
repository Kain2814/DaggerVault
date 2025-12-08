const SavedAdversary = require('../models/SavedAdversary'); // 

// @desc    Get user's saved monsters
// @route   GET /api/monsters
const getSavedMonsters = async (req, res) => {
    try {
        const monsters = await SavedAdversary.find({ user: req.user.id });
        res.status(200).json(monsters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Save a monster to vault
// @route   POST /api/monsters
const saveMonster = async (req, res) => {
    const { index, name, tier, type, difficulty, hit_points, stress, thresholds, flavor_text } = req.body;

    try {
        // Check duplicates
        const exists = await SavedAdversary.findOne({ user: req.user.id, index });
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
            thresholds,
            flavor_text
        });

        res.status(201).json(newSave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete saved monsters
// @route   DELETE /api/monsters
const deleteMonster = async (req, res) => {
    try {
        const { ids } = req.body; 
        if (!ids) return res.status(400).json({ message: "No IDs provided" });

        await SavedAdversary.deleteMany({
            _id: { $in: ids },
            user: req.user.id 
        });

        res.status(200).json({ message: 'Monsters removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSavedMonsters, saveMonster, deleteMonster };