# Book Management REST API

A simple RESTful API using Node.js and Express. The API manage a collection of books, supporting operations to create, read (individually/by list), update, and delete books. It provides a set of endpoints that allow you to interact with your book database.

## Features

- **Create Book:** Add a new book to your collection.

- **Update Book:** Modify the information of an existing book.

- **Delete Book:** Delete a book from your collection.

- **Get Book:** Retrieve information about a specific book or a list of all books in your collection.



## API Endpoints

- `POST /api/books`: Create a new book.
- `PUT /api/books/:id`: Update an existing book.
- `DELETE /api/books/:id`: Delete a book by its ID.
- `GET /api/books/:id`: Get details of a specific book by its ID.
- `GET /api/books`: Get a list of all books.
- `GET /api/books/search/:authorId`: Search for books based on specific criteria (author, author city and book publish year).

## Installation

To get started with the Book Management REST API, follow these steps:

Ensure git and node js are install

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/pirjademl/Book-mgmt-rest-api.git

2. Open terminal.

3. Go to the projects root directory and run the following command.

   ```bash
   npm install

4. Define your secret key in environment variables using the command line terminal

```bash
   set ACCESS_TOKEN_SECRET=your_secret_key

5. After installation is complete, you can start the REST server by running `npm start`.
