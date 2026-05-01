const express = require('express')
const app = express()

app.get('/', (req,res) => {
    res.type('text/plain');
    res.send('<h1>Hey</h1>')
}).get('/about', (req,res) => {
    res.type('text/html');
    // res.write('<h1>Yes</h1>');
    res.send('<h1>asdf</h1>');
});

app.listen(5504, () => {
    console.log('Running');
})