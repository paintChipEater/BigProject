const mongoose = require('mongoose');


// conect to local host data base -> soon implement MongoDB atlas :)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Connected to database');
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB;