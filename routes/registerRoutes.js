const express = require('express');
const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken')
const jwt_secret_key = process.env.JWT_KEY


router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Users({
      username,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    const resp = await newUser.save();
    const token = jwt.sign({ id: resp._id }, jwt_secret_key, { expiresIn: '1d' });

    res.status(201).json({ message: 'User created successfully', token, data: { username: resp.username, email: resp.email } });


  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;