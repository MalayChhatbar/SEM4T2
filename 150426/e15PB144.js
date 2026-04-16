// PB 144

const express = require('express')
const app = express()

const checkUser = (req, res, next) => {
    if(req.body.user === 'admin'){
        next()
    } else {
        res.send(`<p style = "color: red">Warning Message</p>`)
    }
}

app.get('/', (req, res) => {
    res.sendFile('D://Malay//FSD//q15pb144.html')
})

app.post('/check', checkUser, (req, res) => {
    res.send('Welcome... admin')
}).listen(3035, console.log('Running'))