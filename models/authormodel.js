const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema(
  {
    name: {
    type: String,
    required: [true, "Please add the name of the author"]
    },
    born: {
      type: Date,
      required: [true, "Please add the born date of the author"]
    },
    city: {
      type: String,
      required: [true, "Please add the city of the author"]
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Author", authorSchema); // Author is the name of the collection in the database
