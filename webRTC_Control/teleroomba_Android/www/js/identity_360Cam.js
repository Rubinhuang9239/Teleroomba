// identity.js
//I am thetaS

var identity = {
	device : {
				label : "thetaS Camera",
				name : ["RICOH"]//choose from devices
			},
	role : "thetaS",
	target : "360view",
	video : {optional:[ {minHeight:1920}, {minWidth:1080}, {googCpuOveruseDetection:false} ]},
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
		},400);
	},800);


}