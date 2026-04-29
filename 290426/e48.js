// Develop a web application using express and ejs that allows user to enter a students name and marks through a form. 
// After submission, the application should display the entered details and determine the result. 
// If the marks are nine or above, show Pass in a green color. Otherwise, Fail in red color

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/contact', (req, res) => {
    res.render('e48form')
}).listen(3086, console.log('Running'))

app.post('/submit', (req, res) => {
    res.render('e48result', {
        marks: parseInt(req.body.marks),
        name: req.body.nm
    })
})