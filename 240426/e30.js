// PB 205

const express = require('express');
const app = express();

let students = [
    { Name: "asdf", Roll_no: 1, Division: "A", Percentage: 85, Grade: "A" },
    { Name: "zxcv", Roll_no: 2, Division: "B", Percentage: 75, Grade: "B" },
    { Name: "qwer", Roll_no: 3, Division: "A", Percentage: 90, Grade: "A" },
];

app.get('/result', (req, res) => {
    res.json(students);
});

app.get('/result/:roll_no', (req, res) => {
    const student = students.find(s => s.Roll_no === parseInt(req.params.roll_no));
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ error: "Student not found" });
    }
}).listen(3061, console.log('Running'));