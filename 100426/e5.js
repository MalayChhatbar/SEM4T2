const express = require('express')
const app = express()

const student = {
    u1: [{
        name: 'LJU',
        id: 2
    }, {
        name: 'LJU2',
        id: 3
    }, {
        name: 'LJU3',
        id: 4
    }
    ]
}

app.get('/student', (_,res) => {
    // res.type('text/html')
    // res.write(`<table style = "border: 2px solid black; width: 4px; border-collapse: collapse"><tr><td style = "border: 2px solid black">Name</td><td style = "border: 2px solid black">ID</td></tr>`)
    // query = ''
    // for( var i of student.u1) {
    //     query += `<tr><td style = "border: 2px solid black">${i.name}</td><td style = "border: 2px solid black">${i.id}</td></tr>`
    // }
    // res.write(query)
    // res.write(`</table>`)
    // res.send()
    res.type('text/html')
    const rows = student.u1.map(i => `<tr><td style = "border: 2px solid black">${i.name}</td><td style = "border: 2px solid black">${i.id}</td></tr>`)
    res.write(`<table style = "border: 2px solid black; width: 4px; border-collapse: collapse">
                <tr>
                    <td style = "border: 2px solid black">Name</td>
                    <td style = "border: 2px solid black">ID</td>
                </tr>${rows.join('')}
            </table>`)
    res.send()
}).listen(5507)