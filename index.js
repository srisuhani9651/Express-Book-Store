const express = require("express")
const { error } = require("node:console")
const app = express()
const PORT = 8000

const books = [
    { id: 1, title : 'Book One', author : 'Author One' },
    { id: 2, title : 'Book Two', author : 'Author Two' } 
]

//Middleware (plugins)
app.use(express.json())

app.get('/books', (req, res) =>{
    res.json(books) // express will convert this array into json and send this array as a json to the frontend
})

app.get('/books/:id', (req, res)=>{// here we are giving a query parameter for id
    const id = parseInt(req.params.id) // here we store that id in id container parsing it in integer
    if(isNaN(id)) return res.status(400).json({error: `id must be an number`})
    const book = books.find(e=> e.id === id) // here we are checking the same id of the book 

    if(!book){
        return res.status(404).json({ error : `Book with id ${id} doesn't exists!`}) // if find any error then giev the error message(handling the error)
    }

    return res.status(200).json(book) // otherwise respose the book with the mentioned id
})

app.post('/books', (req, res)=>{
    const{title, author} = req.body // here fetching the title and author from the body
    // validation
    if(!title || title === '') return res.status(400). json({error: "Title is required!"})
    if(!author || author === '') return res.status(400). json({error: "Author is required!"})
    // creation
    const id = books.length + 1 // increasing the id count dynamically
    
    const book = { id, title, author} 
    books.push(book)
    // return the value
    return res.status(201).json({ message: 'Book created succes'})

  //  return res.json({messagez: "This route is under development! "}) // here your backed not able to understand how to read different kind of data like json or xml or plain text here express use middleware
})

app.delete('/books/:id', (req, res)=>{
    const id =parseInt(req.params.id) // get the id from the parameters

    if(isNaN(id)) return res.status(400).json({error : 'id must be a type number'})

    const indexToDelete = books.findIndex(e=> e.id === id)

    if(indexToDelete<0){
        return res.status(404).json({error: ` Book with the id ${id} doesn't exists!`})
    }
    books.splice(indexToDelete, 1) // this will delete one entry

    return res.status(200). json({message: 'Book has deleted!'})
})
app.listen(PORT, ()=> console.log(`Our server is running on the PORT ${PORT}`))