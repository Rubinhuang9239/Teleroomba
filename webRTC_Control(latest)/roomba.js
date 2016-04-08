var ip = require('ip');
var peerPort = 8888;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var servicePort = 8000;

app.use(express.static('teleroomba/www'));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/app', function(req, res){
  res.sendfile('index_app.html');
});

http.listen(servicePort, function(){
    console.log("");
    console.log("---------------| Roomba |-----------------");
    console.log("");
    console.log("Service server open on "+ ip.address() + ":" + servicePort);
});


var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: peerPort, allow_discovery: true});

server.on('connection', function (id) {
  console.log('new connection with id ' + id);
});

server.on('disconnect', function (id) {
  console.log('disconnect with id ' + id);
});

console.log("");
console.log("----------------| Peer |------------------");
console.log("");
console.log('peer server running on ' + ip.address() + ':' + peerPort);
