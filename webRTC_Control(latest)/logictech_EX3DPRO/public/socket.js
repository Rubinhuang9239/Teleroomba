var socket = io("https://localserial.itp.io:3000");

socket.on("data",function(data){
	EX3D.calcuDrive(data.r, data.p);
});

