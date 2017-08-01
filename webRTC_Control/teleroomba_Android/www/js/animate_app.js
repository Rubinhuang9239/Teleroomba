animate = {};

animate.init = function(){

var remoteVideo = document.getElementById('remote-video');
// remoteVideo.addEventListener("click",function(){
//	setTimeout(function(){
// 	animate.sideMenuStatusTo("hide");
//	},1000);
// });

}

animate.sideMenuStatus = "show";

animate.sideMenuStatusTo = function(state){

var sideMenu = document.getElementById('manualMenu');
animate.sideMenuStatus = state;

if(state == "hide"){
	sideMenu.style.transform = "translateX(-100%)";
}
else if( state == "show" ){
	sideMenu.style.transform = "translateX(0%)";
}

}

animate.teleRubin = {};

animate.teleRubin.init = function(){
	var teleRubinLayer = document.getElementById("teleRubinLayer");
	if(!teleRubinLayer){
		teleRubinLayer = document.createElement("div"); 
		teleRubinLayer.id = "teleRubinLayer";
		
		teleRubinLayer.innerHTML = "<div id='teleRubinEyes'></div>"
		
		document.body.appendChild(teleRubinLayer);
		document.getElementById("remote-video").style.display = "none";
		document.getElementById("local-video").style.display = "none";
		
		teleRubinLayer.style.display = "block";
		setTimeout(function(){
			animate.teleRubin.eyes = document.getElementById("teleRubinEyes");
			teleRubinLayer.style.opacity = "1";
		}, 200)
	}
	animate.teleRubin.drift = {
		x:0,
		y:0,
	}
}

animate.teleRubin.gaze = function(x,y){

	//0-180, 127-180//
	animate.teleRubin.drift.x += Math.round( ((x - 90)/90 * 100 - animate.teleRubin.drift.x )* 0.2);
	animate.teleRubin.drift.y += Math.round( ((y - 90)/90 * 100  - animate.teleRubin.drift.y )* 0.2);

	animate.teleRubin.eyes.style.transform = "translateX(" + (-1 * animate.teleRubin.drift.x) + "px) translateY(" + (-1 * animate.teleRubin.drift.y) + "px)";

}