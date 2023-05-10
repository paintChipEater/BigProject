require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4020;
const connectDB = require("./config/connectDB");
const logger = require("./middleware/httpLogger");
const bodyParser = require("body-parser");
const cors = require("cors");
// importing routes
const journalRoutes = require("./routes/journal");

//Connect to local DB from component connectDB
connectDB();

//Some middleware
app.use(logger);
app.use(express.json()); // Allow any json data
app.use(bodyParser.json()); // Parse our data into json instead in our frontend 
app.use(cors()) // Allow cross-origin requests, meaning allowing the data transfer across the server to client side

// connecting to routes
app.use("/journal", journalRoutes);

app.listen(PORT, () => {
	console.log("listening on port", PORT);
});
