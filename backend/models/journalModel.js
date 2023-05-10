/**
 * Structure representing the journal entry that we want to format to
 */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const journalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    journal: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Journal', journalSchema)