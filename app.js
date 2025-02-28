const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to generate Google Maps link
const getGoogleMapsLink = (lat, lng) => {
    return `https://www.google.com/maps?q=${lat},${lng}`;
};

// In-memory storage using Map
const locationStorage = new Map();

// API to save location
app.post('/api/location', (req, res) => {
    try {
        const { userId, lat, lng } = req.body;
        
        const locationData = {
            userId,
            location: { lat, lng },
            googleMapsLink: getGoogleMapsLink(lat, lng),
            timestamp: new Date()
        };
        
        locationStorage.set(userId, locationData);
        res.status(201).json({ message: 'Location saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to query location by userId
app.get('/api/location/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        const location = locationStorage.get(userId);
        
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }
        
        res.json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});