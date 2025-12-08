const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 

    // Campaign Basics
    createCampaign, 
    getMyCampaigns, 
    getCampaignById, 
    updateCampaign, 
    
    // Notes
    createNote, 
    getNotes, 
    updateNote, 
    deleteNote,

    // Monsters
    getAllUserMonsters, 
    saveCampaignMonster,
    getCampaignMonsters,
    deleteCampaignMonster
} = require('../controllers/campaignController');

// All routes are protected
router.use(protect);

// --- CAMPAIGN ROUTES ---
router.post('/', createCampaign);
router.get('/', getMyCampaigns);
router.get('/:id', getCampaignById);
router.put('/:id', updateCampaign); 

// --- NOTE ROUTES ---
router.post('/:id/notes', createNote);
router.get('/:id/notes', getNotes);
router.put('/notes/:noteId', updateNote);
router.delete('/notes/:noteId', deleteNote);

// --- MONSTER ROUTES (Campaign Specific) ---
router.post('/:id/monsters', saveCampaignMonster);
router.get('/:id/monsters', getCampaignMonsters);
router.delete('/monsters/:monsterId', deleteCampaignMonster);
router.get('/all-monsters', getAllUserMonsters);

module.exports = router;