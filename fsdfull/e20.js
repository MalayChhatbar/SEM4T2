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
