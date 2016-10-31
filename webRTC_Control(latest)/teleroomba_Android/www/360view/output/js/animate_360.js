var animate = {};

animate.init = function(){

	animate.stitchHelperPanel = document.getElementById("stitchHelper");

	stitchBtn = document.getElementById("stitch");
	stitchBtn.addEventListener("click",function(){
		animate.stitchHelpStatus("open");
		HUDSystem.stitchMode();
	});

	var stitchHelpClose = document.getElementById("stitchHelpClose");
	stitchHelpClose.addEventListener("click",function(){
		animate.stitchHelpStatus("close");
		HUDSystem.resetCameraAngle();
	});

	var resetCam = document.getElementById("resetCam");
	resetCam.addEventListener("click",function(){
		HUDSystem.resetCameraAngle();
	});


	var elem = document.getElementsByClassName('js-switch');
	for(i=0; i< elem.length; i++ ){
		var init = new Switchery(elem[i],
		{
			color             : '#00EE88',
			secondaryColor    : '#666',
			size              : 'small'
		});


	}


	$('.js-switch').change(function(e){

		e.target.attributes.checked = !e.target.attributes.checked;

		settingDB[e.target.attributes.key.value] = e.target.attributes.checked;

		console.log(e.target.attributes.key.value , e.target.attributes.checked);

		if(e.target.attributes.key.value == "headset" && e.target.attributes.checked == false){
			resizeScene();
		}

	});



}

animate.stitchHelpStatus = function(status){

	if(status == "close"){
		animate.stitchHelperPanel .style.transform = "translateX(-120%)";
	}
	else if(status == "open"){
		animate.stitchHelperPanel .style.transform = "translateX(0%)";
	}

}
