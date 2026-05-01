const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/login" method="GET">
            UserName: <input type="text" name="username"><br>
            Password: <input type="password" name="password"><br>
            Message: <textarea name="message"></textarea><br>
            <input type="submit" name = "Submit">
        </form>
    `);
});

app.get('/login', (req, res, next) => {
    const { username, password, message } = req.query;
    res.send(`
        <p>UserName: ${username}</p>
        <p>Password: ${password}</p>
        <p>Message: ${message}</p>
        <a href="/message?message=${encodeURIComponent(message)}">Show Vowel</a>
    `);
});

app.get('/message', (req, res) => {
    const { message } = req.query;
    const vowelCount = message.toLowerCase().split('').filter(c => 'aeiou'.includes(c)).length;
    res.send(`
        <p>Number of Vowels: ${vowelCount}</p>
        <a href="/">Back to Form</a>
    `);
}).listen(3013, console.log('Running'))