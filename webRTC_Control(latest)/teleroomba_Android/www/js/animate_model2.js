var animate = {};

animate.settingOn = false;

animate.speedDisplay = null;

animate.init = function(){

	settingBnt = document.getElementById("setting");
	settingBnt.addEventListener("click",function(){
		animate.settingPanelStatus();
	});

	var mainFrame = document.getElementById("mainFrame");

	window.addEventListener("resize",function(){
		mainFrame.style.transitionProperty = "transform";
		mainFrame.style.transitionDuration ="transition-duration: 0.3s";
		if( document.getElementById("Body").offsetWidth >= 768){
			mainFrame.style.transform = "translateY(0%)";
			mainFrame.style.height = "144%";
			mainFrame.style.width = "134%";
		}
		else{
			mainFrame.style.height = "100%";
			mainFrame.style.width = "100%";
		}
		animate.settingOn = false;
	});

	var settingClose = document.getElementById("settingClose");
	settingClose.addEventListener("click",function(){
		animate.settingPanelStatus("close");
	});

	var settingDetailClose = document.getElementById("settingDetailClose");
	settingDetailClose.addEventListener("click",function(){
		animate.removeSettingDetail();
	});

	var mediaControl = document.getElementById("mediaControl");
	mediaControl.addEventListener("click",function(){

		var cmd = {
			type : "MD",
			key : "load"
		}

		WebRTCDataMethold.sendData(cmd);

		animate.loadSettingDetail("MediaBox", "Media Playlist");
	});

	var rebootRoomba = document.getElementById("rebootRoomba");
	rebootRoomba.addEventListener("click",function(){
		var cmd = {
			type:"SM"
		};
		WebRTCDataMethold.sendData(cmd);
	});
	
	var cameraHeight = document.getElementById("cameraHeight");
	cameraHeight.addEventListener("click",function(){
		animate.loadSettingDetail("PersSettingBox", "Camera Height");
	});

	var aboutTele = document.getElementById("aboutTeleroomba");
	aboutTele.addEventListener("click",function(){
		animate.loadSettingDetail("aboutContent", "About");
	});

	animate.speedDisplay = document.getElementById("speedVal");



		var beep1 = document.getElementById('beep1');
		var beep2 = document.getElementById('beep2');

		beep1.addEventListener("click",function(){
			if( animate.beepStatus.beep1 ){
				beep1.style.backgroundColor = "transparent";
				animate.beepStatus.beep1 = false;
				//220
					var cmd = {
								type:"BP",
								act:2,
								tp:0
							  };
			}else{
				beep1.style.backgroundColor = "#FF9900";
				animate.beepStatus.beep1 = true;
				beep2.style.backgroundColor = "transparent";
				animate.beepStatus.beep2 = false;
				//211
					var cmd = {
								type:"BP",
								act:1,
								tp:1
							  };
			}

			WebRTCDataMethold.sendData(cmd);
		});

		beep2.addEventListener("click",function(){
			if( animate.beepStatus.beep2 ){
				beep2.style.backgroundColor = "transparent";
				animate.beepStatus.beep2 = false;
				//220
					var cmd = {
								type:"BP",
								act:2,
								tp:0
							  };

			}else{
				beep2.style.backgroundColor = "#FF9900";
				animate.beepStatus.beep2 = true;
				beep1.style.backgroundColor = "transparent";
				animate.beepStatus.beep1 = false;
				//212
					var cmd = {
								type:"BP",
								act:1,
								tp:2
							  };
			}

			WebRTCDataMethold.sendData(cmd);
		});

}

animate.beepStatus = {
		beep1:false,
		beep2:false,
};

animate.settingPanelStatus = function(status){

	var mainFrame = document.getElementById("mainFrame");
	mainFrame.style.transitionProperty = "width, height, transform";
	mainFrame.style.transitionDuration ="transition-duration: 0.6s";

	if(status == "close"){
		animate.settingOn == true;
	}
	else if(status == "open"){
		animate.settingOn == false;
	}

	if( document.getElementById("Body").offsetWidth >= 768){
		if(animate.settingOn == false){
			mainFrame.style.height = "100%";
			mainFrame.style.width = "100%";
		}
		else if(animate.settingOn == true){
			mainFrame.style.height = "144%";
			mainFrame.style.width = "134%";
		}
	}else{
		if(animate.settingOn == false){
			mainFrame.style.transform = "translateY(-100%)";
		}
		else if(animate.settingOn == true){
			mainFrame.style.transform = "translateY(0%)";
		}
	}

	animate.settingOn = !animate.settingOn;

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
	mediaListPanel.innerHTML = "<ol></ol>";

	for(i=0; i < mediaList.length; i++){
		mediaListPanel.innerHTML += "<li class='mediaLink' listPos='" + i + "'>" + mediaList[i] + "</li>";
	}

	$(".mediaLink").click(function(e){
		WebRTCDataMethold.sendData("MD", e.target.attributes.listPos.value );
	});
	
}
