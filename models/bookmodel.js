const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the title of the book"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    },
    yearPublished: {
      type: Number,
      required: [true, "Please add the year published of the book"],
    },
    genre: {
      type: String,
      required: [true, "Please add the genre of the book"],
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Book", bookSchema); // Book is the name of the collection in the database
