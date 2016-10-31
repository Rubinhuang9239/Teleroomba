var animate = {};

animate.init = function(){

	animate.settingPanel = document.getElementById("sphereViewSetting");
	animate.stitchHelperPanel = document.getElementById("stitchHelper");

	settingBnt = document.getElementById("setting");
	settingBnt.addEventListener("click",function(){
		animate.settingPanelStatus("open");
	});

	stitchBtn = document.getElementById("stitch");
	stitchBtn.addEventListener("click",function(){
		animate.stitchHelpStatus("open");
		HUDSystem.stitchMode();
	});

	var settingClose = document.getElementById("settingClose");
	settingClose.addEventListener("click",function(){
		animate.settingPanelStatus("close");
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


animate.settingPanelStatus = function(status){

	if(status == "close"){
		animate.settingPanel.style.transform = "translateX(100%)";
	}
	else if(status == "open"){
		animate.settingPanel.style.transform = "translateX(0%)";
	}

}

animate.stitchHelpStatus = function(status){

	if(status == "close"){
		animate.stitchHelperPanel .style.transform = "translateX(-120%)";
	}
	else if(status == "open"){
		animate.stitchHelperPanel .style.transform = "translateX(0%)";
	}

}

animate.loadSettingDetail = function(content, lable){

	var detailName = document.getElementById("detailName");
	detailName.innerHTML = lable;

	var settingDetail = document.getElementById("settingDetail");
	settingDetail.style.transform = "translateX(0%)";

	animate.clearSettingDetail();

	var source = document.getElementById(content);
	source.style.display = "block";


}

animate.clearSettingDetail = function(){
	var dynamicContentList = document.getElementsByClassName("dynamicContent");
	for(i=0; i < dynamicContentList.length; i++){
		dynamicContentList[i].style.display = "none";
	}

}

animate.foldBeepBox = function(status){
	if(status == true){
		beepTypesBox = document.getElementById("beepTypesBox");
		beepTypesBox.style.height = "45px";
		beepTypesBox.style.backgroundColor = "transparent";
	}
	else if(status == false){
		beepTypesBox = document.getElementById("beepTypesBox");
		beepTypesBox.style.height = "0px";
		beepTypesBox.style.backgroundColor = "#444";

		document.getElementById('beep1').style.backgroundColor = "transparent";
		document.getElementById('beep2').style.backgroundColor = "transparent";

		animate.beepStatus = {
			beep1:false,
			beep2:false,
		};
		//send stop//

		var cmd = {
			type:"BP",
			act:2,
			tp:0
		};

		WebRTCDataMethold.sendData(cmd);
	}
}

animate.removeSettingDetail = function(){
	animate.clearSettingDetail();
	var settingDetail = document.getElementById("settingDetail");
	settingDetail.style.transform = "translateX(103%)";
}

animate.speedCalcu = function(speedInputL,speedInputR,offLine){

	if( offLine > 0 ){
		if(offLine == 1){
			animate.speedDisplay.innerHTML = "<span style='font-size:24px'>X WebRTC</span>";
		}
		else if( offLine == 2){
			animate.speedDisplay.innerHTML = "<span style='font-size:24px'>X BLE</span>";
		}

		return false;
	}

	speedInput = (speedInputL+speedInputR) * 0.5;
	animate.speedDisplay.innerHTML = ((speedInput / 50) * 1.125).toPrecision(3);
}

animate.loadPlayList = function(mediaList){

	var mediaListPanel = document.getElementById("mediaListPanel");
	mediaListPanel.innerHTML = "<ul></ul>";

	for(i=0; i < mediaList.length; i++){
		mediaListPanel.innerHTML += "<li class='mediaLink' listPos='" + i + "'>" + mediaList[i] + "</li>";
	}

	$(".mediaLink").click(function(e){
		var cmd = {
			type : "MD",
			key : e.target.attributes.listPos.value
		}
		WebRTCDataMethold.sendData(cmd);
	});
	
}
