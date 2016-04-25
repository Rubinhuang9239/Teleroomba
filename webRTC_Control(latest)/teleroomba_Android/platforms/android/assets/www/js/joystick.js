
	console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

	var cmd = {
		lV : 0,
		rV : 0
	}

	// 
	var joystickRight = new VirtualJoystick({
		container	: document.getElementById("touchLayer"),
		func: "drive",
		strokeStyle	: 'rgba(255,255,255,0.25)',
		mouseSupport	: true,
		limitStickTravel: true,	
		stickRadius: 50
	});
	joystickRight.addEventListener('mouseMove', function(event){
		if(joystickRight.deltaX()+joystickRight.deltaY() != 0){
			calcuDrive();
		}
	});
	joystickRight.addEventListener('touchMove', function(event){
		if(joystickRight.deltaX()+joystickRight.deltaY() != 0){
			calcuDrive();
		}
	});
	joystickRight.addEventListener('mouseUp', function(event){
		sendBrake();
	});
	joystickRight.addEventListener('touchEnd', function(event){
		sendBrake();
	});

	function calcuDrive(){

		//var speedY = 0-joystickRight.deltaY();
		speedVector = Math.sqrt(Math.pow(joystickRight.deltaX(),2)+
						Math.pow(joystickRight.deltaY(),2));
		arcTanValue = (Math.atan(joystickRight.deltaX()/(0-joystickRight.deltaY()))/(12*Math.PI));
		arcCotValue = (Math.atan((0-joystickRight.deltaY())/joystickRight.deltaX())/(12*Math.PI));
		turningSpeed = Math.round(50*(speedVector/50)*1.1);
		turningSpeedBack = Math.round(50*(speedVector/50)*1.25);
		if(turningSpeed>=50){
			turningSpeed=50;
		}
		if(turningSpeedBack>=50){
			turningSpeedBack=50;
		}
		//console.log(arcTanValue);

		if(0-joystickRight.deltaY()>=0){
			if(joystickRight.deltaX()<=0){
			cmd.lV = Math.round((speedVector*arcTanValue + (0-joystickRight.deltaY()))*1.1);
			if(cmd.lV>=50){cmd.lV = 50}
			cmd.rV = turningSpeed;
			}
			else if(joystickRight.deltaX()> 0){
			cmd.lV = turningSpeed;
			cmd.rV = Math.round(-1*(speedVector*arcTanValue) + (0-joystickRight.deltaY())*1.1);
			if(cmd.rV>=50){cmd.rV = 50};
			}
		}
		else if(0-joystickRight.deltaY()<=0){
			if(joystickRight.deltaX()>=40){
			cmd.lV = turningSpeedBack;
			cmd.rV = Math.round((speedVector*arcTanValue + (0-joystickRight.deltaY())*1.25));
			if(cmd.rV<=-50){cmd.rV = -50}
			}
			else if(joystickRight.deltaX()< -40){
			cmd.lV = Math.round(-1*(speedVector*arcTanValue) + (0-joystickRight.deltaY())*1.25);
			if(cmd.lV<=-50){cmd.lV = -50};
			cmd.rV = turningSpeedBack;
			}

			else if(joystickRight.deltaX()> -25 && joystickRight.deltaX() < 25){
			 	cmd.lV = -40;
			 	cmd.rV = -40;
			}
			else{
				cmd.lV = 0;
			 	cmd.rV = 0;
			}
		}

		cmd.type = 'DR';
		WebRTCDataMethold.sendData(cmd);
	}

	function sendBrake(){
		var cmd = {

			type : 'DR',
			lV : 0,
			rV : 0
			
		};

		WebRTCDataMethold.sendData(cmd);
	}

	