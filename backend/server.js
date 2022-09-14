require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB')
const logger = require('./middleware/httpLogger')

//Connect to local DB
connectDB();

//Some middleware
app.use(logger);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});