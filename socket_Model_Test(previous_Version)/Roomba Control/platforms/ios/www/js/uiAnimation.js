//UI_Animations

var loadingBoxTop,
	loadingBox,loadingBox2,
	loadingBoxBottom,
	loadingBoxBase,
	taskBox,
	naviSignLeft,
	naviSignRight,
	RHandleButtonSign;

//Panels

var detectionModePanel;
//var BLEConnection = false;

function aniElementsInit(){
	loadingBoxTop = document.getElementById('loadingBoxTop');
	loadingBox = document.getElementById('loadingBox');
	loadingBox2 = document.getElementById('loadingBox2');
	loadingBoxBottom = document.getElementById('loadingBoxBottom');
	loadingBoxBase = document.getElementById('loadingBoxBase');

	loadingBoxBottom.style.opacity = "1";
	loadingBoxBase.style.opacity = "1";
	loadingBoxBottom.style.webkitTransform = "scale(1)";
	loadingBoxBase.style.webkitTransform = "scale(1)";

	loadingPanel("show");

	detectionModePanel = document.getElementById('detectionMode');

	RHandleButtonSign = document.getElementById('RHandleButton');


}

function autoLoadingAni(status){

	if( status == "done"){

	loadingBoxTop.style.opacity = 0;
	loadingBoxTop.style.webkitTransform = "scale(1)";
	loadingBox.style.webkitTransform = "rotateZ(-45deg)";
	loadingBox2.style.webkitTransform = "rotateZ(-45deg)";
	loadingBox.style.opacity = 0;
	loadingBox2.style.opacity = 1;
	loadingBoxBottom.style.opacity = 0;

	}
	else if( status == "fall"){

	loadingBoxTop.style.opacity = 1;
	loadingBoxTop.style.webkitTransform = "scale(0)";
	loadingBox.style.webkitTransform = "rotateZ(0deg)";
	loadingBox2.style.webkitTransform = "rotateZ(0deg)";
	loadingBox.style.opacity = 1;
	loadingBox2.style.opacity = 0;
	loadingBoxBottom.style.opacity = 1;

	}
	
}

function loadingPanel(status){
	var loadingPanel = document.getElementById('loadingPanel');

	if(status == 'hide' ){
	loadingPanel.style.opacity = 0;
	loadingPanel.style.webkitFilter = "blur(30px)";
	loadingPanel.style.top = "100%";
	loadingPanel.style.webkitTransform = "scale(1.25)";

	}
	else if(status == 'show'){
	var loadingTitle = document.getElementById('loadingTitle');
	loadingTitle.style.opacity = "1";
	loadingPanel.style.display = "block";
	loadingPanel.style.opacity = 1;
	loadingPanel.style.webkitFilter = "none";
	loadingPanel.style.backgroundColor="rgba(0,0,0,0.72)";
	loadingPanel.style.top = "0%";
	loadingPanel.style.webkitTransform = "scale(1)";
	}

	else if(status == "discon"){

	//loadingPanel.style.visibility='hidden';
	loadingPanel.style.opacity = 0;
	loadingPanel.style.webkitFilter = "blur(30px)";
	loadingPanel.style.top = "100%";
	loadingPanel.style.webkitTransform = "scale(1.25)";
	speakOut.innerHTML = 'You are using disconnected!';

	setTimeout(function(){
		detectionModePanel.style.opacity = "1";
	},0);

	setTimeout(function(){
		var recallBLE = document.getElementById('recallBLE');

		if(recallBLE == null){

			var newdiv = document.createElement("div");
			newdiv.id = "recallBLE";
			detectionMode.appendChild(newdiv);
			newdiv.innerHTML = "Reconnect With My Walker";
			newdiv.addEventListener('click',function(){
			BLEOffMode = false;
			Reconnecting = false;
			app.startScan();
			newdiv.innerHTML = 'Request for Reconnection';
			newdiv.style.backgroundColor = 'rgba(255,220,0,0.5)';
			setTimeout(function(){
				newdiv.style.display = 'none';
				newdiv.style.backgroundColor = 'rgba(45,175,255,0.75)';
				speakOut.innerHTML = 'Handle Reconnection...'
			},2500);

		});
		}
		else{
			recallBLE.style.display = 'block';
		}

	},3000);

	settingSlider.style.zIndex = "150";
	settingConfirm.style.zIndex = "150";

	BLEOffMode = true;
	//console.log('callBack');

	}

}


//--------Developers--------//

var devtool = document.getElementById('developerTool');
devtool.addEventListener('click',function(){

	developer = document.getElementById('developer');

	if(developer.style.bottom == "0px"){
		developer.style.bottom = "-110px";
	}else{
		developer.style.bottom = "0px";
	}

});