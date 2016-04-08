// identity.js
//I am mobile

var identity = {
	device : "android",
	role : "roomba",
}


window.addEventListener("load",function(){
identity.replacePeerId();
//animate.init();
drag.init();
});

identity.replacePeerId = function(){

var callerIdEntry = document.querySelector('#caller-id');
callerIdEntry.value = identity.role;

setTimeout(function(){
	$('#connect').click();
},320);

}