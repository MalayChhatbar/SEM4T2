const express = require('express')
const app = express()
const nm = require('nodemailer')

app.use(express.static(__dirname, {index: 'e42.html'}))
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

app.post('/exam', (req, res) => {
    mailoption = {
        from: 'sender@gmail.com',
        to: req.body.mail,
        subject: 'Exam Time Table',
        html: `
            <h3>L J University</h3>
            <table>
                <tr>
                    <td>Date</td>
                    <td>21/05/25</td>
                </tr>
                <tr>
                    <td>Exam Name</td>
                    <td>FSD-2</td>
                </tr>
            </table>
        `
    }
    tran.sendMail(mailoption, (err, info) => {
        if(err) {
            console.log(err);
            res.send(err)
        }
        console.log(info)
        res.send()
    })
}).listen(3054, console.log('Running'))

