const jwt = require('jsonwebtoken')
const Book = require('../models/Book')
const User = require('../models/User')

const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find()

        if (books)
            res.books = books; next();

        return res.status(200).json({ message: "No books found in the database..." })
        next();
    } catch (err) {
        res.status(500).json(err)
    }
}

const getUserBooks = async (req, res) => {
    try {
        const user = req.user
        const books = await Book.find({ "owner": user })

        if (books)
            return res.status(200).json(books)

        return res.status(200).json({ message: "User doesn't have books..." })
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = getBooks