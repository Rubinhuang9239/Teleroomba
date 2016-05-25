// identity.js
//I am mobile

var identity = {
	device : "web",
	role : "control",
	target : "roomba"
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

logMessage("Peer","-----------------------");
logMessage("Peer","My ID: " + identity.role);
logMessage("Peer","Roomba ID: " + identity.target);
logMessage("Peer","Peer ID auto input:");
logMessage("Peer","-----------------------");


setTimeout(function(){
	document.getElementById('connect').click();
	setTimeout(function(){
	document.getElementById('dial').click();
	//animate.changeDropDownStatus();
	drag.init();
	},400);
},360);


}