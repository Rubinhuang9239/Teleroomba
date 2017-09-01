//------Keyboard_Control---------//

keyBoard = {};

keyBoard.keydownList = {
						"37":false,
						"38":false,
						"39":false,
						"40":false,
					   };
					   
/*
keyBoard.rollPitchVal = {
	roll : 90,
	pitch : 128,
	rollSlider : null,
	pitchSlider : null,
}
*/

window.addEventListener("load",function(){keyBoard.init()});

keyBoard.init = function(){
	window.addEventListener("keydown",keyBoard.Input);
	window.addEventListener("keyup",keyBoard.InputFinish);
	//keyBoard.initRPSlider();
}

/*
keyBoard.initRPSlider = function(){
	keyBoard.rollPitchVal.rollSlider = document.getElementById("FCRollSlider");
	keyBoard.rollPitchVal.pitchSlider = document.getElementById("FCPitchSlider");
	
	keyBoard.rollPitchVal.rollSlider.addEventListener("input", function(){
		keyBoard.rollPitchVal.roll = Number(keyBoard.rollPitchVal.rollSlider.value);
		var frontCam = {
						type:"FC",
						r : keyBoard.rollPitchVal.roll,
						p : keyBoard.rollPitchVal.pitch
					}
		WebRTCDataMethold.sendData(frontCam);
	});
	
	keyBoard.rollPitchVal.pitchSlider.addEventListener("input", function(){
		keyBoard.rollPitchVal.pitch = Number(keyBoard.rollPitchVal.pitchSlider.value);
		var frontCam = {
						type:"FC",
						r : keyBoard.rollPitchVal.roll,
						p : keyBoard.rollPitchVal.pitch
					}
		WebRTCDataMethold.sendData(frontCam);
	});
}
*/

keyBoard.Input = function(event) {
	//console.log(event);
	
/*
	if( Number(event.which) > 40 ){
		
		//control the top camera//
		keyBoard.rollPitch(event.which);
			
	}else{
*/
    	var key = event.which;
    	keyBoard.keydownList[key] = true;
    	keyBoard.drive();
//     }
}

keyBoard.InputFinish = function(event) {
	//console.log("up");
    var key = event.which;
    keyBoard.keydownList[key] = false;

    keyBoard.checkEmpty();
    keyBoard.drive();
}

keyBoard.checkEmpty = function(){

	var emptyCount = 0;

	for(key in keyBoard.keydownList){
		emptyCount += keyBoard.keydownList[key];
	}

	//if empty, keyBoard.drive(0);
	// if( emptyCount == 0 ){
	// 	keyBoard.drive(0);
	// }

}


keyBoard.rollPitch = function(keycode){
	return;
/*
	var frontCam = {
						type:"FC",
						r : keyBoard.rollPitchVal.roll,
						p : keyBoard.rollPitchVal.pitch
					}
	
	function changePitch(delta){
		if( keyBoard.rollPitchVal.pitch <= 180 && keyBoard.rollPitchVal.pitch >= 80 ){
			keyBoard.rollPitchVal.pitch += delta; 
		}
		
		if(keyBoard.rollPitchVal.pitch > 180){
			keyBoard.rollPitchVal.pitch = 180;
		}else if(keyBoard.rollPitchVal.pitch < 80){
			keyBoard.rollPitchVal.pitch = 80;
		}
		frontCam.p = keyBoard.rollPitchVal.pitch;
		
		keyBoard.rollPitchVal.pitchSlider.value = keyBoard.rollPitchVal.pitch;

		WebRTCDataMethold.sendData(frontCam);
	}
	
	function changeRoll(delta){
		if( keyBoard.rollPitchVal.roll >= 0 && keyBoard.rollPitchVal.roll <= 180 ){
			keyBoard.rollPitchVal.roll += delta; 
		}
		
		if(keyBoard.rollPitchVal.roll > 180){
			keyBoard.rollPitchVal.roll = 180;
		}else if(keyBoard.rollPitchVal.roll < 0){
			keyBoard.rollPitchVal.roll = 0;
		}
		frontCam.r = keyBoard.rollPitchVal.roll;
		
		keyBoard.rollPitchVal.rollSlider.value = keyBoard.rollPitchVal.roll;
		
		WebRTCDataMethold.sendData(frontCam);
	}
	
	if(keycode == 87){ //w
		changePitch(1);
	}
	else if(keycode == 83){ //s
		changePitch(-1);
	}
	else if(keycode == 65){ //a
		changeRoll(-1);
	}
	else if(keycode == 68){ //d
		changeRoll(1);
	}
*/
	
}

keyBoard.drive = function(empty){
	var msg = "o";

	var cmd = { lV : 0, rV : 0 };

	if(empty == 0){
		//stop//
		msg = "o";
		cmd = { lV : 0, rV : 0 };
	}
	else{
		//^/v
		if( keyBoard.keydownList["38"] +  keyBoard.keydownList["40"] == 1 ){

			if(keyBoard.keydownList["38"] == true ){

				//single ^
			msg = "^";
			cmd = { lV : 30, rV : 30 };

				//+L or +R
				if((keyBoard.keydownList["37"]+keyBoard.keydownList["39"]) == 1){
					//+L
					if( keyBoard.keydownList["37"] == true ){
						msg = "<^";
						cmd = { lV : 20, rV : 30 };
					}
					//+R
					else if(keyBoard.keydownList["39"] == true){
						msg = "^>";
						cmd = { lV : 30, rV : 20 };
					}
				}
			}

			if(keyBoard.keydownList["40"] == true ){

				//single v
			msg = "v";
			cmd = { lV : -20, rV : -20 };

				//+L or +R
				if((keyBoard.keydownList["37"]+keyBoard.keydownList["39"]) == 1){
					//+L
					if( keyBoard.keydownList["37"] == true ){
						var msg = "<v";
						cmd = { lV : -20, rV : -30 };
					}
					//+R
					else if(keyBoard.keydownList["39"] == true){
						var msg = "v>";
						cmd = { lV : -30, rV : -20 };
					}
				}
			}
		}

		//</>
		else if( keyBoard.keydownList["37"] +  keyBoard.keydownList["39"] == 1 ){
			//+L
					if( keyBoard.keydownList["37"] == true ){
						var msg = "<";
						cmd = { lV : -24, rV : 24 };
					}
					//+R
					else if(keyBoard.keydownList["39"] == true){
						var msg = ">";
						cmd = { lV : 24, rV : -24 };
					}
		}

	}
	//console.log(msg, cmd);

	//Send to Phone
	cmd.type = "DR";
	WebRTCDataMethold.sendData(cmd);

}