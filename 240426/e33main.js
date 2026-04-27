const api = require('./e33app')
const express = require('express')
const app = express()

app.use("/api", api).listen(7899, console.log('Running'))