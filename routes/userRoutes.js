const express = require('express');
const router = express.Router();
const Users = require('../models/User')
const bcrypt = require('bcryptjs');

// Create a new user
router.post('/users', async (req, res) => {
  console.log("im running!!");
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
    console.log(existingUser);
    if (existingUser) {
      return res.status(404).json({ message: 'User already exists' });
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
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  console.log('arhi hai req');
  try {
    const users = await Users.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send(error);
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Users.findByIdAndUpdate(
      req.params.id,
      { username, email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: user, message: 'Updated Successfully' });
  } catch (error) {
    res.status(404).send(error);
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await Users

      .findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user: user, message: 'Deleted Successfully' });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
