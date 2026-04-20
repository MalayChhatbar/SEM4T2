# Express.js Topics Notes

This document covers all Express.js topics taught in the Full Stack Development course, with detailed explanations and code examples.

---

## 1. Setting Up Express.js Server

### Topic: Importing and Initializing Express

Express.js is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.

### Key Concepts

- **require("express")**: Imports the Express module into your application
- **express()** or **express()**: Creates an Express application instance
- **app.listen(port, callback)**: Starts the server on the specified port

### Code Example

```javascript
const express = require("express");
const app = express();

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

### Explanation

1. `const express = require("express")` - Loads the Express package
2. `const app = express()` - Creates the application instance (the app object handles requests)
3. `app.listen(3000, ...)` - The server listens on port 3000, and the callback runs when server starts

---

## 2. Basic Routing

### Topic: Handling GET and POST Requests

Routing refers to how an application responds to a client request to a particular endpoint (URI) and HTTP method (GET, POST, etc.).

### Key Concepts

- **app.get(path, callback)**: Handles GET requests
- **app.post(path, callback)**: Handles POST requests
- **req** (request): Contains information about the HTTP request
- **res** (response): Object to send response back to the client
- **res.send()**: Sends a response (can be HTML, text, JSON)

### Code Example (GET Route)

```javascript
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Express!</h1>");
});
```

This route responds to requests at the root path "/" with an HTML message.

### Code Example (POST Route)

```javascript
app.post("/submit", (req, res) => {
  res.send("Form submitted successfully!");
});
```

---

## 3. Query Parameters

### Topic: Accessing Data from URL

Query parameters are appended to the URL after a `?` symbol (e.g., `/search?name=John&age=25`).

### Key Concepts

- **req.query**: Object containing all query parameters
- **URL encoding**: Using `encodeURIComponent()` for special characters
- **GET method**: Data visible in URL (used for searches, filters)

### Code Example

```javascript
app.get("/login", (req, res) => {
  const { user, pass, msg } = req.query;
  res.send(`
    <h3>Submitted Details:</h3>
    <p>User: ${user}</p>
    <p>Pass: ${pass}</p>
  `);
});
```

When user visits `/login?user=admin&pass=123`, `req.query` becomes:
```javascript
{ user: "admin", pass: "123" }
```

### Using encodeURIComponent

```javascript
// In HTML form
<a href="/message?msg=${encodeURIComponent(msg)}">show vowel</a>

// In server
const msg = req.query.msg || "";
```

This ensures special characters (spaces, symbols) are properly transmitted.

---

## 4. Middleware Functions

### Topic: Functions that Execute Between Request and Response

Middleware functions are functions that have access to the request object (`req`), response object (`res`), and the next middleware function (`next`).

### Purpose of Middleware

- Execute any code
- Modify the request/response objects
- End the response cycle
- Call the next middleware in the stack

### Key Concepts

- **next()**: Passes control to the next middleware function
- **req object customization**: Attach custom properties to req (e.g., `req.vowelCount`)

### Code Example (Authentication Middleware)

```javascript
const auth = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === "admin" && pass === "1234") {
    next(); // Proceed to next middleware/route handler
  } else {
    res.send("Invalid Credentials"); // Response sent, cycle ends
  }
};

app.post("/login", auth, (req, res) => {
  res.send("Login Successful");
});
```

### Middleware Flow

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
                ↓            ↓              ↓
               next()       next()      res.send()
```

### Code Example (Custom Data in Middleware)

```javascript
const countVowels = (req, res, next) => {
  const msg = req.query.msg || "";
  const vowels = msg.match(/[aeiou]/gi);
  req.vowelCount = vowels ? vowels.length : 0;
  next();
};

app.get("/message", countVowels, (req, res) => {
  res.send(`<h1>Count of vowels: ${req.vowelCount}</h1>`);
});
```

---

## 5. Form Handling (POST Method)

### Topic: Processing Form Data with POST

The POST method sends data in the request body (not visible in URL), making it more secure for passwords and sensitive data.

### Key Concepts

- **express.urlencoded()**: Middleware to parse URL-encoded form data
- **{ extended: true }**: Allows parsing of nested objects
- **req.body**: Object containing form data (requires urlencoded middleware)

### Code Example

```javascript
const express = require("express");
const app = express();

// Required to parse form data
app.use(express.urlencoded({ extended: true }));

app.post("/check", (req, res) => {
  const { username, password } = req.body;
  res.send(`Welcome ${username}!`);
});
```

### HTML Form

