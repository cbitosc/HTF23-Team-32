// Import necessary modules and setup your Express app
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // for password hashing
const app = express();
const port = 3000; // Set your desired port

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the cors middleware to enable CORS for all routes
app.use(cors());
app.use(express.static('public'));

// Create a user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    
    // Validate input data (add more validation as needed)
    if (!name || !email || !password || !address) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword, address });
    await user.save();

    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data (add more validation as needed)
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Login successful
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ... (Other routes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
