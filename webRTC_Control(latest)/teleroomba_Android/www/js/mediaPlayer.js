var mediaPlayer = {

	audioPlayer : null,
	videoPlayer : null,

	mediaList : null

};

mediaPlayer.init = function(obj){

	container =document.getElementById('mediaPlayerContainer');

	if(obj.type == "audio"){
		container.innerHTML = "<audio id='mediaPlayer_audio' autoplay='' style='display:none' src=''><audio>";
		mediaPlayer.audioPlayer = document.getElementById("mediaPlayer_audio");
		mediaPlayer.audioPlayer.volume = 1.0;
	}

}

mediaPlayer.requestLocalMediaLS = function(){

	localSocket.sendCmd("checkMD",null);

}

mediaPlayer.showLocalMediaLS = function(mediaList){

	var mediaListPanel = document.getElementById("mediaListPanel");
	mediaListPanel.innerHTML = "<ol></ol>";

	for(i=0; i < mediaList.length; i++){
		mediaListPanel.innerHTML += "<li>" + mediaList[i] + "</li>";
	}

	//mediaPlayer.audioPlayer.src = "https://localSerial.itp.io:3000/media/" + mediaList[0];

}

mediaPlayer.loadExternal = function(player,url){

	player.url = url;

}
