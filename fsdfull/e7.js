const express = require('express')
const app = express()

app.get('/calendar/:day/event/:ename', (req, res) => {
    res.send(req.params)
}).listen(5509, console.log('Server Started'))