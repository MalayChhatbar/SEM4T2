// Create a web server that accepts a GET request with dynamic user id in the url,
//  also accepts additional data name and age using query parameters. 
// Extract the id from root parameters, name and age from query strings. 
// Return a JSON response containing all receieved data.

const express = require('express')
const app = express()

app.get('/users/:id', (req, res) => {
    const {name, age} = req.query
    res.json({"id": Number(req.params.id), "name": name, "age": Number(age)})
}).listen(3032, console.log('Running'))