const express = require('express')
const app = express()

const addName = (req, res, next) => {
    req.name = 'xyz';
    console.log('Name added')
    next()
}

const collegeName = (req, res, next) => {
    req.college = 'LJU'
    console.log('College added')
    next()
}

const addMarks = (req, res, next) => {
    req.total = 50 + 40;
    console.log('Marks added')
    next();
}

app.get('/student', collegeName, addMarks, addName, (req,res) => {
    res.send(`Name: ${req.name}<br>College: ${req.college}<br>Marks: ${req.total}`)
}).listen(3033, console.log('Running'))