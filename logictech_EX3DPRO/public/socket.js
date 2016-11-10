var socket = io("http://localhost:3000");

socket.on("data",function(data){
	EX3D.calcuDrive(data.r, data.p);
});

