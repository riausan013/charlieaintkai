const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory store for documents
const documents = {};

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Save document endpoint
app.post('/save', (req, res) => {
    const { text } = req.body;
    if (typeof text !== 'string') {
        return res.status(400).json({ error: 'Text must be a string' });
    }
    const id = uuidv4(); // Generate a unique ID for the document
    documents[id] = text; // Save text to in-memory store
    res.json({ id }); // Respond with the unique ID
});

// Retrieve document endpoint
app.get('/doc/:id', (req, res) => {
    const { id } = req.params;
    const text = documents[id]; // Retrieve text by ID
    if (text) {
        res.json({ text }); // Respond with the document text
    } else {
        res.status(404).json({ error: 'Document not found' }); // Handle document not found
    }
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
