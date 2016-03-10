//Roomba_Testing_Server

var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

//----------------Route--------------------//

app.use(express.static('public'));

//------------Stars_Source------------//

app.get('/', function(req, res){
  res.sendfile('public/index.html');
});

app.get('/clm', function(req, res){
  res.sendfile('public/clm.html');
});


//----------------Display IP Address on Terminal-------------------//

http.listen(3001, function(){
  	console.log("");
    console.log("");
    console.log("---------------|  Roomba Testing  |-----------------");
    console.log("");
    console.log("Server is on port 3001");
});

//-----------------Socket.io----------------//

io.on('connection', function(socket){

    socket.on('cmd', function(cmd){
      //
 		console.log(cmd);
    });
  
});

