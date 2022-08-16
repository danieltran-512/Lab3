const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

require('dotenv').config();

const path = require('path');

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);

if(process.env.NODE_ENV === 'production') {
    console.log("if statement reached");

    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
} else {

    console.log(process.env.NODE_ENV)
    app.get('/', (req, res) => {
        res.send("Api running");
    });
}

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));