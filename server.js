const express = require("express");
const morgan = require('morgan');
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
connectDB();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan('tiny'));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/authors", require("./routes/authorRoutes"));
app.use(errorHandler);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
