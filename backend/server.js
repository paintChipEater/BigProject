require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const connectDB = require('./config/connectDB')
const logger = require('./middleware/httpLogger')



// importing routes
const journalRoutes = require('./routes/journal')

//Connect to local DB from component connectDB
connectDB();

//Some middleware
app.use(logger);
app.use(express.json())


// connecting to routes
app.use('/api/journal', journalRoutes)


mongoose.connect(process.env.DATABASE_URI)

// when function is completed
    .then(() => {
        // listen to a port number
        // process.env.PORT is pulling the port from the .env file
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT)
        })
    })

// find error if URI is incorrect or username / password is incorrect
    .catch((error) => {
        console.log(error)
    })