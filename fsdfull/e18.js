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
