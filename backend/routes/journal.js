// express router
const express = require('express')

// reference functions from exported functions from JournalController
const {
    createJournal,
    getJournals,
    getJournal,
    deleteJournal,
    updateJournal
} = require('../controllers/journalController')



// instance of a router
const router = express.Router()

// GET all Journals
router.get('/', getJournals)

// GET a single Journal
// route parameter is the ID
router.get('/:id', getJournal)

// POST a new Journal
router.post('/', createJournal)

// DELETE a Journal
router.delete('/:id', deleteJournal)

//UPDATE a Journal
router.patch('/:id', updateJournal)


// export the routers
module.exports = router