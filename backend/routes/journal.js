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
router.get('/get-journals', getJournals)

// GET a single Journal
// route parameter is the ID
router.get('/:id', getJournal)

// POST a new Journal
router.post('/create-journal', createJournal)

// DELETE a Journal
router.delete('/delete-journal/:id', deleteJournal)

//UPDATE a Journal
router.put('/:id', updateJournal)

// export the routers
module.exports = router