// Write expressjs using sessions to display how many times a user visited a website. 
// If user is visiting the website for the first time, then display Welcome, thank you for visiting our website
// Else, display the count how many times user visited the website for that particular session.

const express = require('express')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const app = express()

app.use(sessions({
    resave: true,
    saveUninitialized: true,
    secret: 'AGq2Am4qwuH4J+S+ugMmnCDEBcaJEDpmsFtcWP6K5CA='
}));

app.get('/', (req, res) => {
    if(req.session.page_views) {
        req.session.page_views++;
        res.send(`<h1 style="color:blue">You have visited page ${req.session.page_views} times</h1>`)
    }
    else {
        req.session.page_views = 1;
        res.send(`<h1 style="color:green">Welcome, Thank you for visiting our website</h1>`)
    }
}).listen(3051, console.log('Running'))