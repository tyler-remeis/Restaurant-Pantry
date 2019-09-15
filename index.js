var express = require('express');
var app = express();
var path = require('path')

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

app.get('/', function(req, res){
    res.sendFile(path.join(C:\Users\Tyler Remeis\Desktop\Microsoft DEV Courses\Microsoft DEV284x\PantryApp + '/Login.html'));
}); 