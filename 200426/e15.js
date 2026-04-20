//HTML form with username ,password and submit button use post method 2.On visiting '/' show the form 3.on submitting to login page if username is admin display welcome admin else show pls login with admin name and a link back to form

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <form action="/check" method="POST">
      Username: <input type="text" name="username"><br><br>
      Password: <input type="password" name="password"><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

const checkAdmin = (req, res, next) => {
  const { username } = req.body;

  if (username === "admin") {
    next();
  } else {
    res.send(
      '<h2 style="color:red;">login with admin name</h2><br><a href="/">Back</a>',
    );
  }
};

app.post("/check", checkAdmin, (req, res) => {
  res.send(`<h1>Welcome Admin ${req.body.username}</h1>`);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
