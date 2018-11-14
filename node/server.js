var http=require('http');
var url=require('url');
var querystring=require('querystring');
// var util=require('util');

var server=http.createServer(function(req,res){
    var pagereq=url.parse(req.url).pathname;
    var params=querystring.parse(url.parse(req.url).query);
    // console.log(util.inspect(pagereq,false,null,true)); display to console
    if(pagereq=='/'){
        res.writeHead(200);
        res.write('<h1>Home Page</h1>');
    }else if(pagereq=='/sanjay'){
        res.writeHead(200);
        res.write('<h1>Sanjay Page</h1>');
    }else{
        res.writeHead(404);
    }
    if ('firstname' in params && 'lastname' in params) {
        res.write('<h3>Your name is ' + params['firstname'] + ' ' + params['lastname']+'</h3>');
    }
    else {
        res.write('<h3>Better send first name and last name</h3>');
    }
    res.end();
});

server.on('close', function() { // We listened to the close event
    console.log('Goodbye!');
});

server.listen(8080);

//everything is event based and with callback
//create server callback funcion is triggered on request
//emiting events
// var EventEmitter = require('events').EventEmitter;

// var game = new EventEmitter();

// game.on('gameover', function(message){
//     console.log(message);
// });

// game.emit('gameover', 'You lose!');