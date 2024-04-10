const asyncHandler = require("express-async-handler");
const Book = require("../models/bookmodel");
//@desc Get all Books
// @route GET /api/books
// @access private
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

//@desc Create new book
// @route POST /api/books
// @access private
const createBook = asyncHandler(async (req, res) => {
  const { title, authorId, yearPublished, genre } = req.body;

  if (!title || !authorId || !yearPublished || !genre) {
    res.status(400);
    throw new Error("All Fields are mandatory");
  }

  const book = await Book.create({
    title,
    authorId,
    yearPublished,
    genre
  });

  res.status(201).json(book);
});

//@desc get  book
// @route GET /api/books
// @access private
const getBook = asyncHandler(async (req, res) => {
  console.log('get book detail');
  const objectId = mongoose.Types.ObjectId(req.params.id);
  const book = await Book.findById(objectId);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.status(200).json(book);
});

//@desc get a list of all books by a author lives in a city and in a date range
// @route get /api/books/:authorId
// @access private
const getBooksByCityAndDate = asyncHandler(async (req, res) => {
  const { authorId } = req.params;
  const { city, startDate, endDate } = req.query;

  // Construct query conditions
  const query = { authorId };
  if (city) {
    query['author.city'] = city;
  }
  if (startDate && endDate) {
    query.yearPublished = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  // Fetch books based on the constructed query
  const books = await Book.find(query).populate('authorId');
  res.status(200).json(books);
});

//@desc Update  book
// @route PUT /api/books/:id
// @access private
const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  if (book.user_id.toString() !== req.user.id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(updatedBook);
});

//@desc delete  book
// @route DELETE /api/books/:id
// @access private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  console.log(!book);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  if (book.user_id.toString() !== req.user.id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }
  await Book.deleteOne({ _id: req.params.id });
  res.status(200).json(book);
});

module.exports = {
  getBooks,
  createBook,
  getBook,
  getBooksByCityAndDate,
  updateBook,
  deleteBook,
};
