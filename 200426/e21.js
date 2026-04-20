const express = require("express");
const app = express();

// Serves files from current folder; defaults to 1.html
app.use(express.static(__dirname, { index: "1.html" }));

app.listen(3000, () => {
  console.log("Server active at http://localhost:3000");
});
