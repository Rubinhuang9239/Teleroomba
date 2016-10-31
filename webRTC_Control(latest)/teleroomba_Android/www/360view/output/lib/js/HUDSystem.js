//---------HUD_display-------------//

var HUDSystem = {
    geoLibrary:{},
    inited: false
};

HUDSystem.init = function(){
    
    HUDSystem.followObjs = new THREE.Group();
    HUDSystem.staticObjs = new THREE.Group();  

    //Build Assets
    HUDSystem.geoLibrary.panel = new THREE.SphereGeometry(90, 16, 16, Math.PI/2);
    HUDSystem.geoLibrary.sphere = new THREE.SphereGeometry(4, 24, 24);
    HUDSystem.geoLibrary.teleroomba = new THREE.Group();

    //Build Display OBJs
    HUDSystem.followHudMaterial = new THREE.MeshBasicMaterial({
        // /color:0xFF0000,
        transparent: true,
        opacity: 0.5,
        depthWrite:false,
        // side: THREE.BackSide,
        map: THREE.ImageUtils.loadTexture('img/hudIn.png'),
        blending: THREE.AdditiveBlending
    });

    HUDSystem.followHUD = new THREE.Mesh( HUDSystem.geoLibrary.panel, HUDSystem.followHudMaterial );

    HUDSystem.followHUD.scale.x = -1;

    HUDSystem.followObjs.add(HUDSystem.followHUD);



    //------------//

    HUDSystem.visualNodeMeterial = new THREE.MeshBasicMaterial({
        color:0xFF4400,
        transparent: true,
        opacity: 0.2,
        depthWrite:false,
        blending: THREE.AdditiveBlending
    });

    HUDSystem.visualCenter = new THREE.Mesh( HUDSystem.geoLibrary.sphere, HUDSystem.visualNodeMeterial);

    HUDSystem.visualCenter.position.z = -90;

    HUDSystem.visualCenterWM = new THREE.Vector3(0,0,-90);

    HUDSystem.followObjs.add(HUDSystem.visualCenter);

    HUDSystem.distLabel = HUDSystem.textSprite("0");
    HUDSystem.distLabel.position.set(0,-12,-90);
    HUDSystem.followObjs.add( HUDSystem.distLabel );


    //------------//

    HUDSystem.defaultCenter = new THREE.Mesh( HUDSystem.geoLibrary.sphere, HUDSystem.visualNodeMeterial);

    HUDSystem.defaultCenter.position.z = -90;

    HUDSystem.defaultCenter.scale.x = 0.4;
    HUDSystem.defaultCenter.scale.y = 0.4;
    HUDSystem.defaultCenter.scale.z = 0.4;


    HUDSystem.staticObjs.add(HUDSystem.defaultCenter);


    //visual center guide line
    var visCtrGuideGeo = new THREE.Geometry();
        visCtrGuideGeo.vertices.push(new THREE.Vector3(0, 0, -90));
        visCtrGuideGeo.vertices.push(new THREE.Vector3(0, 0, -90));
        visCtrGuideGeo.dynamic = true;
        visCtrGuideGeo.verticesNeedUpdate = true;
		//visCtrGuideGeo.elementsNeedUpdate = true;

    var guidelineMat = new THREE.LineBasicMaterial({
            color: 0xFF4400,
            transparent: true,
            opacity: 0.5,
            //depthWrite:false,
            blending: THREE.AdditiveBlending,
            linewidth: 3,
    });

    HUDSystem.visCtrGuideLine = new THREE.Line(visCtrGuideGeo, guidelineMat);

    HUDSystem.staticObjs.add(HUDSystem.visCtrGuideLine);

    var originLabel = HUDSystem.textSprite("ORIGIN");
    originLabel.position.set(0,6,-90);
   	HUDSystem.staticObjs.add( originLabel );

    HUDSystem.addToScene();
    HUDSystem.initUserInteraction();

    HUDSystem.inited = true;

}

HUDSystem.addToScene = function(){

    HUDSystem.followObjs.position.set(0,0.0001,0);
    HUDSystem.staticObjs.position.set(0,0,0);

    scene.add(HUDSystem.followObjs);
    scene.add(HUDSystem.staticObjs);

    HUDSystem.getOffAngle();

}

HUDSystem.userInteraction = false;

