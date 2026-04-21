const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send(`
        <form action="/submit" method="post">
        Username: <input type="text"  name="username"><br>
        Password: <input type="password"  name="password"><br>
        <input type="submit" value = "Submit">
        </form>
    `);
})

app.post('/submit', (req, res) => {
    const { username, password } = req.body;
    res.cookie('username', username, { maxAge: 86400000});
    res.send()
}).listen(3062, console.log('Running'))
