const jwt = require('jsonwebtoken');
const sql = require('mssql')
require('dotenv').config();
const jwt_secret_key = process.env.JWT_KEY;

// const AuthController = async (req, res, next) => {
//     const token = req.header('Authorization').replace('Bearer ', '');

//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, jwt_secret_key);
//         const user = await Users.findById(decoded.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         req.user = {username: user.username, email: user.email}; // Attach user to the request object
//         next();
//     } catch (ex) {
//         res.status(400).json({ message: 'Invalid token.' });
//     }
// };




const AuthController = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, jwt_secret_key);
        const result = await sql.query`SELECT * FROM Users WHERE ID = ${decoded.id}`;
        const user = result.recordset[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        req.user = { username: user.username, email: user.email, userType: user.userType }; // Attach user to the request object
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = AuthController;
