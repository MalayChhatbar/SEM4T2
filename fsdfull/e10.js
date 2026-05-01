const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.get('/home', (req, res) => {
    res.send(`<h1>User Form</h1>
        <form action = "/result" method = "POST">
        T1: <input type = "number" name = "t1">
        T2: <input type = "number" name = "t2">
        T3: <input type = "number" name = "t3">
        T4: <input type = "number" name = "t4">
        <button type = "submit">Average</button>
        </form>`)
})

app.post('/result', (req, res) => {
    // res.json({'Marks': Avg}) // if asked to send in json
    const { t1, t2, t3, t4 } = req.body;
    const marks = [t1, t2, t3, t4].map(Number);
    const average = marks.reduce((a, b) => a + b, 0) / marks.length;
    res.send(`Marks: ${average.toFixed(2)}`)
}).listen(3030, () => {
    console.log('Server Running')
})