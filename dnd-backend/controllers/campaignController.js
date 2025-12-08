const Campaign = require('../models/Campaign');
const Note = require('../models/Note');
const SavedAdversary = require('../models/SavedAdversary'); // <--- CRITICAL IMPORT

// --- CAMPAIGN FUNCTIONS ---

// @desc    Create a new campaign
// @route   POST /api/campaigns
const createCampaign = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        let campaign = await Campaign.create({
            title,
            description,
            gm: req.user.id,
            players: [req.user.id]
        });

        // Populate immediately
        campaign = await campaign.populate('gm', 'name email');
        campaign = await campaign.populate('players', 'name email');

        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all campaigns for the current user
// @route   GET /api/campaigns
const getMyCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({
            players: req.user.id
        })
        .populate('gm', 'name')
        .populate('players', 'name')
        .sort({ createdAt: -1 });
        
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single campaign details
// @route   GET /api/campaigns/:id
const getCampaignById = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id)
            .populate('gm', 'name email')
            .populate('players', 'name email');

        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

        if (!campaign.players.some(p => p._id.toString() === req.user.id)) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(campaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update Campaign (Fear, Hope, etc)
// @route   PUT /api/campaigns/:id
const updateCampaign = async (req, res) => {
    try {
        const { currentFear, currentHope, description, title } = req.body;
        const campaign = await Campaign.findById(req.params.id);

        if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

        if (!campaign.players.includes(req.user.id)) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (currentFear !== undefined) campaign.currentFear = currentFear;
        if (currentHope !== undefined) campaign.currentHope = currentHope;
        if (description) campaign.description = description;
        if (title) campaign.title = title;

        await campaign.save();

        const populatedCampaign = await Campaign.findById(req.params.id)
            .populate('gm', 'name email')
            .populate('players', 'name email');

        res.json(populatedCampaign);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- NOTE FUNCTIONS ---

// @desc    Create a Note
// @route   POST /api/campaigns/:id/notes
const createNote = async (req, res) => {
    try {
        const { title, content, type, visibility, realDate } = req.body;
        
        const note = await Note.create({
            campaign: req.params.id,
            author: req.user.id,
            title,
            content,
            type,
            visibility,
            realDate: realDate || Date.now()
        });

        await note.populate('author', 'name');
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Notes
// @route   GET /api/campaigns/:id/notes
const getNotes = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        const isGM = campaign.gm.toString() === req.user.id;

        const notes = await Note.find({ campaign: req.params.id })
            .populate('author', 'name')
            .sort({ realDate: -1 });

        const visibleNotes = notes.filter(note => {
            if (note.visibility === 'Public') return true;
            if (note.author._id.toString() === req.user.id) return true;
            if (note.visibility === 'GM' && isGM) return true;
            return false;
        });

        res.json(visibleNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a Note
// @route   PUT /api/campaigns/notes/:noteId
const updateNote = async (req, res) => {
    try {
        const { title, content, visibility, realDate } = req.body;
        const note = await Note.findById(req.params.noteId);

        if (!note) return res.status(404).json({ message: 'Note not found' });

        const campaign = await Campaign.findById(note.campaign);
        if (note.author.toString() !== req.user.id && campaign.gm.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (visibility) note.visibility = visibility;
        if (realDate) note.realDate = realDate;

        await note.save();
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a Note
// @route   DELETE /api/campaigns/notes/:noteId
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteId);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        const campaign = await Campaign.findById(note.campaign);
        if (note.author.toString() !== req.user.id && campaign.gm.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await note.deleteOne();
        res.json({ message: 'Note removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- MONSTER FUNCTIONS (NEW) ---

// @desc    Save a Monster to a Campaign
// @route   POST /api/campaigns/:id/monsters
const saveCampaignMonster = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        
        if (campaign.gm.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Only the GM can add monsters.' });
        }

        const { index, name, tier, type, difficulty, hit_points, stress, thresholds, attack, damage } = req.body;

        const exists = await SavedAdversary.findOne({ campaign: req.params.id, index });
        if (exists) {
            return res.status(400).json({ message: 'Monster already in this campaign.' });
        }

        const savedMonster = await SavedAdversary.create({
            campaign: req.params.id,
            user: req.user.id,
            index, name, tier, type, difficulty, hit_points, stress, thresholds, attack, damage
        });

        res.status(201).json(savedMonster);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Monsters for a Campaign
// @route   GET /api/campaigns/:id/monsters
const getCampaignMonsters = async (req, res) => {
    try {
        const campaign = await Campaign.findById(req.params.id);
        if (!campaign.players.includes(req.user.id)) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const monsters = await SavedAdversary.find({ campaign: req.params.id });
        res.json(monsters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete Monster from Campaign
// @route   DELETE /api/campaigns/monsters/:monsterId
const deleteCampaignMonster = async (req, res) => {
    try {
        const monster = await SavedAdversary.findById(req.params.monsterId);
        if (!monster) return res.status(404).json({ message: 'Monster not found' });

        const campaign = await Campaign.findById(monster.campaign);
        if (campaign.gm.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Only the GM can remove monsters.' });
        }

        await monster.deleteOne();
        res.json({ message: 'Monster removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUserMonsters = async (req, res) => {
    try {
        // Find all saved adversaries owned by this user
        // Populate the 'campaign' field so we can show which campaign it belongs to
        const monsters = await SavedAdversary.find({ user: req.user.id })
            .populate('campaign', 'title')
            .sort({ savedAt: -1 });
            
        res.json(monsters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// EXPORT EVERYTHING
module.exports = {
    createCampaign,
    getMyCampaigns,
    getCampaignById,
    updateCampaign,
    createNote,
    getNotes,
    updateNote,
    deleteNote,
    saveCampaignMonster,
    getCampaignMonsters,
    deleteCampaignMonster,
    getAllUserMonsters
};