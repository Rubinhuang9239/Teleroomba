//Just for make something Global....
var WebRTCDataMethold = {};

//What you want send to webRTC
WebRTCDataMethold.sendData = null;

//What you recive form webRTC
WebRTCDataMethold.cache = {
	lV : 0,
	rV : 0
};

WebRTCDataMethold.caching = function(data){
 if(data.type == 'DR'){
	WebRTCDataMethold.cache = data;
 }
 else{
 	//CHARGE//TONE//HELP//B_RATE
 	autoBLE.singleCom(data.macro);
 }

}

WebRTCDataMethold.FeedBack = function(tag, text){

	var feedBack = {
        type : tag,
        text : "RB: " + text
      }

    WebRTCDataMethold.sendData(feedBack);

}



var autoBLE = {};

autoBLE.driveComInterval = true;
autoBLE.driveComHistory = {
							lV:0,
							rV:0
						  }
autoBLE.BLEConnected = false;

autoBLE.driveCom = function(){
	if(app.connected){

		if(WebRTCDataMethold.connected == true){

			var drive = {
				rV : 0,
				lV : 0
			};

			if( WebRTCDataMethold.cache === null && typeof variable === "object"){
			//nothing
			console.log("nothing");
			}
			else{


				drive.lV = 0.5 * WebRTCDataMethold.cache.lV + 50;
				drive.rV = 0.5 * WebRTCDataMethold.cache.rV + 160;

				//console.log(drive);


					if(drive.lV != autoBLE.driveComHistory.lV){
						//send leftV;
						app.sendData( [0x00+parseInt(drive.lV)] );
						autoBLE.driveComHistory.lV = drive.lV;
					}
					if(drive.rV != autoBLE.driveComHistory.rV){
						//send rightV;
						app.sendData( [0x00+parseInt(drive.rV)] );
						autoBLE.driveComHistory.rV = drive.rV;
					}

			}
		}
		else{

			var drive = {
				rV : 0,
				lV : 0
			};

			drive.lV = 0+50;
			drive.rV = 0+160;

			//set speed 0
			app.sendData([0x00+drive.lV]);
			app.sendData([0x00+drive.rV]);

		}

		setTimeout(function(){
			autoBLE.driveCom()
		},32);
	}else{
		//stop auto driveCom
		return false
	}
}

autoBLE.singleCom =function(){

}