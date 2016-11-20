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

	// Test object
	// var demoGeometry = new THREE.SphereGeometry(5,16,16);
	// var demoMaterial = new THREE.MeshBasicMaterial({ color : 0xFF9900, transparent: true, opacity: 0.5, wireframe:true });
	// var mesh = new THREE.Mesh(demoGeometry, demoMaterial);
	// scene.add(mesh);

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

    function setOrientationControls(e) {

    	if(e){//detect if the device support orientation
        	if (!e.alpha) {
          	return;
        	}
    	}

    	HUDSystem.switchGyroMode();

        controls = new THREE.DeviceOrientationControls(camera, true);

        document.body.addEventListener('touchend', fullscreen);
        window.removeEventListener('deviceorientation', setOrientationControls, true);
	}

 	//controls.enableDamping = true; // Damp is not recommeded;
	//controls.dampingFactor = 0.32;

	window.addEventListener('deviceorientation', setOrientationControls, true);

    animateLoop();


	function fullscreen() {
		//console.log("hi");
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
	}

}



function resizeScene(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}


function animateLoop() {

				requestAnimationFrame( animateLoop );
			    HUDSystem.update();

				render();

			}


function render() {
	
        if( !settingDB.headset ){
            renderer.render( scene, camera );
        }else{
            effect.render(scene, camera);
        }
}



