const express = require('express')
const sessions = require('express-session')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(sessions({
    resave: true,
    saveUninitialized: true,
    secret: 'AGq2Am4qwuH4J+S+ugMmnCDEBcaJEDpmsFtcWP6K5CA='
}));

app.get('/', (req, res) => {
  res.send(`
    <form action="/savesession" method="post">
      Username: <input type="text" name="user" required>
      <input type="submit" value="Submit">
    </form>
  `);
});

app.post('/savesession', (req, res) => {
    req.session.username = req.body.user;
    res.redirect('/fetchsession')
}).listen(3051, console.log('Running'))

app.get('/fetchsession', (req, res) => {
    res.send(`Username is: ${req.session.username}<br><a href = "/logout">Logout</a>`)
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})