var socket = io("https://localserial.itp.io:3001");

socket.on("data",function(data){
	EX3D.calcuDrive(data.r, data.p);
});

