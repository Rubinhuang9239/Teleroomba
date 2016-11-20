
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
                                uvs[ j ].x = x * (stitchHelper.stitchPreSets[stitchHelper.currentMode].a / 1920) * correction + (stitchHelper.stitchPreSets[stitchHelper.currentMode].e / 1920);
                                uvs[ j ].y = z * (stitchHelper.stitchPreSets[stitchHelper.currentMode].b / 1080) * correction + (stitchHelper.stitchPreSets[stitchHelper.currentMode].f / 1080);
                        } else {
				var correction = ( x == 0 && z == 0) ? 1 : (Math.acos(-y) / Math.sqrt(x * x + z * z)) * (2 / Math.PI);
                                uvs[ j ].x = -1 * x * (stitchHelper.stitchPreSets[stitchHelper.currentMode].c / 1920) * correction + (stitchHelper.stitchPreSets[stitchHelper.currentMode].g / 1920);
                                
                                uvs[ j ].y = z * (stitchHelper.stitchPreSets[stitchHelper.currentMode].d / 1080) * correction + (stitchHelper.stitchPreSets[stitchHelper.currentMode].h / 1080);
                        }
                }
        }

        geometry.rotateZ( stitchHelper.stitchPreSets[stitchHelper.currentMode].rotateZ ); //-Math.PI / 2);
        geometry.rotateY(Math.PI / 2);
	var material = new THREE.MeshBasicMaterial( { map: texture } );
	var mesh = new THREE.Mesh( geometry, material );
    mesh.stitchBall = true;
	scene.add( mesh );

};
