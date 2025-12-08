const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // <--- THIS WAS MISSING

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', protect, updateUserProfile); // Now 'protect' is defined!

module.exports = router;