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
 else if(data.type == 'MD'){ //enter safe mode
 	if(data.key == "load"){
 		mediaPlayer.requestLocalMediaLS();
 	}
 }

 //console.log(data);

}

WebRTCDataMethold.cachingFeedBack = function(feedBack){

	if(feedBack.type == "MD"){

		animate.loadPlayList(feedBack.text);
		webConsole.logMessage("Media", feedBack.text);
		webConsole.logMessage("Media", "Found Media:");
	}

}

WebRTCDataMethold.FeedBack = function(tag, text){

	var feedBack = {
        type : tag,
        text : text
      }

    WebRTCDataMethold.sendData(feedBack);

}

WebRTCDataMethold.connected = false;
