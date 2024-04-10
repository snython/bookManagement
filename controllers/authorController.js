const asyncHandler = require("express-async-handler");
const Author = require("../models/authormodel");
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
    res.status(400);
    throw new Error("All Fields are mandatory");
  }

  const author = await Author.create({
    name,
    born,
    city
  });

  res.status(201).json(author);
});

//@desc get  author
// @route GET /api/authors
// @access private
const getAuthor = asyncHandler(async (req, res) => {
  console.log('get author detail');
  // const objectId = mongoose.Types.ObjectId(req.params.id);
  const author = await Author.findById(req.params.id);
  if (!author) {
    res.status(404);
    throw new Error("Author not found");
  }
  res.status(200).json(author);
});


//@desc Update  author
// @route PUT /api/authors/:id
// @access private
const updateAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) {
    res.status(404);
    throw new Error("Author not found");
  }
  if (author.user_id.toString() !== req.user.id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }
  const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(updatedAuthor);
});

//@desc delete  author
// @route DELETE /api/authors/:id
// @access private
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);
  console.log(!author);
  if (!author) {
    res.status(404);
    throw new Error("Author not found");
  }
  if (author.user_id.toString() !== req.user.id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }
  await author.deleteOne({ _id: req.params.id });
  res.status(200).json(author);
});

module.exports = {
  getAuthors,
  createAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};
