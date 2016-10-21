'use strict';

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function gotSources(sourceInfos) {

  var myCam = null;

  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    var option = document.createElement('option');
    option.value = sourceInfo.id;
    if (sourceInfo.kind === 'audio') {
      option.text = sourceInfo.label || 'microphone ' +
        (audioSelect.length + 1);
      audioSelect.appendChild(option);
    } else if (sourceInfo.kind === 'video') {

      console.log(sourceInfo);

      if(sourceInfo.label == "Logitech Camera #2 (046d:082c)"){

        myCam = sourceInfo;

        start(myCam);

      }
      else{
        console.log("did not find webCam HD");
      }
      
      option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }

}

if (typeof MediaStreamTrack === 'undefined' ||
    typeof MediaStreamTrack.getSources === 'undefined') {
  alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
} else {
  MediaStreamTrack.getSources(gotSources);
}

function successCallback(stream) {
  window.stream = stream; // make stream available to console
  videoElement.src = window.URL.createObjectURL(stream);
  videoElement.play();
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function start(myCam) {
  if (window.stream) {
    videoElement.src = null;
    window.stream.stop();
  }
  var audioSource = audioSelect.value;
  var videoSource = myCam;//videoSelect.value;
  console.log("start");
  console.log(myCam);
  var constraints = {
    audio: {
      optional: [{
        sourceId: audioSource
      }]
    },
    video: {
      optional: [{
        sourceId: videoSource.id
      }]
    }
  };
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

audioSelect.onchange = start;
videoSelect.onchange = start;

//start();
