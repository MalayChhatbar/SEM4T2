// write an expresjs script to configure the multer middleware. Peform the following tasks
// Create an html file named file.html. This file contains Heading 'Upload your CV' in red color and a form with input type file and submit button.
// Create a js file named file.js and link this js and html file to browse html file on home page. 
// After uploading a file, display a message on upload page. Fileoriginalname has been uploaded
// Save uploaded files to specific directory named example and file must be stored in format of CV-timestamp.pdf where CV is the feildname. 

const express = require('express')
const app = express()
const multer = require('multer')

app.use(express.static(__dirname, {index: 'e38file.html'}))
const store = multer.diskStorage({
    destination: 'example',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${new Date().getTime()}.pdf`)
    }
})

const upload = multer({
    storage: store
})

app.post('/upload', upload.single('CV'), (req, res) => {
    res.send(`${req.file.originalname} has been uploaded`)
}).listen(3051, console.log('Running'))