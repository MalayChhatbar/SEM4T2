const express = require('express')
const app = express()

const student = {
    name: 'xyz',
    age: 18
}

app.get('/student', (req,res) => {
    // res.write(JSON.stringify(student));
    // res.send();
    // Option two
    // res.send(student);
    // Third option
    res.json(student)
}).listen(5505);