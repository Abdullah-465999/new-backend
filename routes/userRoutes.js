const express = require('express');
const router = express.Router();
const sql = require('mssql');

// Create a new user
router.post('/users', async (req, res) => {
  const { username, email, password, userType } = req.body;
  try {
    // Check if the user already exists
    const result = await sql.query`SELECT * FROM Users WHERE username = ${username} OR email = ${email} `;
    const existingUser = result.recordset[0];

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await sql.query`INSERT INTO Users (username, email, password, userType) VALUES (${username}, ${email}, ${password}, ${userType})`;

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});



// Get all users

router.get('/users', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Users`;
    const users = result.recordset;
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});






// Update a user

router.put('/users/:id', async (req, res) => {
  const { username, email, password, userType } = req.body;
  const userId = req.params.id;

  try {
    // Construct update query and parameters
    const updates = [];
    const parameters = [];

    if (username) {
      updates.push("username = @username");
      parameters.push({ name: 'username', type: sql.VarChar, value: username });
    }
    if (email) {
      updates.push("email = @email");
      parameters.push({ name: 'email', type: sql.VarChar, value: email });
    }
    if (password) {
      // const hashedPassword = await bcrypt.hash(password, 10);
      updates.push("password = @password");
      parameters.push({ name: 'password', type: sql.VarChar, value: password });
    }
    if (userType) {
      updates.push("userType = @userType");
      parameters.push({ name: 'userType', type: sql.VarChar, value: userType });
    }
    if (updates.length === 0) {
      return res.status(400).json({ message: 'No updates provided' });
    }

    const updateQuery = `UPDATE Users SET ${updates.join(', ')} WHERE ID = @userId`;
    parameters.push({ name: 'userId', type: sql.Int, value: userId });

    // Execute the query with parameters
    const request = new sql.Request();
    parameters.forEach(param => request.input(param.name, param.type, param.value));

    const result = await request.query(updateQuery);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updatedUserResult = await sql.query`SELECT * FROM Users WHERE ID = ${userId}`;
    const updatedUser = updatedUserResult.recordset[0];

    res.status(200).json({ user: updatedUser, message: 'Updated Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a user

router.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await sql.query`DELETE FROM Users WHERE ID = ${userId}`;
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/user/admin', async (req, res) => {
  const { status, user } = req.body;
  try {
    const userFound = await sql.query`select password from Users where username = ${user.username}`;
    if (!userFound.recordset[0]) {
      return res.status(200).json({ message: 'User not found' });
    }
    
    const password = userFound.recordset[0].password;
      if (password !== status) {
          return res.status(200).json({ message: 'Invalid password' });
      }

      res.status(200).json({ message: 'User is Admin' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
})

module.exports = router;
