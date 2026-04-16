const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.get('/home', (req, res) => {
    res.send(`<h1>Employee Detail</h1>
        <form action = "/details" method = "POST">
        Name: <input type = "text" name = "name"><br>
        Gender: <input type = "radio" name = "r1" value = "Male"> Male <input type = "radio" name = "r1" value = "Female"> Female <input type = "radio" name = "r1" value = "other"> Other <br>
        Skill: <input type = "checkbox" name = "c1" value = "Python"> Python <br><input type = "checkbox" name = "c1" value = "React"> React <br><input type = "checkbox" name = "c1" value = "Node/Express"> Node / Express <br>
        Dept: <select name="opt">
            <option value="QA">QA</option>
            <option value="o2">Option 2</option>
            <option value="o3">Option 3</option>
            <option value="o4">Option 4</option>
            <option value="o4" selected hidden disabled></option>
            </select>
        <button type = "submit">Click Here</button>
        </form>`)
})

app.post('/details', (req, res) => {
    const {name, r1, c1, opt} = req.body
    res.send(`Name: ${name}<br>Gender: ${r1}<br>Skill: ${c1}<br>Dept: ${opt}`)
}).listen(3031, console.log('Running'));
