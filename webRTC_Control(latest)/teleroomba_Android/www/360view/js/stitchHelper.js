
//---------stitchHelper-----------//

var stitchHelper = {};

stitchHelper.transform = {x:0,y:0,z:0};
stitchHelper.rotation = {x:0,y:0,z:0};

stitchHelper.stitchPreSets = {
    Ricoh_USB:{
    	a:422,
    	b:426,
    	c:425,
    	d:425,
    	
    	e:479,
    	f:595,
    	g:1442,
    	h:596,
        rotateZ : (-Math.PI / 2),
        videoSrc : "360view/video/thetaHDMI_Record.mp4"
    },
    
    Ricoh_HDMI:{
        a:428,
        b:477,
        c:425,
        d:471,
        
        e:477,
        f:607,
        g:1441,
        h:605,
        rotateZ : (-Math.PI / 2),
        videoSrc : "360view/video/placeholder.mp4"
    },

    Insta360_RAW:{
        a:419,
        b:487,
        c:429,
        d:479,
        
        e:482,
        f:534,
        g:1446,
        h:535,
        rotateZ : (Math.PI / 2),
        videoSrc : "360view/video/insta360.mp4"
    }
}

stitchHelper.currentMode = "Ricoh_USB";

stitchHelper.stitchDemo = {
    	a:"StretchV",
    	b:"StretchU",
    	c:"StretchV",
    	d:"StretchU",
    	
    	e:"DriftV",
    	f:"DriftU",
    	g:"DriftV",
    	h:"DriftU",
}

stitchHelper.init = function(){
	stitchHelper.stitchTypeBox = document.getElementById("stitchTypeBox");
	stitchHelper.demoSphere = document.getElementById("demoSphere");


    //  Dom controls

    $(".slide").bind('input', function(e){
        stitchHelper.stitchPreSets[stitchHelper.currentMode][e.target.attributes.key.value] = e.target.value;
        theta_view('thetaVideo');
        e.target.previousElementSibling.innerHTML = e.target.value;
    });

    stitchHelper.refreashVal();

    $(".spA").mouseenter(function(e){
        stitchHelper.stitchTypeBox.style.transform = "perspective(240px) rotateY(0deg)";
        stitchHelper.demoSphere.style.backgroundColor = "rgba(255,170,0,0.5)";
    });

    $(".spB").mouseenter(function(e){
        stitchHelper.stitchTypeBox.style.transform = "perspective(240px) rotateY(180deg)";
        stitchHelper.demoSphere.style.backgroundColor = "rgba(170,255,0,0.5)";
    });

    $(".slide").mouseenter(function(e){
        stitchHelper.demoSphere.className = "demoStatus" + stitchHelper.stitchDemo[e.target.attributes.key.value];
    });

    $(".slide").mouseleave(function(e){
        stitchHelper.demoSphere.className = "demoStatusNone";
    });

    $("#streamPort").change(function(e){
        stitchHelper.currentMode = e.target.value;
        stitchHelper.refreashVal();
        theta_view('thetaVideo');
    });
}

stitchHelper.refreashVal = function(){

    //console.log($(".slide"));
    $(".slide").each(function(index,slide){
        //console.log(index,value);
        slide.value = stitchHelper.stitchPreSets[stitchHelper.currentMode][slide.attributes.key.value];
    });

    $(".stitchValDis").each(function(index,stitchValDis){
        //console.log(index,value);
        stitchValDis.innerHTML = stitchHelper.stitchPreSets[stitchHelper.currentMode][stitchValDis.attributes.key.value];
    });

    var video = document.getElementById("thetaVideo");
    video.src = stitchHelper.stitchPreSets[stitchHelper.currentMode].videoSrc;

}

stitchHelper.stitchMode = function(){

    camera.rotation.x += 0.2 * (0-camera.rotation.x);
    camera.rotation.y += 0.2 * (0-camera.rotation.y);
    camera.rotation.z += 0.2 * (0-camera.rotation.z);

    camera.position.x += 0.2 * (0-camera.position.x);
    camera.position.y += 0.2 * (0-camera.position.y);
    camera.position.z += 0.2 * (0-camera.position.z);


    var setStitchModeDist = function(){
        if( camera.position.z <= 140){
            controls.dollyIn(0.75);
            controls.update();

            setTimeout(function(){
                setStitchModeDist();
            },36);

        }
    }


    if(Math.abs(camera.rotation.z)>= 0.005 || Math.abs(camera.position.x) >= 0.05 || Math.abs(camera.position.y) >= 0.05 || Math.abs(camera.position.z) >= 0.05){
        setTimeout(function(){
            stitchHelper.stitchMode();
        },36);
    }
    else{
        camera.rotation.set(0,0,0);
        controls.reset();
        console.log("Stitch Mode Entered");
        setStitchModeDist();
    }

    //change the dist display, Remove if you do not need the HUD
    HUDSystem.userInteraction = true;
    HUDSystem.initUserInteraction("AutoPan");
}


stitchHelper.resetCameraAngle = function(){

    camera.rotation.x += 0.2 * (0-camera.rotation.x);
    camera.rotation.y += 0.2 * (0-camera.rotation.y);
    camera.rotation.z += 0.2 * (0-camera.rotation.z);

    camera.position.x += 0.2 * (0-camera.position.x);
    camera.position.y += 0.2 * (0-camera.position.y);
    camera.position.z += 0.2 * (0-camera.position.z);


    if(Math.abs(camera.rotation.z)>= 0.005 || Math.abs(camera.position.x) >= 0.05 || Math.abs(camera.position.y) >= 0.05 || Math.abs(camera.position.z) >= 0.05){

        setTimeout(function(){
            stitchHelper.resetCameraAngle();
        },36);

    }else{
        camera.rotation.set(0,0,0);
        controls.reset();
        console.log("Done Reset");
    }

    //change the dist display, Remove if you do not need the HUD
    HUDSystem.userInteraction = true;
    HUDSystem.initUserInteraction("AutoPan");
}

