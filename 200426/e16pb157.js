const express = require('express')
const app = express()

app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.send(`<h1>User Form</h1>
        <form action = "/login" method = "POST">
        Username: <input type = "text" name = "t1">
        Password: <input type = "password" name = "t2">
        Message: <textarea>Message</textarea>
        <button type = "submit">Average</button>
        </form>`)
})

const auth = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === "admin" && pass === "1234") {
    next();
  } else {
    res.send("Invalid Credentials");
  }
};

app.post("/login", auth, (req, res) => {
  res.send("Login Successful");
});

app.listen(5055, () => {
  console.log("Server running on http://localhost:3000");
});