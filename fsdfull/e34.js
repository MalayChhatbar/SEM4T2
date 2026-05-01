// Write an express script that accepts single file to be uploaded using the multer middleware and stores the file to the specific directory named LJU.

const multer  = require('multer')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname, {index: 'e34.html'}))

const store = multer.diskStorage({
    destination: 'LJU', // Folder name.
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

app.post('/uploadfile', multer({storage: store}).single('mypic'), (req, res) => {
    const file = req.file
    if (file) {
        res.send(`<h1> File: ${file.originalname} has been uploaded in ${file.destination} folder.`)
    } else {
        res.type(404).json({message: 'Not found'})
    }
}).listen(3030, console.log('Running'))