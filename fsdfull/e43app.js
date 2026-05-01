const express = require('express')
const ejs = require('ejs')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('first', {
        name: 'asdf'
    });
}).listen(3085, console.log('Running'))