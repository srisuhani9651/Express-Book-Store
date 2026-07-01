const express = require("express")
const router = express.Router()

const controller = require('../Controller/book.controller')

//This API returns all books. When the client sends a GET request to /books, the server responds with the complete books array in JSON format.
router.get('/', controller.getAllBooks)

//This API returns a single book based on its ID.
router.get('/:id', controller.getBookById)

//This API is used to create a new book.
router.post('/', controller.createBook)

router.delete('/:id', controller.deleteBook)

module.exports = router;