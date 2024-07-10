const express = require('express');
const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthController = require('../controllers/AuthController');
const router = express.Router();
require('dotenv').config();
const jwt_secret_key = process.env.JWT_KEY


router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send('Incorrect password!!');
    }

    const token = jwt.sign({ id: user._id }, jwt_secret_key, { expiresIn: '1d' });

    res.status(200).json({ token, user: { email: user.email, username: user.username } });

  } catch (error) {
    res.status(500).json({ error })
  }
});

router.get('/auth', AuthController,async (req, res) => {

  res.status(200).json({ user: req.user });
}
)


module.exports = router;