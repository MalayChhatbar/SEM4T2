const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.set('Content-Type', 'text/plain');
    res.send('Hello Everyone');
});

app.listen(3005);