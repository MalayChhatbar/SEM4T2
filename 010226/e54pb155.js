const express = require('express');
const app = express();

let users = [
    { name: "A", score: 90 },
    { name: "B", score: 85 },
    { name: "C", score: 95 }
];

users.sort((a, b) => b.name.localeCompare(a.name));

app.get('/', (req, res) => {
    res.json(users);
}).listen(3012, console.log('Running'))