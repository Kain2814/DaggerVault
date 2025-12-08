const express = require('express');
const router = express.Router();
const { getAdversaries, getAdversary, saveAdversary } = require('../controllers/adversaryController');
const { protect } = require('../middleware/authMiddleware'); // Import Auth Middleware

// Public Routes (Anyone can browse)
router.get('/', getAdversaries);
router.get('/:index', getAdversary);

// Protected Route (Only logged in users can save)
router.post('/', protect, saveAdversary);

module.exports = router;