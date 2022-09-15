// how journal documents look

// allow creation of SCHEMAS
const mongoose = require('mongoose')

const Schema = mongoose.Schema


// Structure of the documents -> 
// new schema -> pass object inside params
// All are required -> enforces Schema 
const journalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    journalData: {
        type: String,
        required: true
    }
    // when a document is created -> it creates that property
}, { timestamps: true })

// model based on schema
// model applies that schema
// model interacts with the collection

// name, SCHEMA
// MAKE THE MODEL
module.exports = mongoose.model('Journal', journalSchema)

// builds database for us
// add a journal model
