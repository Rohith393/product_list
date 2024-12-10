import express from 'express';
import bcrypt from 'bcryptjs';
import usermodel from './usermodel.js';
const router = express.Router();
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    const existingUser = await usermodel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already in use' });
    }
    const newUser = new usermodel({ username, password });
    console.log(newUser)
    await newUser.save();
    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Username is already taken' });
    }
    console.error("Server error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await usermodel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', success: true });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
