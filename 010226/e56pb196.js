const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/submit" method="POST">
            Username: <input type="text" name="username" required><br>
            Password: <input type="password" name="password" required><br>
            Confirm Password: <input type="password" name="confirmPassword" required><br>
            Gender:
                <input type="radio" name="gender" value="Male" required> Male
                <input type="radio" name="gender" value="Female"> Female
            <br>
            <input type="submit" name = "Submit">
        </form>
    `);
});

app.post('/submit', (req, res) => {
    const { username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
        return res.send(`
            <p style="color: red;">Warning: Password and Confirm Password do not match!</p>
        `);
    }
    res.send(`
        <p>Username: ${username}</p>
        <p>Password: ${password}</p>
        <p>Gender: ${gender}</p>
    `);
}).listen(3014, console.log('Running'))