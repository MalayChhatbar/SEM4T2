// Write a script to meet following requirements
// Create index.html file which contains username, password, login button and open it on localhost
// After clicking button, it should jump on save page. Store username and password in session.
// After saving, redirect to fetch page and read value. Put a logout link button
// Jump on deletesession page after clicking on logout link. 
// Destroy the session and redirect to index.html page.

const express = require('express')
const sessions = require('express-session')
const app = express()

app.use(express.static(__dirname, {index: 'e27index.html'}))
app.use(sessions({
    resave: false,
    saveUninitialized: true,
    secret: 'AGq2Am4qwuH4J+S+ugMmnCDEBcaJEDpmsFtcWP6K5CA='
}))
app.use(express.urlencoded({extended: true}))

app.post('/save', (req, res) => {
    req.session.username = req.body.username;
    req.session.password = req.body.password
    res.redirect('/fetch')
})

app.get('/fetch', (req, res) => {
    res.send(`
        <p>Username: ${req.session.username}
        </p><a href = "/deletesession">Logout</a>
    `)
})

app.get('/deletesession', (req, res) => {
    req.session.destroy()
    res.redirect('/')
}).listen(3052, console.log('Running'))