animate = {};

animate.init = function(){

var remoteVideo = document.getElementById('remote-video');
// remoteVideo.addEventListener("click",function(){
//	setTimeout(function(){
// 	animate.sideMenuStatusTo("hide");
//	},1000);
// });

}

animate.sideMenuStatus = "hide";

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