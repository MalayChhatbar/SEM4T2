const express = require('express');
const multer = require('multer');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}))

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });
const render = (req, res) => {
    res.render('e50');
}
app.get('/', render);

app.get('/home', render);

app.post('/upload', upload.single('f'), (req, res) => {
    res.send(`File uploaded successfully: ${req.file.originalname}`);
}).listen(3086, console.log('Running'))