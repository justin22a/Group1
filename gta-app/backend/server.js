// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize the Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdata', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define the schema and model
const userDataSchema = new mongoose.Schema({
    username: String,
    title: String,
    description: String,
    latitude: Number, // Store as number
    longitude: Number, // Store as number
    time: String,
    image: String, // Store as base64 string or URL
  });

const UserData = mongoose.model('UserData', userDataSchema);

app.post('/submit', async (req, res) => {
  try {
    const newData = new UserData(req.body);
    await newData.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving data', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
