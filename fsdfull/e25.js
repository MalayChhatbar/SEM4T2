// PB 200 : You have been assigned to develop a user feedback form for a website
// using Express.js and cookies. Implement the following requirements:
// Process a form with the following fields: Name, Email , Message , Rating
// (radio buttons: Bad, Average, Good, Very Good, Excellent) When the user
// submits the form, store their feedback information (name, email, message,
// and rating) in a cookie named "feedback" that expires in 10 seconds.
// Display a confirmation message to the user after successfully submitting the
// form & Create a link to display the feedback details stored in the "feedback"
// cookie. When the user click to the link, retrieve the feedback information
// from the cookie and display it on the page also include a link on the
// feedback details page to Logout. When the user clicks the link, user
// redirected to home page. Make app.js file use get method in express js. No
// need to write html file having form elements.
// After 10 seconds it will give message "no feedback available" message to user

const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.static(__dirname, {index: 'e25pb200.html'}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.post('/submit', (req, res) => {
    const { name, email, message, rating } = req.body;
    const feedback = { name, email, message, rating };
    res.cookie('feedback', feedback, { maxAge: 10000 });
    res.send(`
        <p>Feedback Submitted. Thank you for your feedback.</p>
        <a href="/feedback">View Feedback</a>
    `);
})

app.get('/feedback', (req, res) => {
    if (req.cookies.feedback) {
        res.send(`
            <p>Name: ${req.cookies.feedback.name}</p>
            <p>Email: ${req.cookies.feedback.email}</p>
            <p>Message: ${req.cookies.feedback.message}</p>
            <p>Rating: ${req.cookies.feedback.rating}</p>
            <a href="/logout">Logout</a>
        `);
    } else {
        res.send('No feedback available');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('feedback');
    res.redirect('/');
});

app.listen(5058, console.log('running'))