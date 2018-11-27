var express = require('express');
var cors=require('cors');

var app = express();
app.use(cors());
//sql
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : '10.52.56.55',
  user     : 'user',
  password : 'Student@123',
  database : 'movies'
});

connection.connect()
console.log("Accessed")

//app.use(express.static('movie-app'))

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    const query = req.query;
    console.log(query);
    connection.query(query.sql, function (err, rows, fields) {
      console.log('The solution is: ',JSON.stringify(rows));
      res.end(JSON.stringify(rows));
    });
});

app.get('/login', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const query = req.query;
    if(query.type=='login'){
        console.log(query.type);
        connection.query(query.sql, function (err, rows, fields) {
            console.log('The solution if is: ',rows[0]);
            res.end(JSON.stringify(rows));
        });
    }
    else 
    {
        connection.query('select * from user where user.username=?;',[query.username], function (err, rows, fields) {
            if (err) throw err
            console.log('Search is: ',rows,query.username);
            if(rows[0]==undefined)
            {
                connection.query(query.sql, function (err, rows, fields) {
                    if (err) throw err
                    console.log('The solution is: ',rows[0]);
                });
                console.log('user created');
                res.end(JSON.stringify({success:true}));
            }else{
                console.log('user exists');
                res.end(JSON.stringify([]));
            }
        });

    }
});

 
app.post('/route', function(req,res){
	let inputContent = req.body.textField;
	console.log(inputContent);
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


//http://localhost:8080/login?type=login&username=sanjay&sql=select%20*%20from%20user%20where%20username=%27sanjay%27%20and%20password=%27password%27;
//http://localhost:8080/login?type=signup&username=sunita&sql=insert%20into%20user%20(name,email,username,password,location,reg_date)%20values%20(%27sunita%27,%27sunita@gmail.com%27,%27sunita%27,%27password%27,%27xyz%27,CURDATE());
