// Store the form data in the mongo db

const mongo = require('mongodb').MongoClient;
const express = require('express')
const bodyParser = require('body-parser');
const path = require("path");

//var url = "mongodb://localhost:27017/";

var dbConn = mongo.connect('mongodb://localhost:27017').MongoClient;

var app = express()


app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static('form.html'));


app.post('/post-feedback', function(req, res) {
    dbConn.then(function(db) {
        delete req.body._id;
        db.collection('FormObject'.insertOne(req.body))
    });
    res.send('Data received:\n' + JSON.stringify(req.body));
    console.log("Form has sent");
});

app.get('/view-feedback', function(req, res) {
    dbConn.then(function() {
        db.collection('FormObject').find({}).toArray().then(function(feedback) {
            res.status(200).json(feedback)
            console.log("Form received");
        });
    });
});

app.listen(process.env.PORT || 3000, process.env.IP);


// connect to the database
/*mongo.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("FormData")

    var formObject = {name: "Jake", surname: "Walker", age: 25, email: "jakewalk93@hotmail.com"}

    dbo.collection("FormObject").insertOne(formObject, function(err, res) {
        if (err) throw err

        console.log("Big shack entered the DB");

        db.close();
    })
}); 

// test in the terminal whether this database is running

*/