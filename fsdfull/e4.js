const express = require('express')
const app = express()

const employees = {
    name: 'Siya',
    age: 20,
    designation: 'Developer'
}

app.get('/home', (_,res) => {
    res.json(employees)
}).get('/about', (_,res) => {
    res.write(`${employees.designation} ${employees.name} is ${employees.age} years old`);
    res.send()
}).get('/contact', (_,res) => {
    res.send(employees.name)
}).listen(5506)