```html
<form action="/check" method="POST">
  Username: <input type="text" name="username"><br>
  Password: <input type="password" name="password"><br>
  <button type="submit">Submit</button>
</form>
```

### Important: middleware Order

Middleware order matters! The `express.urlencoded()` middleware must be defined BEFORE the route handlers.

```javascript
// CORRECT order
app.use(express.urlencoded({ extended: true }));
app.post("/submit", handler);

// WRONG order - req.body will be undefined
app.post("/submit", handler);
app.use(express.urlencoded({ extended: true }));
```

---

## 6. Static File Serving

### Topic: Serving HTML, CSS, JavaScript, and Image Files

Static file serving allows the Express server to serve files (HTML, CSS, images) directly to the browser.

### Key Concepts

- **express.static()**: Middleware for serving static files
- **__dirname**: Current directory path
- **{ index: "filename" }**: Default file to serve when accessing root

### Code Example (Serve from Current Directory)

```javascript
const express = require("express");
const app = express();

// Serve files from current directory; defaults to index.html
app.use(express.static(__dirname, { index: "1.html" }));

app.listen(3000, () => {
  console.log("Server active at http://localhost:3000");
});
```

### Code Example (Serve from Different Folder)

```javascript
const express = require("express");
const path = require("path");
const app = express();

// Serve files from ../T2/sample folder
app.use(express.static("../T2/sample", { index: "2.html" }));

app.listen(3000, () => {
  console.log("Server active at http://localhost:3000");
});
```

### How Static File Serving Works

1. Browser requests `http://localhost:3000/`
2. Express looks in the static folder for `index.html` (or specified index file)
3. If found, Express serves it automatically
4. For additional files (CSS, images), browser requests them, and Express serves from the same folder

### HTML with CSS

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="2.css">
    <title>Document</title>
  </head>
  <body>
    <p class="abc">Styled Paragraph</p>
  </body>
</html>
```

```css
.abc {
  color: crimson;
}
```

---

## 7. Combining All Concepts

### Example: Complete Form Handling with Middleware and Processing

```javascript
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// Step 1: Show form
app.get("/", (req, res) => {
  res.send(`
    <form action="/login" method="POST">
      Username: <input type="text" name="user"><br>
      Password: <input type="password" name="pass"><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Step 2: Middleware for authentication
const auth = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === "admin" && pass === "1234") {
    next();
  } else {
    res.send("Invalid Credentials");
  }
};

// Step 3: Route handler after middleware
app.post("/login", auth, (req, res) => {
  res.send("Login Successful");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## Summary Table

| Topic | Key Object/Method | Purpose |
|-------|-------------------|---------|
| Server Setup | `app.listen()` | Start Express server |
| GET Routes | `app.get()` | Handle URL requests |
| POST Routes | `app.post()` | Handle form submissions |
| Query Params | `req.query` | Access URL parameters |
| Form Data | `req.body` | Access POST data |
| Middleware | `next()` | Chain functions |
| Static Files | `express.static()` | Serve HTML/CSS/JS |

---

## Common Patterns

### Pattern 1: Simple GET Form Processing

```javascript
app.get("/process", (req, res) => {
  const data = req.query.paramName;
  // process data
  res.send(result);
});
```

### Pattern 2: POST Form with Validation

```javascript
app.use(express.urlencoded({ extended: true }));

const validate = (req, res, next) => {
  if (req.body.field) {
    next();
  } else {
    res.send("Error message");
  }
};

app.post("/route", validate, (req, res) => {
  // handle valid data
});
```

### Pattern 3: Calculator with Operations

```javascript
app.get("/calc", (req, res) => {
  const n1 = parseFloat(req.query.num1);
  const n2 = parseFloat(req.query.num2);
  const formula = req.query.formula;

  let result;
  switch (formula) {
    case "add": result = n1 + n2; break;
    case "sub": result = n1 - n2; break;
    case "mul": result = n1 * n2; break;
    case "div": result = n1 / n2; break;
  }

  res.send(`Result: ${result}`);
});
```

---

## Important Notes

1. **Always use `next()`** in middleware unless you're ending the response cycle with `res.send()`

2. **Middleware order matters** - Define `express.urlencoded()` before route handlers

3. **Use encodeURIComponent** for special characters in URLs

4. **POST is more secure** than GET for sensitive data (passwords)

5. **req.query** is for GET parameters, **req.body** is for POST data

6. **express.static()** serves files automatically - no explicit route needed

7. **__dirname** gives the absolute path of the current file's directory