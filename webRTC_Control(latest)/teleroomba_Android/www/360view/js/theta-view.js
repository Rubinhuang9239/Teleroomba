var scene = null ;
var camera = null;

function initThree(){
    scene = new THREE.Scene();
	var width  = window.innerWidth;
	var height = window.innerHeight;
	var fov    = 100;
	var aspect = width / height;
	var near   = 0.01;
	var far    = 1000;
	camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 0, 0.00001 );


	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( width, height );
	var element = renderer.domElement;
	document.body.appendChild( element );

	var effect;
	effect = new THREE.StereoEffect(renderer);
	effect.setSize(width, height);

	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 0, 0.7, 0.7 );
	scene.add( directionalLight );

	var controls = new THREE.OrbitControls(camera, element);
	controls.noPan = true;

    HUDSystem.addToScene();

    ( function renderLoop () {

        HUDSystem.followObjs.rotation.x = camera.rotation.x;
        HUDSystem.followObjs.rotation.y = camera.rotation.y;
        HUDSystem.followObjs.rotation.z = camera.rotation.z;

        requestAnimationFrame( renderLoop );
        //Get visualCenter world Matrix
        var visualCenterWM = new THREE.Vector3();
    	visualCenterWM.setFromMatrixPosition( HUDSystem.visualCenter.matrixWorld );
    	//update the guide line
    	HUDSystem.visCtrGuideLine.geometry.vertices[0].copy(visualCenterWM);
    	HUDSystem.visCtrGuideLine.geometry.verticesNeedUpdate = true;

        //if( !settingDB.headset ){
        	renderer.render( scene, camera );
        // }else{
        // 	effect.render(scene, camera);
        // }
          
    } )();
}

//---------HUD_display-------------//

var HUDSystem = {
    geoLibrary:{},
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
        map: THREE.ImageUtils.loadTexture('360view/img/hudIn.png'),
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

    HUDSystem.followObjs.add(HUDSystem.visualCenter); 


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
            linewidth: 4
    });

    HUDSystem.visCtrGuideLine = new THREE.Line(visCtrGuideGeo, guidelineMat);

    HUDSystem.staticObjs.add(HUDSystem.visCtrGuideLine);

    var originLabel = HUDSystem.textSprite("ORIGIN");
    originLabel.position.set(0,6,-90);
   	HUDSystem.staticObjs.add( originLabel );

    
}

HUDSystem.addToScene = function(){
    scene.add(HUDSystem.followObjs);
    scene.add(HUDSystem.staticObjs);
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






//---------stitchHelper-----------//

var stitchHelper = {};

stitchHelper.stitchVal = {
    	a:422,
    	b:426,
    	c:425,
    	d:425,
    	
    	e:479,
    	f:595,
    	g:1442,
    	h:596,
}

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
}


//--------theta_view----------//

var theta_view = function (video_id) {

	for( i = 0; i < scene.children.length; i++){
        if(scene.children[i].stitchBall === true){
		  scene.remove(scene.children[i]);
          //console.log("remove");
        }
	}

	var video = document.getElementById( video_id );
	var texture = new THREE.VideoTexture( video );
	texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
	texture.format = THREE.RGBFormat;

	var geometry = new THREE.SphereGeometry(100, 32, 32, 0);
    //console.log(geometry);
	geometry.scale(-1, 1, 1);

        var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
        for ( i = 0; i < faceVertexUvs.length; i ++ ) {
                var uvs = faceVertexUvs[ i ];
                var face = geometry.faces[ i ];
                for ( var j = 0; j < 3; j ++ ) {
                        var x = face.vertexNormals[ j ].x;
			var y = face.vertexNormals[ j ].y;
			var z = face.vertexNormals[ j ].z;

			if (i < faceVertexUvs.length / 2) {
				var correction = (x == 0 && z == 0) ? 1 : (Math.acos(y) / Math.sqrt(x * x + z * z)) * (2 / Math.PI);
                                //Front RotateX
                                uvs[ j ].x = x * (stitchHelper.stitchVal.a / 1920) * correction + (stitchHelper.stitchVal.e / 1920);
                                uvs[ j ].y = z * (stitchHelper.stitchVal.b / 1080) * correction + (stitchHelper.stitchVal.f / 1080);
                        } else {
				var correction = ( x == 0 && z == 0) ? 1 : (Math.acos(-y) / Math.sqrt(x * x + z * z)) * (2 / Math.PI);
                                uvs[ j ].x = -1 * x * (stitchHelper.stitchVal.c / 1920) * correction + (stitchHelper.stitchVal.g / 1920);
                                
                                uvs[ j ].y = z * (stitchHelper.stitchVal.d / 1080) * correction + (stitchHelper.stitchVal.h / 1080);
                        }
                }
        }

        geometry.rotateZ(-Math.PI / 2);
        geometry.rotateY(Math.PI / 2);
	var material = new THREE.MeshBasicMaterial( { map: texture } );
	var mesh = new THREE.Mesh( geometry, material );
    mesh.stitchBall = true;
	scene.add( mesh );

};
