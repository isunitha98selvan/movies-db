var express = require('express');
var cors=require('cors');

var app = express();
app.use(cors());
//sql
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'sanjay',
  password : 'san123jay',
  database : 'hospital'
});
connection.connect();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    connection.query('SELECT * from patient', function (err, rows, fields) {
      if (err) throw err
      console.log('The solution is: ',rows[0]);
      res.end(JSON.stringify(rows));
    });
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
