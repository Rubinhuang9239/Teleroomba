//drag.js

var drag = {}

drag.localVideoLocation = {x:0, y:0};

drag.init = function(){


	var localVideo = document.getElementById('local-video');
    var localVideoHummer = new Hammer.Manager(localVideo);

    var pan = new Hammer.Pan();
    localVideoHummer.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 2 }) );
        localVideoHummer.on("panmove panstart panend", function(ev){

        if( ev.type == "panstart"){
        	localVideo.style.boxShadow = "15px 20px 16px rgba(0,0,0,0.4)";
        	localVideo.style.opacity = "0.8";
        	localVideo.style.maxWidth = "24.5%";
        	localVideo.style.border = "solid 1.25px #FFF";
        	localVideo.style.borderRadius = "4px";
        }

        else if( ev.type == "panmove"){
            localVideo.style.transform = "perspective(1000px) translateX("+ (drag.localVideoLocation.x + ev.deltaX) + "px) translateY("
            										  + (drag.localVideoLocation.y + ev.deltaY) + "px)";
        }

        else if( ev.type == "panend"){
        	drag.localVideoLocation.x += ev.deltaX;
            drag.localVideoLocation.y += ev.deltaY;
            localVideo.style.transform = "perspective(1000px) translateX("+ drag.localVideoLocation.x + "px) translateY("
            										  + drag.localVideoLocation.y + "px)";
            localVideo.style.boxShadow = "3px 3px 8px rgba(0,0,0,0.3)";
            localVideo.style.maxWidth = "24%";
            localVideo.style.opacity = "1";
            localVideo.style.border = "none";
            localVideo.style.borderRadius = "0px";
        }

    });

}