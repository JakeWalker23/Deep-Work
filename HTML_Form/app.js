// Store the form data in the mongo db

const {
    MongoClient
} = require('mongodb');
const express = require('express')
const bodyParser = require('body-parser');

// Initialise client
const client = new MongoClient("mongodb://localhost:27017");

// define global var for db
let db

// connect to database
client.connect()
    .then(conn => {
        // assign database connection to db
        db = conn.db("deep-work")
    })
    .catch(err => {
        // log error and exit if connection fails
        console.error(err)
        process.exit()
    })


var app = express()


app.use(bodyParser.urlencoded({
    extended: true
}));

// Serve files from public folder on '/'
app.use(express.static('public'));


app.post('/post-feedback', function (req, res) {
    // insert received body into FormObjet collection
    db.collection('FormObject').insertOne(req.body)
        .then(() => {
            // Send back successful response
            res.status(200).send("Thank you for submitting")
        })
        .catch(err => {
            // log error and send back internal server error with message
            console.error(err)
            res.status(500).send("Something has gone wrong")
        })
});

// I have left this untouched
// you will likely want to make another endpoint before working on this one 
// you will want an endpoint to get all of the feedback objects
// you haven't really gotten a way to handle requesting this on the frontend though
// you have two options really regarding that 
// 1. Return full HTML page with data in int. 
//    look into a server rendered templating setup, like handlebars 
// 2. Return JSON this will need a HTML page with some js to make the request 
//    then render elements once the data is received

app.get('/view-feedback', function (req, res) {
    db.collection('FormObject').find({}).toArray().then(function (feedback) {
        res.status(200).json(feedback)
        console.log("Form received");
    });
});

app.listen(process.env.PORT || 3000, process.env.IP);