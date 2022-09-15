
const Journal = require('../models/journalModel')
const mongoose = require('mongoose')

// get all journals
const getJournals = async (req, res) => {
    // leave object blank because we want a differnet # of journals
    // newest on top
    const journals = await Journal.find({}).sort({createdAt: -1})

    res.status(200).json(journals)
} 



// get a single journal
const getJournal = async (req, res) => {
    // grab id property from ROUTE parameter
    const {id} = req.params

    // checks if the ID is valid, if not, return status
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such journal'})
    }

    // use Journal model from JOURNALMODAL
    const journal = await journal.findById(id)

    // if journal doesn't exist, return an error
    if (!journal) {
        // if it doesn't return, it will fire the other code
        return res.status(404).json({error: 'No such journal'})
    }
    // there is a journal
    res.status(200).json(journal)
} 

// create a new journal
const createJournal = async (req, res) => {
    // extract these objects
    const {title, journalData} = req.body

    // which fields are empty and send it to client
    let emptyFields = []


    if(!title) {
        emptyFields.push('title')
    }
    if(!journalData) {
        emptyFields.push('journalData')
    }
    // checking length of array -> send error rather than executing it
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // gets new document when created
    // USING A journal MODEL TO CREATE A NEW DOCUMENT
    // ADD DOC TO DB
    try {
        // all properties are required
        const journal = await Journal.create({title, journalData})

        // send a response
        res.status(200).json(journal)
    } catch (error) {
        res.status(400).json({error: error.message})
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