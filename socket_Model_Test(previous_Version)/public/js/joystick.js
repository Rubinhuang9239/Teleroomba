
	console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

	var cmd = {
		leftV : 0,
		rightV : 0
	}

	// 
	var joystickRight = new VirtualJoystick({
		container	: document.body,
		func: "drive",
		strokeStyle	: 'rgba(255,255,255,0.25)',
		mouseSupport	: true,
		limitStickTravel: true,	
		stickRadius: 160
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

	function calcuDrive(){

		//var speedY = 0-joystickRight.deltaY();
		speedVector = Math.sqrt(Math.pow(joystickRight.deltaX(),2)+
						Math.pow(joystickRight.deltaY(),2));
		arcTanValue = (Math.atan(joystickRight.deltaX()/(0-joystickRight.deltaY()))/(12*Math.PI));
		arcCotValue = (Math.atan((0-joystickRight.deltaY())/joystickRight.deltaX())/(12*Math.PI));
		turningSpeed = Math.round(160*(speedVector/160)*1.1);
		turningSpeedBack = Math.round(160*(speedVector/160)*1.25);
		if(turningSpeed>=160){
			turningSpeed=160;
		}
		if(turningSpeedBack>=160){
			turningSpeedBack=160;
		}
		//console.log(arcTanValue);

		if(0-joystickRight.deltaY()>=0){
			if(joystickRight.deltaX()<=0){
			cmd.leftV = Math.round((speedVector*arcTanValue + (0-joystickRight.deltaY()))*1.1);
			if(cmd.leftV>=160){cmd.leftV = 160}
			cmd.rightV = turningSpeed;
			}
			else if(joystickRight.deltaX()> 0){
			cmd.leftV = turningSpeed;
			cmd.rightV = Math.round(-1*(speedVector*arcTanValue) + (0-joystickRight.deltaY())*1.1);
			if(cmd.rightV>=160){cmd.rightV = 160};
			}
		}
		else if(0-joystickRight.deltaY()<=0){
			if(joystickRight.deltaX()>=40){
			cmd.leftV = turningSpeedBack;
			cmd.rightV = Math.round((speedVector*arcTanValue + (0-joystickRight.deltaY())*1.25));
			if(cmd.rightV<=-160){cmd.rightV = -160}
			}
			else if(joystickRight.deltaX()< -40){
			cmd.leftV = Math.round(-1*(speedVector*arcTanValue) + (0-joystickRight.deltaY())*1.25);
			if(cmd.leftV<=-160){cmd.leftV = -160};
			cmd.rightV = turningSpeedBack;
			}

			else if(joystickRight.deltaX()> -25 && joystickRight.deltaX() < 25){
			 	cmd.leftV = -40;
			 	cmd.rightV = -40;
			}
			else{
				cmd.leftV = 0;
			 	cmd.rightV = 0;
			}
		}


		//console.log(cmd);
		sendCmd(cmd);
	}
	


	//one on the right of the screen
	// var joystickLeft	= new VirtualJoystick({
	// 	container	: document.body,
	// 	func: "turn",
	// 	mouseSupport	: true,
	// 	strokeStyle	: 'rgba(0,255,255,0.25)',
	// 	limitStickTravel: true,
	// 	stickRadius: 100
	// });
	// joystickLeft.addEventListener('mouseMove', function(event){
	// 	if( Math.abs(joystickLeft.deltaX()) > 10 ){
	// 		//console.log("turn_send");
	// 		//sendCmd(cmd);
	// 	}
	// });
	// joystickLeft.addEventListener('touchMove', function(event){
	// 	if(	Math.abs(joystickLeft.deltaX()) > 10 ){
	// 		//console.log("turn_send");
	// 		//sendCmd(cmd);
	// 	}
	// });