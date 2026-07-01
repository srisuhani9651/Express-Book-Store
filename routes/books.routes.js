const express = require("express")
const router = express.Router()
const { BOOKS } = require('../db/book')

//This API returns all books. When the client sends a GET request to /books, the server responds with the complete books array in JSON format.
router.get('/', (req, res) =>{
    res.json(BOOKS) 
})

//This API returns a single book based on its ID.
router.get('/:id', (req, res)=>{
    //First, I read the ID from the URL parameters. Since URL values are strings, I convert it into a number using parseInt().
    const id = parseInt(req.params.id) 
    //If the ID is not a valid number, I return a 400 Bad Request error.
    if(isNaN(id)) return res.status(400).json({error: `id must be an number`})
        //Then I search the book in the array using the find() method.
    const book = BOOKS.find(e=> e.id === id) 

    //If the book is not found, I return a 404 Not Found error.
    if(!book){
        return res.status(404).json({ error : `Book with id ${id} doesn't exists!`}) 
    }

    // If the book exists, I send that book as a JSON response with status code 200.
    return res.status(200).json(book) 
})


//This API is used to create a new book.
router.post('/', (req, res)=>{
    //Here, I get the title and author from the request body using destructuring.
    const{title, author} = req.body 
    // validation
    //I validate the input to make sure title and author are not empty. If any field is missing, I return a 400 error.
    if(!title || title === '') return res.status(400). json({error: "Title is required!"})
    if(!author || author === '') return res.status(400). json({error: "Author is required!"})
    // creation
//I generate a new ID based on the current array length.
    const id = BOOKS.length + 1 
    
    const book = { id, title, author} 
    //Then I add the new book to the array using push().
    BOOKS.push(book)
    // return the value
    return res.status(201).json({ message: 'Book created succes'}) //Finally, I return a 201 Created response indicating the book has been created successfully.

  //  return res.json({message: "This route is under development! "}) // here your backend not able to understand how to read different kind of data like json or xml or plain text here express use middleware
})


router.delete('/:id', (req, res)=>{ //This API deletes a book using its ID.
    const id =parseInt(req.params.id) 

    if(isNaN(id)) return res.status(400).json({error : 'id must be a type number'})

    const indexToDelete = BOOKS.findIndex(e=> e.id === id) //I use findIndex() to get the position of the book in the array.

    if(indexToDelete<0){
        return res.status(404).json({error: ` Book with the id ${id} doesn't exists!`})
    }
    BOOKS.splice(indexToDelete, 1) // splice(start, deletecount), If the book exists, I remove it using the splice() method.

    return res.status(200). json({message: 'Book has deleted!'}) //Then I send a success message with status code 200.
})

module.exports = router;