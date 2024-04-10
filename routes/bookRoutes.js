const express = require("express");
const {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
router.use(validateToken);
router.route("/").get(getBooks).post(createBook);
router.route("/:id").put(updateBook).get(getBook);
router.route("/:id").delete(deleteBook);

module.exports = router;
