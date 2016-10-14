var mediaPlayer = {

	audioPlayer : null,
	videoPlayer : null,

	mediaList : null,
	srcRepo : "https://localSerial.itp.io:3000/media/"

};

mediaPlayer.init = function(obj){

	container =document.getElementById('mediaPlayerContainer');

	if(obj.type == "audio"){
		container.innerHTML = "<audio id='mediaPlayer_audio' autoplay='' style='display:none' src=''><audio>";
		mediaPlayer.audioPlayer = document.getElementById("mediaPlayer_audio");
		mediaPlayer.audioPlayer.volume = 1.0;
		mediaPlayer.audioPlayer.loop = true;
	}

	//optional
	var mediaLoadBtn = document.getElementById("updatePlaylist");
	mediaLoadBtn.addEventListener("click",function(){

		var rotateVal = Number(this.style.transform.replace(/[^\d.]/g,'')); 

		this.style.transform= "rotate(" + (rotateVal + 360) + "deg)";

		mediaPlayer.requestLocalMediaLS();

	});

}

mediaPlayer.requestLocalMediaLS = function(){

	localSocket.sendCmd("checkMD",null);

}

mediaPlayer.showLocalMediaLS = function(mediaList){

	WebRTCDataMethold.FeedBack("MD", mediaList);//Media Feedback

	//optional

	var mediaListPanel = document.getElementById("mediaListPanel");
	mediaListPanel.innerHTML = "<ol></ol>";

	mediaPlayer.mediaList = mediaList;//caching the list

	for(i=0; i < mediaList.length; i++){
		mediaListPanel.innerHTML += "<li class='mediaLink' mediahref='" + mediaList[i] + "''>" + mediaList[i] + "</li>";
	}

	$(".mediaLink").click(function(e){
		mediaPlayer.loadMedia(mediaPlayer.audioPlayer, mediaPlayer.srcRepo + e.target.attributes.mediahref.value, e.target.attributes.mediahref.value);
	});

}

mediaPlayer.loadMedia = function(player,url,file){

	player.src = url;

	WebRTCDataMethold.FeedBack("MD", "New track loaded: " + file);//Media Feedback

}
