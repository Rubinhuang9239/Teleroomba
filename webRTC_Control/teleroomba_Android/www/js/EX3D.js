EX3D = {

	data: {
		lV : 0,
		rV : 0,
	},
	knob : null,
	mapKnob : null,
	size : 80,
	trigger: 0,

};

window.addEventListener("load",function(){

	EX3D.init(80);

});

EX3D.init = function(size){
	EX3D.knob = document.getElementById("EX3DShow_knob");
	EX3D.mapKnob = document.getElementById("EX3DShow_map");
	var range =  document.getElementById("EX3DShow_range");

	if(size){
		EX3D.size = size;
	}

	range.style.height = size*2 + "px";
	range.style.width = size*2 + "px";
	
	EX3D.initSocket();
}

EX3D.calcuDrive = function(roll,pitch){

		deltaX = ((roll/512) - 1 );
		
		deltaY = ((pitch/512) - 1 );


		EX3D.knob.style.transform = "translateX(" + deltaX * EX3D.size  +"px) translateY(" + deltaY * EX3D.size +"px)";


		var arcTanValue = Math.atan(deltaY/deltaX);

		//console.log( arcTanValue / Math.PI * 360 );

		var ratio = null;
		var map = {};

		//ratio = Math.sin(arcTanValue);

		if( Math.abs(deltaY/deltaX) > 1 ){
			ratio = Math.sin(arcTanValue);
			map = getMapVal();

			if( deltaY < 0 ){
				map.x = -map.x;
				map.y = -map.y;
			}

		}
		else{
			ratio = Math.cos(arcTanValue);
			map = getMapVal();
			
			if( deltaX < 0 ){
				map.x = -map.x;
				map.y = -map.y;
			}

		}

		//console.log(ratio);

		function getMapVal(){
			var map = {};
			var disDelta = ( Math.sqrt(Math.pow(deltaX * EX3D.size,2) + Math.pow(deltaY * EX3D.size,2)) );
			map.r = disDelta * ratio * EX3D.throttle;
			map.x = Math.cos(arcTanValue) * map.r;
			map.y = Math.sin(arcTanValue) * map.r;

			return map
		}


		//console.log( deltaY/deltaX );

		EX3D.mapKnob.style.transform = "translateX(" + map.x  +"px) translateY(" + map.y +"px)";

		var power = Math.abs((map.r/EX3D.size).toPrecision(3));
		var dir = ( arcTanValue / Math.PI * 180 );
			if(dir < 0){
				dir += 180; 
			}
		dir = Number(dir.toPrecision(3));

		if(deltaY < 0 ){

			var map = getMapVal();


			EX3D.data.lV =  parseInt((dir/45 - 1) * power * power * 50);
			EX3D.data.rV =  parseInt((3 - dir/45) * power * power * 50);

			var VLimit = Math.round( 50 * EX3D.throttle * EX3D.throttle);

			if(EX3D.data.lV > VLimit ){
				EX3D.data.lV = VLimit;
			}
			if(EX3D.data.rV > VLimit ){
				EX3D.data.rV = VLimit;
			}

		}
		else{

			EX3D.data.lV =  parseInt((dir/45 - 1) * power * power * -50);
			EX3D.data.rV =  parseInt((3 - dir/45) * power * power * -50);

			var VLimit = Math.round( -50 * EX3D.throttle * EX3D.throttle);

			if(EX3D.data.lV < VLimit ){
				EX3D.data.lV = VLimit;
			}

			if(EX3D.data.rV < VLimit ){
				EX3D.data.rV = VLimit;
			}
		}
		
		if( isNaN(EX3D.data.rV ) || isNaN(EX3D.data.lV) ){
			EX3D.data = {
				lV : 0,
				rV : 0
			}
		}

		EX3D.data.type = "DR";
		//console.log(EX3D.data);
		WebRTCDataMethold.sendData(EX3D.data);

}

EX3D.calcuAction = function(data){
	//console.log(data);

	if(data.th){
		var throttle = data.th;
		EX3D.throttle = (throttle/255).toPrecision(3);
	}
	
	if(data.tr){
		if(data.tr != EX3D.trigger){
			if(data.tr == 0){
				//trigger_release
				console.log(trigger_release);
			}
			else if(data.tr == 1){
				//trigger_pressed
				console.log(trigger_pressed);
			}
		}
	}
	//console.log(EX3D.throttle);
}

EX3D.initSocket = function(){

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false ) {

		EX3Dsocket = io("https://localserial.itp.io:3001");
		
		EX3Dsocket.on("DR",function(data){
			EX3D.calcuDrive(data.r, data.p);
		});
		
		EX3Dsocket.on("AC",function(data){
			EX3D.calcuAction(data);
		});
		
		EX3Dsocket.on("FCHID",function(data){
			//using function from keyboardInput.js
			if(data == "w"){
				keyBoard.rollPitch(87);
			}
			else if(data == "s"){
				keyBoard.rollPitch(83);
			}
			else if(data == "a"){
				keyBoard.rollPitch(65);
			}
			else if(data == "d"){
				keyBoard.rollPitch(68);
			}
		});

	}
	
}

