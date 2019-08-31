const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
// Import Routes
const authRoute = require('./routes/auth');
const dataRoute = require('./routes/data');

// Connect to DB
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, autoIndex: false },
	() => console.log('Connected to DB')
);

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/data', dataRoute);

// Server up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