HUDSystem.initUserInteraction = function(status){

        handleUserDrag = function(){

        if(HUDSystem.userInteraction == false){
            return false
        }
        
        var dist = HUDSystem.calcuShift(HUDSystem.visualCenterWM);

        
        //---update texture---//
        var text = "d: " + dist;
        var color = "#FF9900";
        var size = 72;
        var font = size + "px " + "Helvetica";

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = font;

        // get size data (height depends only on font size)
        var metrics = context.measureText(text),
            textWidth = metrics.width;

        canvas.width = textWidth + 3;
        canvas.height = size + 20;

        context.font = font;
        context.fillStyle = color;
        context.fillText(text, 0, size + 3);

        // canvas contents will be used for a texture
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        texture.minFilter = THREE.LinearFilter

        HUDSystem.distLabel.material.map = texture;
        HUDSystem.distLabel.geometry = new THREE.PlaneGeometry(canvas.width, canvas.height);


        //---update_offAngle_Val---//
        HUDSystem.getOffAngle();

    }


    if(status == "AutoPan"){

        handleUserDrag();

        return false
    }

    var rendererDom = renderer.domElement;

    rendererDom.addEventListener( 'mousedown', function(){
        HUDSystem.userInteraction = true;
    } );
    rendererDom.addEventListener( 'mouseup', function(){
        HUDSystem.userInteraction = false;
    } );

    rendererDom.addEventListener( 'touchstart', function(){
        HUDSystem.userInteraction = true;
    } );
    rendererDom.addEventListener( 'touchend', function(){
        HUDSystem.userInteraction = false;
    } );

    rendererDom.addEventListener( 'mousemove', handleUserDrag);
    rendererDom.addEventListener( 'touchmove', handleUserDrag);

}



HUDSystem.getOffAngle = function(){
    var followObjsAng = camera.rotation;
    document.getElementById("offAngleX").innerHTML = ((followObjsAng.x)/Math.PI*180).toPrecision(4);
    document.getElementById("offAngleY").innerHTML = ((followObjsAng.y)/Math.PI*180).toPrecision(4);
    document.getElementById("offAngleZ").innerHTML = ((followObjsAng.z)/Math.PI*180).toPrecision(4);
}


HUDSystem.resetCameraAngle = function(){

    camera.rotation.x += 0.2 * (0-camera.rotation.x);
    camera.rotation.y += 0.2 * (0-camera.rotation.y);
    camera.rotation.z += 0.2 * (0-camera.rotation.z);

    camera.position.x += 0.2 * (0-camera.position.x);
    camera.position.y += 0.2 * (0-camera.position.y);
    camera.position.z += 0.2 * (0-camera.position.z);


    //controls.target.copy(HUDSystem.visualCenterWM);



    if(Math.abs(camera.rotation.z)>= 0.005 || Math.abs(camera.position.x) >= 0.05 || Math.abs(camera.position.y) >= 0.05 || Math.abs(camera.position.z) >= 0.05){

        setTimeout(function(){
            HUDSystem.resetCameraAngle();
        },36);

    }else{
        camera.rotation.set(0,0,0);
        controls.reset();
        console.log("Done Reset");
    }

    //change the dist display
    HUDSystem.userInteraction = true;
    HUDSystem.initUserInteraction("AutoPan");
}

HUDSystem.stitchMode = function(){

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
            HUDSystem.stitchMode();
        },36);
    }
    else{
        camera.rotation.set(0,0,0);
        controls.reset();
        console.log("Stitch Mode Entered");
        setStitchModeDist();
    }


    //change the dist display
    HUDSystem.userInteraction = true;
    HUDSystem.initUserInteraction("AutoPan");
}


HUDSystem.update = function(){


    HUDSystem.followObjs.rotation.x = camera.rotation.x;
    HUDSystem.followObjs.rotation.y = camera.rotation.y;
    HUDSystem.followObjs.rotation.z = camera.rotation.z;

    HUDSystem.visCtrGuideLine.geometry.verticesNeedUpdate = true;
    HUDSystem.visualCenterWM.setFromMatrixPosition( HUDSystem.visualCenter.matrixWorld );
    //update the guide line
    HUDSystem.visCtrGuideLine.geometry.vertices[0].copy(HUDSystem.visualCenterWM);
}


HUDSystem.textSprite = function(text) {

    if(text != ""){

        var font = "Helvetica",
            size = 72,
            color = "#FF9900";

        font = size + "px " + font;

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = font;

        // get size data (height depends only on font size)
        var metrics = context.measureText(text),
            textWidth = metrics.width;

        canvas.width = textWidth + 3;
        canvas.height = size + 20;
        //canvas.height = 2*size + 40;

        context.font = font;
        context.fillStyle = color;
        context.fillText(text, 0, size + 3);

        // canvas contents will be used for a texture
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        var mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(canvas.width, canvas.height),
        new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent:true,
            opacity:0.75,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        }));

        mesh.scale.set(0.06,0.06,0.06);

    }
    else{
        mesh = null;
    }

    return mesh;

}

HUDSystem.calcuShift = function(visualCenterWM){
    var dist = parseInt(HUDSystem.visualCenterWM.distanceTo(HUDSystem.defaultCenter.position));
    return dist;
}
