// This is a simple REST API built using Express.js. It performs CRUD operations on a books array. In this code, we have GET, POST, and DELETE APIs. We are using an array as a temporary database instead of a real database.

//Here, I am importing the Express package. Express helps us create a web server and APIs easily
const express = require("express")
const { error } = require("node:console")
//Here, I am creating an Express application. The app object is used to define routes, add middleware, and start the server.
const app = express()
//This is the port number on which my server will run. I can access it using localhost:8000.
const PORT = 8000

//This is a sample array that stores book data. It acts like a temporary database. In a real project, this data would come from MySQL, PostgreSQL, or MongoDB.
const books = [ 
    { id: 1, title : 'Book One', author : 'Author One' },
    { id: 2, title : 'Book Two', author : 'Author Two' } 
]

//Middleware (plugins)
//This middleware converts incoming JSON data into a JavaScript object. Without this middleware, req.body would be undefined.
app.use(express.json()) 

//This API returns all books. When the client sends a GET request to /books, the server responds with the complete books array in JSON format.
app.get('/books', (req, res) =>{
    res.json(books) 
})

//This API returns a single book based on its ID.
app.get('/books/:id', (req, res)=>{
    //First, I read the ID from the URL parameters. Since URL values are strings, I convert it into a number using parseInt().
    const id = parseInt(req.params.id) 
    //If the ID is not a valid number, I return a 400 Bad Request error.
    if(isNaN(id)) return res.status(400).json({error: `id must be an number`})
        //Then I search the book in the array using the find() method.
    const book = books.find(e=> e.id === id) 

    //If the book is not found, I return a 404 Not Found error.
    if(!book){
        return res.status(404).json({ error : `Book with id ${id} doesn't exists!`}) 
    }

    // If the book exists, I send that book as a JSON response with status code 200.
    return res.status(200).json(book) 
})

//This API is used to create a new book.
app.post('/books', (req, res)=>{
    //Here, I get the title and author from the request body using destructuring.
    const{title, author} = req.body 
    // validation
    //I validate the input to make sure title and author are not empty. If any field is missing, I return a 400 error.
    if(!title || title === '') return res.status(400). json({error: "Title is required!"})
    if(!author || author === '') return res.status(400). json({error: "Author is required!"})
    // creation
//I generate a new ID based on the current array length.
    const id = books.length + 1 
    
    const book = { id, title, author} 
    //Then I add the new book to the array using push().
    books.push(book)
    // return the value
    return res.status(201).json({ message: 'Book created succes'}) //Finally, I return a 201 Created response indicating the book has been created successfully.

  //  return res.json({message: "This route is under development! "}) // here your backend not able to understand how to read different kind of data like json or xml or plain text here express use middleware
})

app.delete('/books/:id', (req, res)=>{ //This API deletes a book using its ID.
    const id =parseInt(req.params.id) 

    if(isNaN(id)) return res.status(400).json({error : 'id must be a type number'})

    const indexToDelete = books.findIndex(e=> e.id === id) //I use findIndex() to get the position of the book in the array.

    if(indexToDelete<0){
        return res.status(404).json({error: ` Book with the id ${id} doesn't exists!`})
    }
    books.splice(indexToDelete, 1) // splice(start, deletecount), If the book exists, I remove it using the splice() method.

    return res.status(200). json({message: 'Book has deleted!'}) //Then I send a success message with status code 200.
})
app.listen(PORT, ()=> console.log(`Our server is running on the PORT ${PORT}`)) //Finally, I start the Express server on port 8000. After this, the server is ready to receive client requests.


//Explain in a flow
//When a client sends a request, Express first checks the middleware. The middleware processes the request, like converting JSON into a JavaScript object. Then Express matches the requested URL with the correct route. The route executes its business logic, such as reading, creating, or deleting a book. Finally, the server sends a response back to the client with the appropriate HTTP status code and JSON data.

//1 minute explanation
//This is a simple REST API built using Express.js. First, I import Express and create an application using express(). Then I define a port and create a books array that acts as a temporary database. I use express.json() middleware so the server can read JSON data from the request body. Next, I create three APIs: a GET API to fetch all books or a single book by ID, a POST API to create a new book after validating the input, and a DELETE API to remove a book using its ID. I use appropriate HTTP status codes like 200 for success, 201 for creation, 400 for invalid input, and 404 when a book is not found. Finally, I start the server using app.listen(), so it can accept client requests on port 8000.