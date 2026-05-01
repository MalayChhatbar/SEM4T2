const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname, {index: 'e53pb152.html'}));

app.post('/result', (req, res) => {
    const text = req.body.textarea;
    const sentences = text.split('.').map(s => s.trim());

    let response = '<h1>Sentences:</h1>';
    sentences.forEach(sentence => {
        response += `<p>${sentence}</p>`;
    });
    response += '<a href="/">Back to form</a>';
    res.send(response);
}).listen(3011, console.log('Running'))