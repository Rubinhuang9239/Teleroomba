EX3D = {

	data: {
		lV : 0,
		rV : 0,
	},
	//knob : null,
	//mapKnob : null,
	size : 120,
	throttle : 0

};

window.addEventListener("load",function(){

	EX3D.init(180);

});

EX3D.init = function(size){
	//EX3D.knob = document.getElementById("EX3DShow_knob");
	//EX3D.mapKnob = document.getElementById("EX3DShow_map");
	//var range =  document.getElementById("EX3DShow_range");

	if(size){
		EX3D.size = size;
	}

	//range.style.height = size*2 + "px";
	//range.style.width = size*2 + "px";
}

EX3D.calcuDrive = function(roll,pitch){

		deltaX = ((roll/512) - 1 );
		
		deltaY = ((pitch/512) - 1 );


		//EX3D.knob.style.transform = "translateX(" + deltaX * EX3D.size  +"px) translateY(" + deltaY * EX3D.size +"px)";


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

		//EX3D.mapKnob.style.transform = "translateX(" + map.x  +"px) translateY(" + map.y +"px)";

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
			//
			// if(deltaX < 0){
			// 	//full speed left
			// 	EX3D.data={
			// 		lV: parseInt(-50 * power),
			// 		rV: parseInt(50 * power)
			// 	}

			// }else if(deltaX > 0){
			// 	//full speed right
			// 	EX3D.data={
			// 		lV: parseInt(50 * power),
			// 		rV: parseInt(-50 * power)
			// 	}
			// }
			//console.log(dir);
			if(dir == NaN){
				dir = 90;
			}

			EX3D.data.lV =  parseInt((dir/45 - 1) * power * power * -50);
			EX3D.data.rV =  parseInt((3 - dir/45) * power * power * -50);

			var VLimit = Math.round( -50 * EX3D.throttle * EX3D.throttle );

			if(EX3D.data.lV < VLimit ){
				EX3D.data.lV = VLimit;
			}

			if(EX3D.data.rV < VLimit ){
				EX3D.data.rV = VLimit;
			}
		}

		EX3D.data.type = "DR";
		WebRTCDataMethold.sendData(EX3D.data);

}

EX3D.calcuAction = function(throttle){
	EX3D.throttle = throttle/255;
	//console.log(EX3D.throttle);
}




