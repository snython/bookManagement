const express = require("express");
const {
  getAuthors,
  createAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
router.use(validateToken);
router.route("/").get(getAuthors).post(createAuthor);
router.route("/:id").put(updateAuthor).get(getAuthor);
router.route("/:id").delete(deleteAuthor);

module.exports = router;
