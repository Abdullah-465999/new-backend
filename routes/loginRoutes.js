const express = require('express');
const sql = require('mssql');
const jwt = require('jsonwebtoken');
const AuthController = require('../controllers/AuthController');
const router = express.Router();
require('dotenv').config();
const jwt_secret_key = process.env.JWT_KEY


router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await sql.query`SELECT * FROM Users WHERE email = ${email}`;
    const user = result.recordset[0];
    if (!user) {
      return res.status(400).send('User not found');
    }

    

    if (password !== user.password) {
      return res.status(400).send('Incorrect password!!');
    }

    const token = jwt.sign({ id: user.ID }, jwt_secret_key, { expiresIn: '1d' });

    res.status(200).json({ token, user: { email: user.email, username: user.username, userType: user.userType } });

  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/auth', AuthController, async (req, res) => {
  res.status(200).json({ user: req.user });
});









module.exports = router;