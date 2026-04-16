const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.send(`<h1>User Form</h1>
        <form action = "/login" method = "POST">
        Username: <input type = "text" name = "t1">
        Password: <input type = "password" name = "t2">
        Message: <textarea>Message</textarea>
        <button type = "submit">Average</button>
        </form>`)
})

app.post('/login', (req, res) => {
    
})