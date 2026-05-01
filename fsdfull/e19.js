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
