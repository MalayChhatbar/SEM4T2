const express = require('express')
const path = require('path')
const app = express()

app.set('views', path.join(__dirname))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('e46')
}).listen(3086, console.log('Running'))