	
	
var socketCon = {};

socketCon.socket = null;

socketCon.init = function(){

	// var socket = io.connect("http://" +  SERVER_IP + ":" + "8000");
	socketCon.socket = io.connect("localhost:" + "3000");

	//console.log(socketCon.socket);
	// setInterval(function(){
	// 	socketCon.serialSend("drive",[120,50]);
	// },100);

}

socketCon.serialSend = function( type, data){

	socketCon.socket.emit(type, data);

}