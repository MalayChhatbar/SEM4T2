const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("../T2/sample", { index: "2.html" }));

app.listen(3000, () => {
  console.log("Server active at http://localhost:3000");
});
