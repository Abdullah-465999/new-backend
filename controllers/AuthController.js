const jwt = require('jsonwebtoken');
require('dotenv').config();
const Users = require('../models/User');
const jwt_secret_key = process.env.JWT_KEY;

const AuthController = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, jwt_secret_key);
        const user = await Users.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = {username: user.username, email: user.email}; // Attach user to the request object
        next();
    } catch (ex) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = AuthController;
