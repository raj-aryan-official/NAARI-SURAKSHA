// filepath: /C:/Users/rajar/OneDrive/Desktop/new project/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema and model for storing details
const detailSchema = new mongoose.Schema({
    email: String,
    detail: String
});

const Detail = mongoose.model('Detail', detailSchema);

// Endpoint to save details
app.post('/saveDetail', (req, res) => {
    const newDetail = new Detail({
        email: req.body.email,
        detail: req.body.detail
    });

    newDetail.save((err) => {
        if (err) {
            res.status(500).send('Error saving detail');
        } else {
            res.status(200).send('Detail saved successfully');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});