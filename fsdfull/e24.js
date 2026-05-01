// Write an expressjs to set cookies of submitted values. 
// Perform following tasks
// 1. Create an html file which contains a form with fields firstname, lastname, password and a submit button
// 2. Once the form is submitted, store this entered value to the respective cookies on next page "/next"
// 3. Then redirect user to /admin page and clear the cookie set for the lastname
// Display remaining set of cookies on this page using post method. 

const express = require('express')
const cookieParse = require('cookie-parser')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

app.use(express.static(__dirname, {index: 'e24.html'}))

app.post('/next', (req, res) => {
    res.cookie('fname', req.body.fname)
    res.cookie('lname', req.body.lname)
    res.cookie('password', req.body.password)
    res.redirect('/admin')
})

const clearLName = (req, res, next) => {
    res.clearCookie('lname')
    next()
}

app.get('/admin', clearLName, (req, res) => {
    res.send(`Welcome ${req.cookies.fname} Lname: ${req.cookies.lname} Password: ${req.cookies.password}`)
}).listen(5057, console.log('Running'))