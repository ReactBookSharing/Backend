const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');
const Book = require('../models/Book');

router.get('', auth, async (req, res) => {
  try {
    const user = req.user;
    const match = {};
    const { name, author, cost, availableForExchange, availableForSale } = req.query;
    if(name) match.name = name;
    if(author) match.author = author;
    if(Number(cost) >= 0) match.cost = Number(cost);
    if(availableForExchange === 'true' || availableForExchange === 'false') match.availableForExchange = availableForExchange === 'true';
    if(availableForSale === 'true' || availableForSale === 'false') match.availableForSale = availableForSale === 'true';
    const books = await Book.find({ owner: user.username, ...match });
    res.status(200).send(books);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('', auth, async (req, res) => {
  const {
    name,
    author,
    cost,
    availableForExchange,
    availableForSale
  } = req.body;
  try {
    const user = req.user;
    const book = new Book({
      name,
      author,
      cost,
      availableForExchange,
      availableForSale,
      owner: user.username
    });
    const result = await book.save();
    res.status(203).send(result);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: 'Internal System Error!', error: JSON.stringify(err) });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const book = await Book.findOne({ owner: user.username, _id: id });
    if (book) {
      res.status(200).send(book);
    }
    res.status(404).send({ message: 'Not Found' });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const {
        name,
        author,
        cost,
        availableForExchange,
        availableForSale
    } = req.body;
    const book = await Book.findOneAndUpdate({ owner: user.username, _id: id }, {name, author, cost, availableForExchange, availableForSale});
    res.status(200).send(book);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    await Book.findByIdAndDelete({ owner: user.username, _id: id });
    res.status(200).send({ message: 'Book deleted!' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
