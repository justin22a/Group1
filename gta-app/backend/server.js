const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = 3000;

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

// Define the Mongoose schema and model for theft data
const theftReportSchema = new mongoose.Schema({
  username: String,
  title: String,
  description: String,
  latitude: Number,
  longitude: Number,
  time: String,
  image: String, // Store image as a base64 string, could be optional
});

const TheftReport = mongoose.model('TheftReport', theftReportSchema);

// POST endpoint to save a new theft report
app.post('/submit', async (req, res) => {
  try {
    const newReport = new TheftReport(req.body); // Create a new document with the submitted data
    await newReport.save(); // Save to MongoDB
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Error saving data', error });
  }
});

// GET endpoint to retrieve all theft reports for displaying on the map
app.get('/theft-reports', async (req, res) => {
  try {
    const reports = await TheftReport.find(); // Retrieve all theft reports from MongoDB
    res.json(reports); // Send back the data as JSON
  } catch (error) {
    console.error('Error retrieving theft reports:', error);
    res.status(500).json({ message: 'Error retrieving theft reports', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
