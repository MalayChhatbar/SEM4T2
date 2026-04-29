// Develop a web application using express and ejs to accept marks of T1, T2, T3 and T4 each out of 25 through a form using post method. 
// After submission, Display all entered marks in a tabular format, along with the total marks.
// Determine the result. If the total is 35 or more, Pass in green color, otherwise Fail in red color. 

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/contact', (req, res) => {
    res.render('e49form')
}).listen(3086, console.log('Running'))

app.post('/submit', (req, res) => {
    res.render('e49result', {
        T1: parseInt(req.body.T1),
        T2: parseInt(req.body.T2),
        T3: parseInt(req.body.T3),
        T4: parseInt(req.body.T4),
        name: req.body.nm
    })
})