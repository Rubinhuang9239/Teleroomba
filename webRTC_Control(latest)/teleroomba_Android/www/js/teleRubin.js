//teleRubin.js

animate.teleRubin.eyes = document.getElementById("teleRubinEyes");

animate.teleRubin.gaze = function(x,y){

	//0-180, 127-180//
	var drift = {
		x: Math.round((x - 90)/90 * 80) ,
		y:
	}

	animate.teleRubin.eyes.style.transform = "translateX(" + drift.x + "%) translateY(" + drift.y + "%)";

}