var ip = require('ip');
var peerPort = 8888;

//HTTPS
//var httpsPeerPort = 8001;

var servicePort = 8000;
var express = require('express');
var app = express();


//--------------http-----------------------//
var http = require('http').Server(app);

http.listen(servicePort, function(){
    console.log("");
    console.log("---------------| Roomba |-----------------");
    console.log("");
    console.log("Service server open on "+ ip.address() + ":" + servicePort);
});



//--------------https-----------------------//

// var https = require('https');
// var fs = require('fs');

// var options = {
//   key: fs.readFileSync('my-key.pem'),
//   cert: fs.readFileSync('my-cert.pem')
// };

//  var httpServer = https.createServer(options,app);
//  httpServer.listen(servicePort,function(){

//    console.log("");
//    console.log("---------------| Roomba |-----------------");
//    console.log("");
//    console.log("Service server open on "+ ip.address() + ":" + servicePort);

//  });







//-------------Express----------------------//

app.use(express.static('teleroomba_Android/www'));

app.get('/', function(req, res){
  res.sendfile('index_web.html');
});

var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: peerPort, allow_discovery: true});
//HTTPS
//var server = new PeerServer({port: httpsPeerPort, ssl: options, allow_discovery: true});


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
//HTTPS
//console.log('peer server running on ' + ip.address() + ':' + httpsPeerPort);




//Machine Learning??

//Test on Wekinator

//---------OSC + Socket.io----------//


// var osc = require('osc');
// var io = require('socket.io')(https);

// io.on('connection', function(socket){

//   //console.log("socket connected" + socket.id);

//   socket.on('imageData', function(data){

//   	//console.log(data);
//   	UDPSend(data);

//   });

//   socket.on('disconnect', function(e){
//   	console.log("socket disconnected");
//   });

// });

// var udpPort = new osc.UDPPort({
// 	localAddress : "127.0.0.1",
// 	localPort : 12000
// });

// udpPort.open();
// console.log("osc_udp open!");


// function UDPSend(data){

// 	udpPort.send({
// 		address : "/wek/inputs",

// 		args:data

// 	},"127.0.0.1", 6448);

// }

// udpPort.on("message",function(oscMessage){

// 	//console.log(oscMessage);

// 	io.emit( "answer", oscMessage );

// });




