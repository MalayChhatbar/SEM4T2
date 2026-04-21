// write a script to meet following requirements:
// • Create session.html file page which contains form(username,password,login button). and open it on
// localhost.
// • After clicking submit button, it should jump on “save” page. Store username and password in
// session.
// • After saving session, redirect to “fetchdata” page and read value. On this page check authentication
// of user. User name and password must be “admin” and “admin@123” respectively.
// o If this condition is true then display welcome admin and display logout link on this
// page(fetchdata).
// ▪ By clicking on logout link user should jump to “destroy” page and destroy the session
// there and display the message “Session destroyed”. And give the link of “login” under
// that message. By clicking that link user will be redirected to the home page.
// o Else display “Please enter valid username and password” and login link on this
// page(fetchdata).

const express = require('express')
const sessions = require('express-session')
const app = express()

app.use(express.static(__dirname, {index: 'e28session.html'}))
app.use(sessions({
    resave: false,
    saveUninitialized: true,
    secret: 'AGq2Am4qwuH4J+S+ugMmnCDEBcaJEDpmsFtcWP6K5CA='
}))
app.use(express.urlencoded({extended: true}))

app.post('/save', (req, res) => {
    req.session.username = req.body.username
    req.session.password = req.body.password
    res.redirect('fetchdata')
})

app.get('/fetchdata', (req, res) => {
    if(req.session.username === 'admin' & req.session.password === 'admin@123') {
        res.send(`
            <p>Welcome Admin
            </p><a href = "/destroy">Logout</a>
        `)
    }
    else {
        res.send(`<p>Please enter valid username and password</p><a href = "/">Login</a>`)
    }
})

app.get('/destroy', (req, res) => {
    req.session.destroy()
    res.send(`<p>Session Destroyed</p><a href = "/">Login</a>`)
}).listen(3053, console.log('Running'))
