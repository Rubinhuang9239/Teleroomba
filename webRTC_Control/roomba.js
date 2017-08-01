var ip = require('ip');
//var peerPort = 8888;

//HTTPS
var httpsPeerPort = 8001;

var servicePort = 8000;
var servicePortHTTP = 8002;
var express = require('express');
var app = express();


//--------------http-----------------------//

var http = require('http').Server(app);

http.listen(servicePortHTTP, function(){
    console.log("");
    console.log("---------------| Roomba |-----------------");
    console.log("");
    console.log("HTTP Service server open on "+ ip.address() + ":" + servicePortHTTP);
});




//--------------https-----------------------//

var https = require('https');
var fs = require('fs');

var options = {
   key: fs.readFileSync('my-key.pem'),
   cert: fs.readFileSync('my-cert.pem'),
   requestCert: false,
   rejectUnauthorized: false
 };

  var httpServer = https.createServer(options,app);
  httpServer.listen(servicePort,function(){

    console.log("");
    console.log("---------------| Roomba |-----------------");
    console.log("");
    console.log("HTTPS Service server open on "+ ip.address() + ":" + servicePort);

 });
 

  io = require('socket.io')(httpServer);


  io.on('connection', function (socket) {
  console.log( "socket opened via socket " + socket.id);


  });







//-------------Express----------------------//

app.use(express.static('teleroomba_Android/www'));

app.get('/', function(req, res){
  res.sendfile('teleroomba_Android/www/index.html');
});

app.get('/role', function(req, res){
  res.sendfile('teleroomba_Android/www/route.html');
});

app.get('/360Cam', function(req, res){
  res.sendfile('teleroomba_Android/www/360Cam.html');
});


app.get('/frontCam', function(req, res){
  res.sendfile('teleroomba_Android/www/frontCam.html');
});

app.get('/360', function(req, res){
  res.sendfile('teleroomba_Android/www/360view/index.html');
});

app.get('/test', function(req, res){
  res.sendfile('teleroomba_Android/www/360view/index1.html');
});

app.get('/control2', function(req, res){
  res.sendfile('teleroomba_Android/www/control_model2.html');
});



//-------------Peer.js---------------------//

var PeerServer = require('peer').PeerServer;
//var server = new PeerServer({port: peerPort, allow_discovery: true});
//HTTPS
var server = new PeerServer({port: httpsPeerPort, ssl: options, allow_discovery: true});


server.on('connection', function (id) {
  console.log('new connection with id ' + id);
});

server.on('disconnect', function (id) {
  console.log('disconnect with id ' + id);
});

console.log("");
console.log("----------------| Peer |------------------");
console.log("");
//console.log('peer server running on ' + ip.address() + ':' + peerPort);
//HTTPS
console.log('peer server running on ' + ip.address() + ':' + httpsPeerPort);




//Machine Learning??

//Test on Wekinator

//---------OSC + Socket.io----------//


// var osc = require('osc');
//var io = require('socket.io')(http);

//io.on('connection', function(socket){

//console.log("socket connected" + socket.id);

//   socket.on('imageData', function(data){

//   	//console.log(data);
//   	UDPSend(data);

//   });

//   socket.on('disconnect', function(e){
//   	console.log("socket disconnected");
//   });

//});

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




