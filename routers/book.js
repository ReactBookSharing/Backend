const express = require('express')
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router()
const getBooks = require('../middleware/book')
const Book = require('../models/User')
router.get('/books', getBooks, async (req, res) => {
    // View logged in user profileßßßßßßß
    console.log('sdadsa')
})


module.exports = router