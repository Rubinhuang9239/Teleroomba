var socket = io.connect("http://127.0.0.1:3000");

function sendCmd(type,cmd){

	socket.emit(type, cmd);

}
