const asyncHandler = require("express-async-handler");
const Author = require("../models/authormodel");
const mongoose = require("mongoose");
const { constants } = require("../constants");

//@desc Get all authors
// @route GET /api/authors
// @access private
const getAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find();
  res.status(200).json(authors);
});

//@desc Create new author
// @route POST /api/authors
// @access private
const createAuthor = asyncHandler(async (req, res) => {
  const { name, born, city } = req.body;

  if (!name || !born || !city) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("All Fields are mandatory");
  }

  const author = await Author.create({
    name: name.toUpperCase(),
    born,
    city: city.toUpperCase()
  });

  res.status(constants.CREATE).json(author);
});

//@desc get  author
// @route GET /api/authors
// @access private
const getAuthor = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(constants.VALIDATION_ERROR).json({ error: 'Invalid author ID' });
  }
  const author = await Author.findById(req.params.id);
  if (!author) {
    res.status(constants.NOT_FOUND);
    throw new Error("Author not found");
  }
  res.status(constants.OK).json(author);
});


//@desc Update  author
// @route PUT /api/authors/:id
// @access private
const updateAuthor = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(constants.VALIDATION_ERROR).json({ error: 'Invalid author ID' });
  }
  const author = await Author.findById(req.params.id);
  if (!author) {
    res.status(constants.NOT_FOUND);
    throw new Error("Author not found");
  }
  const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(constants.OK).json(updatedAuthor);
});

//@desc delete  author
// @route DELETE /api/authors/:id
// @access private
const deleteAuthor = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(constants.VALIDATION_ERROR).json({ error: 'Invalid author ID' });
  }
  const author = await Author.findById(req.params.id);
  console.log(!author);
  if (!author) {
    res.status(constants.NOT_FOUND);
    throw new Error("Author not found");
  }
  await author.deleteOne({ _id: req.params.id });
  res.status(constants.OK).json(author);
});

module.exports = {
  getAuthors,
  createAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};
