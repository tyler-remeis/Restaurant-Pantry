var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var path = require('path'); //allowing html files to get sent to url

var PIN_RESTAURANT = "pin";

var app = express();
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


//Connecting style sheet
app.use(express.static(path.join(__dirname +'/public'))); 

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/Login.html'));
}); 

app.get('/Start', function(req, res){
    res.sendFile(path.join(__dirname + '/Start_Options.html'));
}); 

app.get('/Log_Restaurant', function(req, res){
    res.sendFile(path.join(__dirname + '/Log_Restaurant.html'));
}); 

app.get('/Pin_Restaurant', function(req, res){
    res.sendFile(path.join(__dirname + '/Pin_Restaurant.html'));
    db.collection(PIN_RESTAURANT).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get pin page.");
        } else {
            res.status(200).json(docs);
        }
    });
}); 


app.post("/Pin_Restaurant", function(req, res) {
    var newPin = req.body;
    newPin.createDate = new Date();
  
    if (!req.body.name) {
      handleError(res, "Invalid user input", "Must provide a name.", 400);
    } else {
      db.collection(PIN_RESTAURANT).insertOne(newPin, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new pin.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });

app.get('/History', function(req, res){
    res.sendFile(path.join(__dirname + '/History.html'));
}); 