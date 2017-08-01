	
	
var socketCon = {};

socketCon.init = function(SERVER_IP){


	var socket = io.connect("http://" +  SERVER_IP + ":" + "8000");

	setInterval(function(){

			socket.emit("imageData", downGrade.data);

	},60);

	socket.on("answer", function(answer){

		console.log(answer);
			
	});

}