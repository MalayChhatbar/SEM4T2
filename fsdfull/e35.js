// Write a express js code that accepts multiple files (up to 5) using multer middleware and saves the file to the specific directory multiple

const multer  = require('multer')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname, {index: 'e35.html'}))

const store = multer.diskStorage({
    destination: 'multiple', // Folder name.
    filename: (req, file, cb) => {
        cb(null, file.originalname )
    }
})

app.post('/uploadfile', multer({storage: store}).array('files', 5), (req, res) => {
    const file = req.files
    if (file) {
        for (i of file){
            res.write(`<h1> File: ${i.originalname} has been uploaded in ${i.destination} folder.`)
        }
        res.send()
    } else {
        res.type(404).json({message: 'Not found'})
    }
}).listen(3030, console.log('Running'))