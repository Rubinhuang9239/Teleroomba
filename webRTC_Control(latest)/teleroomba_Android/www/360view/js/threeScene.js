// A Demo to use webGL features from Teleroomba
// Setup a regular THREE scene, obit control and VR stereo view in this code.

var scene = null ;
var camera = null;
var renderer = null;
var controls = null;
var effect = null;

function initThree(){// init Three and Orbit Controls
    
    scene = new THREE.Scene();
	var width  = window.innerWidth;
	var height = window.innerHeight;
	var fov    = 100;
	var aspect = width / height;
	var near   = 0.01;
	var far    = 4000;
	camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.set( 0, 0, 0.001 );


	renderer = new THREE.WebGLRenderer( { alpha: true } );
    renderer.setClearColor( 0x000000, 0 );
	renderer.setSize( width, height );
	var rendererDom = renderer.domElement;
    var container = document.getElementById("threeContainer");
	container.appendChild( rendererDom );

	window.addEventListener('resize', function(){
	  resizeScene();
	});

	effect = new THREE.StereoEffect(renderer);
	effect.setSize(width, height);

	var directionalLight = new THREE.DirectionalLight( 0xffffff );
	directionalLight.position.set( 0, 0.7, 0.7 );
	scene.add( directionalLight );

	controls = new THREE.OrbitControls(camera, container);
	controls.noPan = true;
    controls.zoomSpeed = 2;

 	//controls.enableDamping = true; // Damp is not recommeded;
	//controls.dampingFactor = 0.32;

    animateLoop();

}

function resizeScene(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}


function animateLoop() {

				requestAnimationFrame( animateLoop );

			    HUDSystem.update();
				//controls.update(); // only do the camera damp when their is no HUD. // Damp is not recommeded;

				render();

			}


function render() {
	
        if( !settingDB.headset ){
            renderer.render( scene, camera );
        }else{
            effect.render(scene, camera);
        }
}

