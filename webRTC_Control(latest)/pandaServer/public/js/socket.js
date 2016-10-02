var socket = io.connect();

function sendCmd(cmd){
socket.emit("drive", cmd);
}
