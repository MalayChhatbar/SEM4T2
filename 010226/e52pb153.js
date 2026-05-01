const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname, {index: 'e52pb153login.html'}));

app.post('/data', (req, res) => {
    const { username, password, remember, subscribe } = req.body;
    let response = `
        <h1>Submitted Data</h1>
        <p>Username: ${username}</p>
        <p>Password: ${password}</p>
        <p>Remember: ${remember ? 'Yes' : 'No'}</p>
        <p>Subscribe: ${subscribe ? 'Yes' : 'No'}</p>
        <a href = "/">Logout</a>
    `;
    res.send(response);
}).listen(3010, console.log('Running'))