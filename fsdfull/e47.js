// Write an expressjs application to perform the following tasks
// 1. Create an ejs file named contact.ejs that displays a heading contact form and a form with name, email id, and submit button.
// 2. Render this ejs on the contact root. 
// 3. Handle form submission using post method on the submit root. 
// 4. After form submission, display a message on the browser thank you <name>. We have recieved your email <email>
// ejs file in views folder

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/contact', (req, res) => {
    res.render('e47contact')
}).listen(3086, console.log('Running'))

app.post('/submit', (req, res) => {
    res.send(`Thank you ${req.body.nm}. We have recieved your email ${req.body.em}`)
})