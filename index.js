require('rootpath')();
var express = require('express');
var path = require('path'); //allowing html files to get sent to url
var app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

//Connecting style sheet
app.use(express.static(path.join(__dirname +'/public'))); 

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

// api routes
app.use('/users', require('./users/users.controller'));

app.get('/Start', function(req, res){
    res.sendFile(path.join(__dirname + '/Start_Options.html'));
}); 

app.get('/Log_Restaurant', function(req, res){
    res.sendFile(path.join(__dirname + '/Log_Restaurant.html'));
}); 

app.get('/Pin_Restaurant', function(req, res){
    res.sendFile(path.join(__dirname + '/Pin_Restaurant.html'));
}); 

app.get('/History', function(req, res){
    res.sendFile(path.join(__dirname + '/History.html'));
}); 

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});