var socket = io.connect();

function sendCmd(type,cmd){

	socket.emit(type, cmd);

}
