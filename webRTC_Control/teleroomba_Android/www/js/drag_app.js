//drag.js

var drag = {}

//drag.sideMenuLocation = {x:0, y:0};

drag.init = function(){

    var sideMenu = document.getElementById('manualMenu');

	var remoteVideo = document.getElementById('remote-video');

    var remoteVideoHummer = new Hammer.Manager(remoteVideo);

    var pan = new Hammer.Pan();
    var pan = new Hammer.Tap();
    remoteVideoHummer.add( new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 1 }) );
    remoteVideoHummer.add( new Hammer.Tap({ event: 'tap' }) );
        remoteVideoHummer.on("tap panmove panend", function(ev){

        if( ev.type == "tap"){
            animate.sideMenuStatusTo("hide");
        }

        else if( ev.type == "panmove" ){
            sideMenu.style.transition = "none";
            
            if( animate.sideMenuStatus == "show" && ev.deltaX < 0){
                sideMenu.style.transform = "translateX("+ ev.deltaX + "px)";
            }
            else if( animate.sideMenuStatus == "hide" && ev.deltaX < sideMenu.offsetWidth){
                sideMenu.style.transform = "translateX("+ (ev.deltaX-sideMenu.offsetWidth) + "px)";
            }
        }

        else if( ev.type == "panend"){
            sideMenu.style.transition = "transform 0.6s ease-in-out";

            if( ev.deltaX < -0.3 * (sideMenu.offsetWidth) ){
                animate.sideMenuStatusTo("hide");
            }
            else if( ev.deltaX > 0.3 * (sideMenu.offsetWidth) ){
                animate.sideMenuStatusTo("show");
            }
            else{
                animate.sideMenuStatusTo(animate.sideMenuStatus);
            }

        }

    });

}