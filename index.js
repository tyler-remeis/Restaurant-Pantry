var express = require('express');
var app = express();

app.use(express.static('C:\Users\Tyler Remeis\Desktop\Microsoft DEV Courses\Microsoft DEV284x\PantryApp')); /* this line tells Express to use the public folder as our static folder from which we can serve static files*/

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

app.get('/', function(req, res){
    res.sendFile('Login.html');
}); 