const asyncHandler = require("express-async-handler");
const Book = require("../models/bookmodel");
const Author = require("../models/authormodel");
const mongoose = require("mongoose");
const { constants } = require("../constants");
//@desc Get all Books
// @route GET /api/books
// @access private
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.status(constants.OK).json(books);
});

//@desc Create new book
// @route POST /api/books
// @access private
const createBook = asyncHandler(async (req, res) => {
  const { title, authorId, yearPublished, genre } = req.body;

  if (!title || !authorId || !yearPublished || !genre) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All Fields are mandatory");
  }

  const book = await Book.create({
    title: title.toUpperCase(),
    authorId,
    yearPublished,
    genre: genre.toUpperCase()
  });

  res.status(constants.CREATE).json(book);
});

//@desc get  book
// @route GET /api/books
// @access private
const getBook = asyncHandler(async (req, res) => {
  // const objectId = mongoose.Types.ObjectId(req.params.id);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid book ID' });
  }
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(constants.NOT_FOUND);
    throw new Error("Book not found");
  }
  res.status(constants.OK).json(book);
});

//@desc get a list of all books by a author lives in a city and in a date range. Can also filter by city only or date range only
// @route get /api/books/search/:authorId?city=city&startDate=startDate&endDate=endDate
// @access private
const getBooksByIdAndCityAndDate = asyncHandler(async (req, res) => {
  const authorId = req.params.id;
  const { city, startDate, endDate } = req.query;

  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(constants.VALIDATION_ERROR).json({ error: 'Invalid author ID' });
  }
  
  // Validate startDate and endDate
  if ((startDate && !endDate) || (!startDate && endDate)) {
    return res.status(constants.VALIDATION_ERROR).json({ error: 'Both startDate and endDate must be provided' });
  }

  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    return res.status(constants.VALIDATION_ERROR).json({ error: 'startDate cannot be greater than endDate' });
  }

  // Construct query conditions
  let query;
  // Query authors who live in a city
  if (city) {
    const authorsInCity = await Author.find({ city: city.toUpperCase() }, '_id');
    // Extract author IDs from the result
  const authorIds = authorsInCity.map(author => author._id);

    query = { authorId: { $in: authorIds } };
  } else {
    query = { authorId };
  }
  
  if (startDate && endDate) {
    query.yearPublished = { $gte: parseInt(new Date(startDate).getFullYear()), $lte: parseInt(new Date(endDate).getFullYear()) };
  }

  // Fetch books based on the constructed query
  const books = await Book.find(query).populate('authorId');
  res.status(constants.OK).json(books);
});

//@desc Update  book
// @route PUT /api/books/:id
// @access private
const updateBook = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(constants.VALIDATION_ERROR).json({ error: 'Invalid book ID' });
  }
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(constants.NOT_FOUND);
    throw new Error("Book not found");
  }
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(constants.OK).json(updatedBook);
});

//@desc delete  book
// @route DELETE /api/books/:id
// @access private
const deleteBook = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(constants.VALIDATION_ERROR).json({ error: 'Invalid book ID' });
  }
  const book = await Book.findById(req.params.id);
  console.log(!book);
  if (!book) {
    res.status(constants.NOT_FOUND);
    throw new Error("Book not found");
  }
  await Book.deleteOne({ _id: req.params.id });
  res.status(constants.OK).json(book);
});

module.exports = {
  getBooks,
  createBook,
  getBook,
  getBooksByIdAndCityAndDate,
  updateBook,
  deleteBook,
};
