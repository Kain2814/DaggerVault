const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This function runs BEFORE your controller
const protect = async (req, res, next) => {
    let token;

    // 1. Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header ("Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, 'my_super_secret_dnd_key'); // Must match your controller secret

            // Get user from the token & add to request object
            req.user = await User.findById(decoded.id).select('-password');

            next(); 
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };