var express = require('express');

var app = express();
//sql
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'sanjay',
  password : 'san123jay',
  database : 'hospital'
});

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    connection.connect()

    connection.query('SELECT * from patient', function (err, rows, fields) {
      if (err) throw err
      console.log('The solution is: ',rows[0].name);
      res.end('You\'re in reception..'+rows[0]);
    });
    connection.end();
});
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You\’re in reception. How can I help you?');
});

app.get('/basement', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('You\’re in the wine cellar. Those bottles are mine!');
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page cannot be found!');
});

app.listen(8080);
