// Write express js to define 1 json array of three objects having properties name and age of singer. 
// Sort this object according to age. If user requests sorted names in url, then all names along with age 
// should be printed according to descending order of age. Display the sorted the values on sort page and 
// display json object on home page. 

const express = require('express')
const app = express()

const singer = [
        {
            name: 'asdf',
            age: 18
        },
        {
            name: 'qwer',
            age: 21
        },
        {
            name: 'zxcv',
            age: 20
        }
    ]

app.get('/', (_, res) => {
    res.json(singer);
}).get('/sort', (_, res) => {
    temp = [...singer].sort((a,b) => b.age - a.age)
    temp = temp.map(singer => `${singer.name}: ${singer.age}`)
    res.send(temp.join('<br>'))
}).listen(5508, () => {
    console.log('Running')
})