
const Journal = require('../models/journalModel')
const mongoose = require('mongoose')

// get all journals
const getJournals = async (req, res) => {
    // Sorts by getting all journals and sort by journal's creation date 
    const journals = await Journal.find({}).sort({createdAt: -1})

    res.status(200).json(journals)
} 

// get a single journal
const getJournal = async (req, res) => {
    // grab id property from the route's parameter
    const {id} = req.params

    // checks if the ID is valid, if not, return status
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such journal'})
    }
    const journal = await journal.findById(id)

    // if journal doesn't exist, return an error
    if (!journal) {
        // if it doesn't return, it will fire the other code
        return res.status(404).json({error: 'No such journal'})
    }
    // send the journal to the client to view
    res.status(200).json(journal)
} 

// create a new journal
const createJournal = async (req, res) => {
    // extract these objects
    const {title, journal} = req.body
    console.log(req.body)
    // which fields are empty and send it to client
    let emptyFields = []


    if(!title) {
        emptyFields.push('title')
    }
    if(!journal) {
        emptyFields.push('journal')
    }
    // Checking if the fields are empty, and if they are, send error message to client
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    const document = new Journal({
        title: title,
        journal: journal
    })
    try {
        // all properties are required
        const journal = await document.save();

        // send a response
        return res.status(200).json(journal)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
} 

// delete a journal
const deleteJournal = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such journal'})
    }

    // property name is _id 
    // find if _id equal to id
    const journal = await Journal.findOneAndDelete({_id: id})


    if (!journal) {
        return res.status(404).json({error: 'No such journal'})
    }

    res.status(200).json(journal)
}

const updateJournal = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Journal'})
    }

    // the second is the data we update
    const journal = await Journal.findOneAndUpdate({_id: id}, {
        // the request body is spread into a new object
        // whatever property is on the body, update those on the DOC
        ...req.body
    })


    if (!journal) {
        return res.status(404).json({error: 'No such Journal'})
    }

    res.status(200).json(journal)
}



// EXPORT FUNCTIONS

module.exports = {
    getJournals,
    getJournal,
    createJournal,
    deleteJournal,
    updateJournal,
}