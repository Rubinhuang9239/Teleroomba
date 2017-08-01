	//Joystick Input//
	
	//console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");

	var joystick = {};

	joystick.data = {
		lV : 0,
		rV : 0
	}

	// 
	joystick.stick = new VirtualJoystick({
		container: document.getElementById("touchLayer"),
		func: "drive",
		strokeStyle	: 'rgba(255,255,255,0.35)',
		mouseSupport	: true,
		limitStickTravel: true,	
		stickRadius: 50
	});

	joystick.stick.addEventListener('mouseMove', function(event){
		if(joystick.stick.deltaX()+joystick.stick.deltaY() != 0){
			joystick.calcuDrive();
		}
	});
	joystick.stick.addEventListener('touchMove', function(event){
		if(joystick.stick.deltaX()+joystick.stick.deltaY() != 0){
			joystick.calcuDrive();
		}
	});
	joystick.stick.addEventListener('mouseUp', function(event){
		joystick.sendBrake();
	});
	joystick.stick.addEventListener('touchEnd', function(event){
		joystick.sendBrake();
	});

	joystick.calcuDrive = function(){

		//var speedY = 0-joystick.stick.deltaY();
		speedVector = Math.sqrt(Math.pow(joystick.stick.deltaX(),2)+
						Math.pow(joystick.stick.deltaY(),2));
		arcTanValue = (Math.atan(joystick.stick.deltaX()/(0-joystick.stick.deltaY()))/(12*Math.PI));
		arcCotValue = (Math.atan((0-joystick.stick.deltaY())/joystick.stick.deltaX())/(12*Math.PI));
		turningSpeed = Math.round(50*(speedVector/50)*1.1);
		turningSpeedBack = Math.round(50*(speedVector/50)*1.25);
		if(turningSpeed>=50){
			turningSpeed=50;
		}
		if(turningSpeedBack>=50){
			turningSpeedBack=50;
		}
		//console.log(arcTanValue);

		if(0-joystick.stick.deltaY()>=0){
			if(joystick.stick.deltaX()<=0){
			joystick.data.lV = Math.round((speedVector*arcTanValue + (0-joystick.stick.deltaY()))*1.1);
			if(joystick.data.lV>=50){joystick.data.lV = 50}
			joystick.data.rV = turningSpeed;
			}
			else if(joystick.stick.deltaX()> 0){
			joystick.data.lV = turningSpeed;
			joystick.data.rV = Math.round(-1*(speedVector*arcTanValue) + (0-joystick.stick.deltaY())*1.1);
			if(joystick.data.rV>=50){joystick.data.rV = 50};
			}
		}
		else if(0-joystick.stick.deltaY()<=0){
			if(joystick.stick.deltaX()>=40){
			joystick.data.lV = turningSpeedBack;
			joystick.data.rV = Math.round((speedVector*arcTanValue + (0-joystick.stick.deltaY())*1.25));
			if(joystick.data.rV<=-50){joystick.data.rV = -50}
			}
			else if(joystick.stick.deltaX()< -40){
			joystick.data.lV = Math.round(-1*(speedVector*arcTanValue) + (0-joystick.stick.deltaY())*1.25);
			if(joystick.data.lV<=-50){joystick.data.lV = -50};
			joystick.data.rV = turningSpeedBack;
			}

			else if(joystick.stick.deltaX()> -25 && joystick.stick.deltaX() < 25){
			 	joystick.data.lV = -10;
			 	joystick.data.rV = -10;
			}
			else{
				joystick.data.lV = 0;
			 	joystick.data.rV = 0;
			}
		}

		joystick.data.type = 'DR';
		WebRTCDataMethold.sendData(joystick.data);
	}

	joystick.sendBrake = function(){
		joystick.data = {

			type : 'DR',
			lV : 0,
			rV : 0
			
		};

		WebRTCDataMethold.sendData(joystick.data);
	}



