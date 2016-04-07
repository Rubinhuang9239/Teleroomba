//socket
var socket = io.connect("http://45.55.168.221:3002");

var currentleftV = 0;
var currentrightV =0;

var latestleftV = 0;
var latestrightV = 0;

socket.on("cmdToRobot",function(cmd){

	//console.log(cmd.leftV + "  " + cmd.rightV);
	currentleftV = cmd.leftV + 50;
	currentrightV = cmd.rightV + 160;
	//app.sendData([0x00+cmd.leftV]);

});

setInterval(
function(){
	if(latestleftV != currentleftV){
		latestleftV = currentleftV;
		app.sendData([0x00+latestleftV]);
	}
	if(latestrightV != currentrightV){
		latestrightV = currentrightV;
		app.sendData([0x00+latestrightV]);
	}
}
,32);