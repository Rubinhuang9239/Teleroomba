var socket = io.connect("http://45.55.168.221:3002");

function sendCmd(cmd){
socket.emit("cmd", cmd);
}
