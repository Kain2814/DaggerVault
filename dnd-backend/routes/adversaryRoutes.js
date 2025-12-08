const express = require('express');
const router = express.Router();
const { getAdversaries, getAdversary } = require('../controllers/adversaryController');

// Public Routes (Anyone can browse)
router.get('/', getAdversaries);
router.get('/:index', getAdversary);

module.exports = router;