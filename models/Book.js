const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  author: String,
  cost: Number,
  availableForExchange: Boolean,
  availableForSale: Boolean,
  owner: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
