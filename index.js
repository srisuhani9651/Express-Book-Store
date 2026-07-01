// This is a simple REST API built using Express.js. It performs CRUD operations on a books array. In this code, we have GET, POST, and DELETE APIs. We are using an array as a temporary database instead of a real database.

//Here, I am importing the Express package. Express helps us create a web server and APIs easily
const express = require("express")
const { error } = require("node:console")
//Here, I am creating an Express application. The app object is used to define routes, add middleware, and start the server.
const app = express()
//This is the port number on which my server will run. I can access it using localhost:8000.
const PORT = 8000

const bookRouter = require('./routes/books.routes')
const { logger } = require("./middleware/logger")



//Middleware (plugins)
//This middleware converts incoming JSON data into a JavaScript object. Without this middleware, req.body would be undefined.
app.use(express.json()) 

//This middleware logs every incoming request into a file and then calls next() to continue processing the request.
app.use(logger)

app.use('/books', bookRouter)

app.listen(PORT, ()=> console.log(`Our server is running on the PORT ${PORT}`)) //Finally, I start the Express server on port 8000. After this, the server is ready to receive client requests.



//Explain in a flow
//When a client sends a request, Express first checks the middleware. The middleware processes the request, like converting JSON into a JavaScript object. Then Express matches the requested URL with the correct route. The route executes its business logic, such as reading, creating, or deleting a book. Finally, the server sends a response back to the client with the appropriate HTTP status code and JSON data.

//1 minute explanation
//This is a simple REST API built using Express.js. First, I import Express and create an application using express(). Then I define a port and create a books array that acts as a temporary database. I use express.json() middleware so the server can read JSON data from the request body. Next, I create three APIs: a GET API to fetch all books or a single book by ID, a POST API to create a new book after validating the input, and a DELETE API to remove a book using its ID. I use appropriate HTTP status codes like 200 for success, 201 for creation, 400 for invalid input, and 404 when a book is not found. Finally, I start the server using app.listen(), so it can accept client requests on port 8000.