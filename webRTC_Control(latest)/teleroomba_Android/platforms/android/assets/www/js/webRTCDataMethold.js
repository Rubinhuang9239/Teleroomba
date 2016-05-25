//Just for make something Global....
var WebRTCDataMethold = {};

//What you want send to webRTC
WebRTCDataMethold.sendData = null;

//What you recive form webRTC
WebRTCDataMethold.cache = {
	lV : 0,
	rV : 0
};

//Methold WebRTCDataMethold.sendData is defined in main.js//

WebRTCDataMethold.caching = function(data){
 if(data.type == 'DR'){
	WebRTCDataMethold.cache = data;
 }
 else if(data.type == 'BLE'){
 	if(data.text = "conn"){
 		var bleScan = document.getElementById("bleScan");
 		bleScan.click();
 	}
 	//autoBLE.singleCom(data.macro);
 }
 //CHARGE//TONE//HELP//B_RATE

}

WebRTCDataMethold.FeedBack = function(tag, text){

	var feedBack = {
        type : tag,
        text : "RB: " + text
      }

    WebRTCDataMethold.sendData(feedBack);

}

WebRTCDataMethold.connected = false;

var autoBLE = {};

autoBLE.driveComInterval = true;
autoBLE.driveComHistory = {
							lV:0,
							rV:0
						  }
autoBLE.BLEConnected = false;


autoBLE.driveCom = function(){	//send_to_BLE//
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