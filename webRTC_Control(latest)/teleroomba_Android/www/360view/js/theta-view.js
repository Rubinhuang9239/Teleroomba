var scene = new THREE.Scene();
	var width  = window.innerWidth;
	var height = window.innerHeight;
	var fov    = 100;
	var aspect = width / height;
	var near   = 1;
	var far    = 1000;
	var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 0, 0.01 );


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


	// PCで閲覧時にマウスドラッグで操作
	var controls = new THREE.OrbitControls(camera, element);
	//controls.rotateUp(Math.PI / 4);
	controls.noPan = true;

        ( function renderLoop () {
        requestAnimationFrame( renderLoop );

        //if( !settingDB.headset ){
        	renderer.render( scene, camera );
        // }else{
        // 	effect.render(scene, camera);
        // }
          
        } )();


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

var theta_view = function (video_id) {

	//console.log(scene);

	if(scene.children[1]){
		scene.remove(scene.children[1]);
	}

	var video = document.getElementById( video_id );
	var texture = new THREE.VideoTexture( video );
	texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
	texture.format = THREE.RGBFormat;

	var geometry = new THREE.SphereGeometry(100, 32, 32, 0);
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
	scene.add( mesh );
};
