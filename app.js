var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);

var app = express();

app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));

// build mongo database connection url //

process.env.DB_HOST = process.env.DB_HOST || 'ds135486.mlab.com'
process.env.DB_PORT = process.env.DB_PORT || 35486;
process.env.DB_NAME = process.env.DB_NAME || 'heroku_pb7h12dm';


if (app.get('env') != 'live'){
	process.env.DB_URL = 'mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
	console.log(`line 29`)
}	else {
// prepend url with authentication credentials // 
	process.env.DB_URL = 'mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
}

app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: process.env.DB_URL })
	})
);

require('./app/server/routes')(app);

/*
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
*/

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

/*
//Connecting style sheet
app.use(express.static(path.join(__dirname +'/public'))); 

app.get('/', function(req, res) {
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
*/