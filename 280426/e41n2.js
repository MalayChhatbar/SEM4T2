// Create an html file for response form and this file should be loaded on home page. 
// Fields are Name, Email and submit button. Once response is submitted, message 
// thank you for your response will be displayed on page response. 
// And also send mail to the entered email id with the submitted response.

const express = require('express')
const app = express()
const nm = require('nodemailer')

app.use(express.static(__dirname, {index: 'e41form.html'}))
app.use(express.urlencoded({extended: true}))

const tran = nm.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'mail@gmail.com',
        pass: 'app password'
    }
})

app.post('/response', (req, res) => {
    mailoption = {
        from: 'sender@gmail.com',
        to: req.body.mail,
        Subject: 'Response Mail',
        text: `${req.body.name} Response`
    }
    tran.sendMail(mailoption, (err, info) => {
        if(err) {
            console.log(err);
            res.send(err)
        }
        console.log(info)
        res.send(`Thank you for your response ${req.body.name}`)
    })
}).listen(3053, console.log('Running'))

