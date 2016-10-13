//Just for make something Global....
var WebRTCDataMethold = {};

//What you want send to webRTC
WebRTCDataMethold.sendData = null;

//Methold WebRTCDataMethold.sendData is defined in main.js//

WebRTCDataMethold.caching = function(data){
 if(data.type == 'DR'){
	localSocket.sendCmd(data.type, {lV: data.lV, 
									rV: data.rV} 
						);
 }
 else if(data.type == 'BP'){ //Beep
 	localSocket.sendCmd(data.type, {act: data.act, 
									tp: data.tp} 
						);
 }
 else if(data.type == 'SM'){ //enter safe mode
	 localSocket.sendCmd(data.type,null);
 }

 //console.log(data);

}

WebRTCDataMethold.FeedBack = function(tag, text){

	var feedBack = {
        type : tag,
        text : "RB: " + text //RB: roomba back
      }

    WebRTCDataMethold.sendData(feedBack);

}

WebRTCDataMethold.connected = false;
