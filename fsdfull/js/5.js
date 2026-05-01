// The folder structure is /css/5.css, /html/5.html, /image/5.png, /js/5.js

const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, "../html"), {index: '5.html'}))
app.use(express.static(path.join(__dirname, "../css")))
app.use(express.static(path.join(__dirname, "../image")))

app.listen(5055, () => {
    console.log('Server running')
})