var animate = {};

animate.init = function(){
	foldSwitch = document.getElementById("foldSwitch");
	foldSwitch.addEventListener("click",function(){
		animate.changeDropDownStatus();
	});

	BLEStatus = document.getElementById("BLEStatus");
	BLEStatus.addEventListener("click",function(){

		if(WebRTCDataMethold.connected){
			logMessage("BLE", "Start BLE Scan");
			this.attributes.class.value = "BLEBlinking";

			var BLEMacro = {
				type : "BLE",
				message : "conn"
			}

			WebRTCDataMethold.sendData( BLEMacro );
		}else{

			logMessage("Error", "Can't Start BLE Scan before WebRTC is ready!");

		}

	});
}

animate.dropDownStatus = "hide"

animate.changeDropDownStatus = function(){

	var dropDown = document.getElementById('credentials');
	var foldSwitch = document.getElementById("foldSwitch");

	if(animate.dropDownStatus == "show"){
		dropDown.style.transform = "translateY(-100%)";
		foldSwitch.style.opacity = "0.32";
		animate.dropDownStatus = "hide";
	}
	else if(animate.dropDownStatus == "hide"){
		dropDown.style.transform = "translateY(0%)";
		foldSwitch.style.opacity = "0.72";
		animate.dropDownStatus = "show";
	}

}