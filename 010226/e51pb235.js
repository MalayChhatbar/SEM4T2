const express = require('express');
const multer = require('multer');

const app = express();

const storage = multer.diskStorage({
    destination: 'File',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-` + file.originalname);
    }
});

const upload = multer({ storage: storage });
app.use(express.static('public', {index: 'form.html'}));

app.post('/upload', upload.single('data'), (req, res) => {
    res.send(`${req.file.originalname} has been uploaded`);
});

app.listen(3086, () => {
    console.log(`Server running.`);
});