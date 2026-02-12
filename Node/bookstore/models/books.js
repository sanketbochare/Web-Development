const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  publisher: String,
  pages: String,
  image_url: String,
  buy_url: String
});

const Books =
  mongoose.models.books ||
  mongoose.model('books', booksSchema);

const getBooks = async () => Books.find();

const getBookById = async (id) => Books.findById(id);

const addBook = async (bookData) => {
  const book = new Books(bookData);
  return book.save();
};

const updateBook = async (id, data) => {
  return Books.findByIdAndUpdate(id, data, {
    returnDocument: 'after'
  });
};

const deleteBook=async (id)=>{
  return await Books.findByIdAndDelete(id);
};

module.exports = {
  Books,
  getBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook
};
