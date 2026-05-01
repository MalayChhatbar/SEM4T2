const express = require('express');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
    destination: 'IMAGES',
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}.png`);
    }
});

const upload = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Upload only image file'));
        }
    },
    storage: storage
}).single('image');

app.get('/', (req, res) => {
    res.send(`
        <form action="upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="image" accept="image/*" required>
            <button type="submit">Upload</button>
        </form>
    `)
})

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).send(err.message);
        res.send("File uploaded successfully");
    });
}).listen(3015, console.log('Running'))