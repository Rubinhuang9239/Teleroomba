var headset = {
	pitch : 128,
	roll : 90,
	sendInterval : null,
	init: null,
};

headset.orienUpdate = function(e) {
	            headsetOrien = deviceOrientation(e);
	            
	            var pitch = Math.round(headsetOrien.gamma);
				var roll = Math.round(headsetOrien.alpha);
	            
	            //covert roll to range 0~360
	            if(pitch < 0){
		            if(roll < 180){
			            roll += 180;
		            }
		            else{
			            roll -= 180;
		            }
	            }
	            
	            //covert roll to range 0~90~180
	            if(roll > 90 && roll < 270){
		            return;
	            }
		        else{
			        if( roll <= 90 ){ //0~90
						roll = 90 - roll;
		            }else if( roll >= 270 ){ //90~180
			            roll = 450 - roll;
		            }
		        }
		        
		        
		        //covert pitch to range 0~90~180
		        
		        if(pitch < 0){
			        pitch += 180; 
		        }
			    
			    pitch = Math.floor((pitch/1.8) + 80);
			    
			    //console.log(pitch);
				
				headset.pitch = pitch;
				headset.roll = roll;
				
				animate.rollIndiKnob.style.backgroundPosition = Math.round(headset.roll/1.8) + "%";
	            
}

headset.init = function(enabled) {
            if (enabled === false) {
                window.removeEventListener("deviceorientation", headset.orienUpdate);
                //stop interval
                
                clearInterval(headset.sendInterval);
                console.log('headset gyro disabled');
                
            } else {
                window.addEventListener("deviceorientation", headset.orienUpdate);
                //start interval
                                
                headset.sendInterval = setInterval(function(){
	                
	                var frontCam = {
						type:"FC",
						r : headset.roll,
						p : headset.pitch
					}
					
					WebRTCDataMethold.sendData(frontCam);
	                
                }, 40);
                
                console.log('headset gyro enabled');
            }
}

