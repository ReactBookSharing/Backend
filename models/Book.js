const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const bookSchema = new Schema({
  name: String,
  author: String,
  cost: Number,
  availableForExchange: Boolean,
  availableForSale: Boolean,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
