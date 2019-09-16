var express = require('express');
var app = express();
var path = require('path')

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
}); 

app.get('/History', function(req, res){
    res.sendFile(path.join(__dirname + '/History.html'));
}); 