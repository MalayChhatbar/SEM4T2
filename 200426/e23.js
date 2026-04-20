const express = require('express')
const cookieParse = require('cookie-parser')
const app = express()

app.use(cookieParse())

// app.get('/cookie', (req, res) => {
//     res.cookie('name', 'expressjs')
//     res.cookie('fname', 'asdf')
//     res.cookie('lname', 'zxcv')
//     res.cookie('ID', '1', {'expires': new Date(Date.now() + 10000)})
//     res.cookie('email', 'z@gmail.com', {'maxAge': 5000})
//     res.send(req.cookies)
// }).listen(5056, console.log('running'))

app.get('/cookie', (req, res) => {
    res.cookie('name', 'expressjs')
    res.cookie('fname', 'asdf')
    // res.cookie('lname', 'zxcv')
    res.cookie('ID', '1', {'expires': new Date(Date.now() + 10000)})
    res.cookie('email', 'z@gmail.com', {'maxAge': 5000})
    res.clearCookie('lname')
    res.send(req.cookies)
}).listen(5056, console.log('running'))