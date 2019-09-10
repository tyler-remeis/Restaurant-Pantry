var express = require('exress');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello world!');
});