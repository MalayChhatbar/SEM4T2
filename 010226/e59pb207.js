const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/discount" method="POST">
            Product Price: <input type="number" name="price" step="0.01"><br>
            Discount (%): <input type="number" name="discount" step="0.01"><br>
            Offer: 
            <select name="offerType">
                <option value="">Select</option>
                <option value="Offer 1">Offer 1</option>
                <option value="Offer 2">Offer 2</option>
                <option value="Offer 3">Offer 3</option>
            </select><br>
            
            <input type="submit" name = "Submit">
        </form>
    `);
});

app.post('/discount', (req, res) => {
    const { price, discount, offerType } = req.body;
    let errors = [];

    if (parseFloat(price) <= 0 || parseFloat(discount) <= 0) {
        errors.push("Enter valid price and discount");
    }
    
    if (!offerType) {
        errors.push("Please select an offer type");
    }

    if (errors.length > 0) {
        return res.send(`<h3>Errors:</h3><ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul><br><a href="/">Go Back</a>`);
    }

    const priceNum = parseFloat(price);
    const discountNum = parseFloat(discount);
    const discountAmount = (priceNum * discountNum) / 100;
    const finalPrice = priceNum - discountAmount;

    res.send(`
        <h3>Calculation Successful</h3>
        <p>Offer Type: ${offerType}</p>
        <p>Original Price: ${parseFloat(price).toFixed(2)}</p>
        <p>Discount: ${parseFloat(discount)}%</p>
        <p>Final Price: ${finalPrice.toFixed(2)}</p>
        <br><a href="/">Go Back</a>
    `);
});

app.listen(3023, console.log('Running'));
