const express = require('express')
const app = express()

app.get('/data', (req, res) => {
    const {name, age} = req.query
    res.send(`Name: ${name}, Age: ${age}`)
}).listen(5510, console.log('Server started'))