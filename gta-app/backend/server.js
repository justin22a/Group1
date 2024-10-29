// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow frontend to connect
app.use(bodyParser.json()); // Parse JSON request bodies

// MongoDB Atlas Connection String
const uri = 'mongodb+srv://hernandezc2:4JsKEnvMcPjwP6Yi@clustero.kpvtm.mongodb.net/userdata?retryWrites=true&w=majority&appName=Cluster';

// Connect to MongoDB Atlas
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the Mongoose schema and model
const userDataSchema = new mongoose.Schema({
  username: String,
  title: String,
  description: String,
  latitude: Number,
  longitude: Number,
  time: String,
  image: String, // Store image as a base64 string
});

const UserData = mongoose.model('UserData', userDataSchema);

// POST endpoint to save form data
app.post('/submit', async (req, res) => {
  try {
    const newData = new UserData(req.body); // Create a new document
    await newData.save(); // Save to MongoDB
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
