// identity.js
//I am Front Camera

var identity = {
	device : "GoPro Camera",
	role : "frontCam",
	target : "control2",
	video : {optional:[ {minHeight:1920}, {minWidth:1080} ]},
	audio : false
}


window.addEventListener("load",function(){
	animate.init();
	setTimeout(
		function(){
			identity.replacePeerId();
		},1000);
});

identity.replacePeerId = function(){

	var callerIdEntry = document.querySelector('#caller-id');
	callerIdEntry.value = identity.role;

	var recipientIdEntry = document.querySelector('#recipient-id');
	recipientIdEntry.value = identity.target;

	webConsole.logMessage("Peer","-----------------------");
	webConsole.logMessage("Peer","My ID: " + identity.role);
	webConsole.logMessage("Peer","Roomba ID: " + identity.target);
	webConsole.logMessage("Peer","Peer ID auto input:");
	webConsole.logMessage("Peer","-----------------------");


	setTimeout(function(){
		document.getElementById('connect').click();
		setTimeout(function(){
			//document.getElementById('dial').click();
			drag.init();
			mediaPlayer.init({type:"audio"});
		},400);
	},800);


}