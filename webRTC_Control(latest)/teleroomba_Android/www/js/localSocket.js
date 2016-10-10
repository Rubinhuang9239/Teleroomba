var socket = io.connect("http://localhost:3000");

var localSocket = {}

localSocket.sendCmd = function(type,cmd){

	socket.emit(type, cmd);

}
