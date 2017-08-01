var socket = io("https://localSerial.itp.io:3000");

function sendCmd(type,cmd){

	socket.emit(type, cmd);

}
