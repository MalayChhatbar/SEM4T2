// File with name timestamp.docx

const multer  = require('multer')
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname, {index: 'e35.html'}))

const store = multer.diskStorage({
    destination: 'docx', // Folder name.
    filename: (req, file, cb) => {
        cb(null, "" + Date.now() + ".docx" )
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