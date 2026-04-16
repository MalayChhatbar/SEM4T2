const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.send(`<h1>User Form</h1>
        <form action = "/user" method = "POST">
        <input type = "text" name = "t1">
        <button type = "submit">Click</button>
        </form>`)
})

app.post('/user', (req, res) => {
    res.send(`Name: ${req.body.t1}`)
}).listen(3030, () => {
    console.log('Server Running')
})