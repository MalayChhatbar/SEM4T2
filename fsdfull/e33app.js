// Write an express js code in which REST api is created for JSON Object named data which contains name, id, branch, city, and contact properties. 
// 1. On API page, it should display all the content. 
// 2. Upon passing id on the browser url, it should display the content having that id (localhost:7899/api/101)
// 3. Upon passing branch, on the browser url, it should display the content having that branch. (localhost:7899/api/branch/IT)

const express = require('express')
const router = express.Router()

const data = [
    {
        'name': 'asdf',
        'id': 101,
        'branch': 'IT',
        'city': 'Ahmedabad',
        'contact': '1234'
    },
    {
        'name': 'qwer',
        'id': 102,
        'branch': 'CSE',
        'city': 'Mumbai',
        'contact': '2345'
    },
    {
        'name': 'zcxv',
        'id': 103,
        'branch': 'IT',
        'city': 'Mumbai',
        'contact': '3456'
    },
    {
        'name': 'wert',
        'id': 104,
        'branch': 'CST',
        'city': 'Delhi',
        'contact': '4567'
    },
    {
        'name': 'cvbn',
        'id': 105,
        'branch': 'IT',
        'city': 'Pune',
        'contact': '5678'
    },
    {
        'name': 'dfgh',
        'id': 106,
        'branch': 'CSE',
        'city': 'Gandhinagar',
        'contact': '6789'
    },
]

router.get('/', (req, res) => {
    res.set('Content-Type', 'text/html')
    for(i of data) {
        res.write(`
            <h3> ID: ${JSON.stringify(i.id)}
            Name: ${i.name}
            Branch: ${i.branch}
            Contact: ${i.contact}    
            city: ${i.city}    
        `)
    }
    res.send()
    // res.json(data)
}).get('/:id', (req, res) => {
    const item = data.find(d => d.id === parseInt(req.params.id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
}).get('/branch/:branch', (req, res) => {
    const item = data.filter(d => d.branch.toLowerCase() === req.params.branch.toLowerCase());
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Not found' });
    }
})

module.exports = router