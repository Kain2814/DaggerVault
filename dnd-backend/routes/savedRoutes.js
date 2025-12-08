const express = require('express');
const router = express.Router();
const { getSavedMonsters, saveMonster, deleteMonster } = require('../controllers/savedController');
const { protect } = require('../middleware/authMiddleware');

// All routes here are protected
router.get('/', protect, getSavedMonsters);
router.post('/', protect, saveMonster);
router.delete('/', protect, deleteMonster);

module.exports = router;