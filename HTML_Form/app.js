// Store the form data in the mongo db

const { MongoClient } = require('mongodb');
const express = require('express')
const bodyParser = require('body-parser');

// Initialise client
const client = new MongoClient("mongodb://localhost:27017");

// define global var for db
let db

// connect to database
client.connect().then( conn => {

        // assign database connection to db
        db = conn.db( "deep-work" )

    }).catch(err => {
        // log error and exit if connection fails
        console.error( err )
        process.exit()
})

// instantiate a new express object
var app = express()

app.use( bodyParser.urlencoded( { extended: true} );

// Serve files from public folder on '/'
app.use( express.static( 'public' ) );

app.post( '/post-feedback' , function (req, res) {

    // insert received body into FormObject collection
    db.collection('FormObject').insertOne(req.body).then(() => {
            
	    //If you successfully insert the form into the collection then...

	    // Send back successful response
            res.status(200).send("Thank you for submitting")
        
    	}).catch(err => {
            
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
//
// 2. Return JSON this will need a HTML page with some js to make the request 
//    then render elements once the data is received


// a GET method on the app object with HTTP.
app.get('/view-feedback', function (req, res) {

    // GET from the database collection 
    db.collection( 'FormObject' ).find( {} ).toArray()
	
	// 
	.then( function ( feedback ) {
        
	res.status( 200 ).json( feedback )
        console.log( "Form received" );
    });
});


// listen for HTTP events on this server. hostname localhost 127:0:1:8080
app.listen(process.env.PORT || 3000, process.env.IP);
