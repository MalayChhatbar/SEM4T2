# Express.js Class Code

This document contains all the code examples from the Express.js classes, organized by exercise number.

---

## Exercise 15: HTML Form with POST and Middleware Validation

**Task:** Create a form with username, password and submit button. Show form on '/'. On submitting to '/check', validate if username is 'admin'. If admin, display "Welcome Admin", else show error message with link back to form.

```javascript
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
```

**Key Concepts:**
- POST method for form submission
- express.urlencoded() middleware
- Custom middleware for validation
- req.body to access form data

---

## Exercise 16: GET Form, Query Parameters, and Vowel Counting Middleware

**Task:** Create a form with username, password, and message fields using GET method. Display submitted details on '/login' page. Count vowels in message using middleware and display on '/message' page.

```javascript
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
    <form action="/login" method="GET">
      Username: <input type="text" name="user"><br><br>
      Password: <input type="password" name="pass"><br><br>
      Message: <textarea name="msg"></textarea><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.get("/login", (req, res) => {
  const { user, pass, msg } = req.query;
  res.send(`
    <h3>Submitted Details:</h3>
    <p>User: ${user}</p>
    <p>Pass: ${pass}</p>
    <p>Message: ${msg}</p>
    <a href="/message?msg=${encodeURIComponent(msg)}">show vowel</a>
  `);
});

const countVowels = (req, res, next) => {
  const msg = req.query.msg || "";
  const vowels = msg.match(/[aeiou]/gi);
  req.vowelCount = vowels ? vowels.length : 0;
  next();
};

app.get("/message", countVowels, (req, res) => {
  res.send(`<h1>Count of vowels in message: ${req.vowelCount}</h1>`);
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));
```

**Key Concepts:**
- GET method sends data in URL
- req.query for accessing URL parameters
- encodeURIComponent() for special characters
- Custom middleware adding properties to req object

---

## Exercise 17: POST Authentication Middleware

**Task:** Create a login form with username and password. Validate credentials using POST method. If credentials match 'admin' and '1234', display "Login Successful", else show "Invalid Credentials".

```javascript
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <form action="/login" method="POST">
      Username: <input type="text" name="user"><br><br>
      Password: <input type="password" name="pass"><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

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

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

**Key Concepts:**
- POST method for secure data transfer
- req.body for accessing POST data
- Middleware for authentication
- next() to proceed after validation

---

## Exercise 18: Query Parameters from HTML Form

**Task:** Create an HTML file with first name and last name fields. Use GET method to submit to '/process' and display "Welcome {firstname} {lastname}".

```javascript
const express = require("express");
const app = express();

app.use(express.static(__dirname));
app.get("/process", (req, res) => {
  fname = req.query.fn;
  lname = req.query.ln;
  console.log(req.query);
  res.send(`Welcome ${fname} ${lname}`);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
```

**HTML File (index.html):**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <form action="/process" method="get">
      First Name: <input type="text" name="fn" /><br /><br />
      Last Name: <input type="text" name="ln" /><br /><br />
      <input type="submit" />
    </form>
  </body>
</html>
```

**Key Concepts:**
- Static file serving with express.static()
- req.query for GET parameters
- __dirname for current directory

---

## Exercise 19: Message Processing with String Splitting

**Task:** Create HTML form with textarea for message and submit button. Submit to '/process' using GET. Replace dots (.) in message with `<br>` tags to display each sentence on a new line.

```javascript
//print msg in next line spliting by dot and use get method to submit data html file contains form of textarea for the msg and submit button

const express = require("express");
const app = express();

app.use(express.static(__dirname, { index: "2.html" }));

app.get("/process", (req, res) => {
  const message = req.query.msg;

  if (message) {
    const formattedMsg = message.split(".").join("<br>");
    res.send(`<h1>Processed Message:</h1> ${formattedMsg}`);
  } else {
    res.send("Please enter a message.");
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

**HTML File:**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Message Processor</title>
  </head>
  <body>
    <form action="/process" method="get">
      <textarea name="msg" placeholder="Enter message with dots..."></textarea><br><br>
      <button type="submit">Submit</button>
    </form>
  </body>
</html>
```

**Key Concepts:**
- String methods: split() and join()
- Default index file in static serving
- URL query parameters

---

## Exercise 20: Calculator with Dropdown Validation

**Task:** Create calculator with:
1. Two number inputs (must be > 0)
2. Dropdown with operations: select, addition, subtraction, multiplication, division
3. Submit button

Validation:
- Numbers must be > 0, else show error
- Must select operation (not "select"), else show error

```javascript
//Write JS  to perform following task: 1.Create 1 html file which contains 2 number type input field one drop drop down which contains options like select,addition,subtraction, multiplication and division , 1 submit  button 2.the input field must contain the value greater than 0 else it will give a mssage pls enter a valid number . Also,user must select any of the formula from the drop down else give a message you have not selected any formula(message will be dislayed on /calc page) 3. if one one formula is selected  a and numbers are entered then respective operation will is don on /calc page. Use get method to display datra. form sample: num1 input  num2: input Formula dropdown button calculate

const express = require("express");
const app = express();

app.use(express.static(__dirname, { index: "3.html" }));

app.get("/calc", (req, res) => {
  const n1 = parseFloat(req.query.num1);
  const n2 = parseFloat(req.query.num2);
  const formula = req.query.formula;

  if (isNaN(n1) || n1 <= 0 || isNaN(n2) || n2 <= 0) {
    return res.send("Please enter a valid number (greater than 0).");
  }

  if (formula === "select") {
    return res.send("You have not selected any formula.");
  }

  let result;
  switch (formula) {
    case "add":
      result = n1 + n2;
      break;
    case "sub":
      result = n1 - n2;
      break;
    case "mul":
      result = n1 * n2;
      break;
    case "div":
      result = n1 / n2;
      break;
  }

  res.send(`The result of ${formula} is: ${result}`);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

**Key Concepts:**
- parseFloat() for number conversion
- isNaN() for validation
- switch statement for operation selection
- Validation before processing

---

## Exercise 21: Static File Serving (Simple)

**Task:** Serve static files from current directory with default index.html.

```javascript
const express = require("express");
const app = express();

// Serves files from current folder; defaults to 1.html
app.use(express.static(__dirname, { index: "1.html" }));

app.listen(3000, () => {
  console.log("Server active at http://localhost:3000");
});
```

**Key Concepts:**
- express.static() middleware
- __dirname for current directory
- { index: "filename" } for default file

---

## Exercise 22: Static File Serving from Different Folder

**Task:** Serve static files from a different folder (sibling directory).

```javascript
const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("../T2/sample", { index: "2.html" }));

app.listen(3000, () => {
  console.log("Server active at http://localhost:3000");
});
```

**Key Concepts:**
- Path to sibling directory
- express.static() accepts relative paths
- path module (though not explicitly used here)

---

## Complete Code Reference

### Basic Server Structure
```javascript
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

### Middleware Pattern
```javascript
const middlewareName = (req, res, next) => {
  // Process request
  req.customProperty = value;
  next();
};

app.method("/route", middlewareName, (req, res) => {
  res.send(response);
});
```

### Form Handling Pattern
```javascript
// Setup
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send(htmlForm);
});

app.post("/submit", (req, res) => {
  const data = req.body;
  res.send(result);
});
```

### Static Files Pattern
```javascript
app.use(express.static(__dirname, { index: "default.html" }));
```