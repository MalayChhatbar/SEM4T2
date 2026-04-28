const express = require('express')
const app = express()
const nm = require('nodemailer')
const tran = nm.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'mail@gmail.com',
        pass: 'app password'
    }
})

mailoption = {
    from: 'sender@gmail.com',
    to: 'reciever@gmail.com',
    Subject: 'Trial Mail',
    html: 'Testing, <h1>Hello</h1>'
    // If you want to write text, use text: 'text'
}

// tran.sendMail(mailoption, (err, info) => {
//     if(err) console.log(err);
//     console.log(info)

// })

app.get('/mail', (req, res) => {
    tran.sendMail(mailoption, (err, info) => {
        if(err) {
            console.log(err);
            res.send(err)
        }
        console.log(info)
        res.send(info)
    })
}).listen(3052, console.log('Running'))