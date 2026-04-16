// Develop a web application that simulates a college class room entry system using middleware. 
// When a student accesses the class room, log that the student entered the campus. 
// Verify whether the student has a valid ID card. If valid, allow entry and display a welcome message. 
// If not valid, deny access.

const express = require('express')
const app = express()

const entryLog = (req, res, next) => {
    req.name = 'asdf'
    console.log('User entered the campus')
    next()
}

const checkID = (req, res, next) => {
    hasid = false
    if(hasid) {
        console.log('ID Verified')
        next()
    } else {
        console.log('Access Denied.')
        res.status(403).send('Access Denied')
    }
}

app.get('/student', entryLog, checkID, (req,res) => {
    res.send(`Welcome ${req.name} to the campus.`)
}).listen(3034, console.log('Running'))