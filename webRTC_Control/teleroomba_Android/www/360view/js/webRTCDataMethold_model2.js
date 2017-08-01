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
 	else{

 		if(data.key == "play"){
 			mediaPlayer.audioPlayer.play();
 		}
 		else if(data.key == "pause"){
 			mediaPlayer.audioPlayer.pause();
 		}
 		else if(data.key == "loop"){
 			mediaPlayer.audioPlayer.loop = true;
 		}
 		else if(data.key == "noloop"){
 			mediaPlayer.audioPlayer.loop = false;
 		}
 		else{
 			var listPos =  data.key;
 			mediaPlayer.loadMedia(mediaPlayer.audioPlayer, mediaPlayer.srcRepo + mediaPlayer.mediaList[listPos], mediaPlayer.mediaList[listPos]);
 		}
 		
 	}
 }
 //console.log(data);

}

WebRTCDataMethold.cachingFeedBack = function(feedBack){

	if(feedBack.type == "MD"){

		if( typeof(feedBack.text) == "object" ){
		 	animate.loadPlayList(feedBack.text);
		}

		webConsole.logMessage("Media", feedBack.text);
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
