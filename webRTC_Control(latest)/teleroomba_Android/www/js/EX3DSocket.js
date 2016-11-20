var socket = io("https://localserial.itp.io:3001");

socket.on("DR",function(data){
	EX3D.calcuDrive(data.r, data.p);
});

socket.on("AC",function(data){
	EX3D.calcuAction(data.th);
});

