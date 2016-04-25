document.addEventListener('DOMContentLoaded', function () {
  // PeerJS server location
  var SERVER_IP = '172.16.247.68';
  var SERVER_PORT = 8888;

  // DOM elements manipulated as user interacts with the app
  var callerIdEntry = document.querySelector('#caller-id');
  var connectBtn = document.querySelector('#connect');
  var recipientIdEntry = document.querySelector('#recipient-id');
  var dialBtn = document.querySelector('#dial');
  var remoteVideo = document.querySelector('#remote-video');
  var localVideo = document.querySelector('#local-video');

  // the ID set for this client
  var callerId = null;

  // PeerJS object, instantiated when this client connects with its
  // caller ID
  var peer = null;
  var connection = null;

  var connected = false;

  // the local video stream captured with getUserMedia()
  var localStream = null;

  // get the local video and audio stream and show preview in the
  // "LOCAL" video element
  // successCb: has the signature successCb(stream); receives
  // the local video stream as an argument
  var getLocalStream = function (successCb) {
    if (localStream && successCb) {
      successCb(localStream);
    }
    else {
      navigator.webkitGetUserMedia(
        {
          audio: true,
          video: true
        },

        function (stream) {
          localStream = stream;
          localVideo.src = window.URL.createObjectURL(stream);
          logMessage("Local Media", "Local Video Go!");

          if (successCb) {
            successCb(stream);
          }

        },

        function (err) {
          logError('failed to access local camera');
          logError(err.message);
        }
      );
    }
  };

  // set the "REMOTE" video element source
  var showRemoteStream = function (stream) {
    remoteVideo.src = window.URL.createObjectURL(stream);
    remoteVideo.style.backgroundColor = "#333";


    logMessage("On Air","You have telepresence on the other side!");

    // if(bleConnection === false){
    // logMessage("<span style = 'color:#5577FF;'>[BLE] </span> Try connecting to hardware!");
    // }
    // else{
    // logMessage("<span style = 'color:#5577FF; font-size:1.5em;'>[BLE] </span> BLE connected!");
    // }

  };

  // set caller ID and connect to the PeerJS server
  var connect = function () {
    callerId = callerIdEntry.value;

    if (!callerId) {
      logError('please set caller ID first');
      return;
    }

    try {
      // create connection to the ID server
      peer = new Peer(callerId, {host: SERVER_IP, port: SERVER_PORT});

      // hack to get around the fact that if a server connection cannot
      // be established, the peer and its socket property both still have
      // open === true; instead, listen to the wrapped WebSocket
      // and show an error if its readyState becomes CLOSED
      peer.socket._socket.onclose = function () {
        logError('no connection to server');
        peer = null;
      };

      // get local stream ready for incoming calls once the wrapped
      // WebSocket is open
      peer.socket._socket.onopen = function (conn) {
        logMessage("Turn Server","Turn Server Go!");
        getLocalStream();
      };


      // handle events representing incoming calls
      peer.on('open',function(id){
        //console.log("peer_id: " + id);
      });

      peer.on('connection',function(conn){

        connection = conn;
        
        connection.on('open', function() {
            connected = true;
            WebRTCDataMethold.connected = true;
        });

        connection.on('data',function(data){
            //console.log("peer " + data);
            //WebRTCDataMethold.caching(data);
            WebRTCDataMethold.caching(data);
        });

        WebRTCDataMethold.sendData = function(data){
          if(connected){ 
            connection.send(data);
          }
        }

        document.addEventListener("click",function(){

          var feedBack = {
            type : "Touch",
            text : "User Touch"
          }

          WebRTCDataMethold.sendData(feedBack);

        })


      });
      
      peer.on('call', answer);



    }
    catch (e) {
      peer = null;
      logError('error while connecting to server');
    }
  };

  // make an outgoing call
  var dial = function () {
    if (!peer) {
      logError('please connect first');
      return;
    }

    if (!localStream) {
      logError('could not start call as there is no local camera');
      return
    }

    var recipientId = recipientIdEntry.value;

    if (!recipientId) {
      logError('could not start call as no recipient ID is set');
      return;
    }



    connection = peer.connect(recipientId+"");

    connection.on('open', function() {
      connected = true;
      WebRTCDataMethold.connected = true;
    });

    connection.on('data', function(data) {

      console.log("connection " + data);
      logMessage(data.type, data.text);

    });


    getLocalStream(function (stream) {
      logMessage("Peer","Outgoing call initiated...waitting for Response.");

      var call = peer.call(recipientId, stream);

      call.on('stream', showRemoteStream);

      call.on('close',function(){
        remoteVideo.style.backgroundColor = "#FFF";
        logMessage("Peer", " Roomba has disconnected");
        remoteVideo.src = "img/placeHolderVideo.mp4";
        remoteVideo.loop = "loop";
        animate.changeDropDownStatus();
      });

      call.on('error', function (e) {
        logError('error with call');
        logError(e.message);
      });
    });
  };

  // answer an incoming call
  var answer = function (call) {
    if (!peer) {
      logError('cannot answer a call without a connection');
      return;
    }

    if (!localStream) {
      logError('could not answer call as there is no localStream ready');
      return;
    }

    logMessage("Peer", "Incoming call answered");

    call.on('stream', showRemoteStream);

    call.answer(localStream);
  };

  // wire up button events
  connectBtn.addEventListener('click', connect);
  dialBtn.addEventListener('click', dial);


  WebRTCDataMethold.sendData = function(data){
    if(connected){ 
      connection.send(data);
    }
  }

});

// DOM utilities
  var makePara = function ( tag, text ) {
    var p = document.createElement('p');
    p.innerHTML = "<span style = 'font-size:1.25em'>[" + tag + "]</span> " + text; ;
    return p;
  };

  var addMessage = function (para) {
    var messageBox = document.querySelector('#messages');
    if (messageBox.firstChild) {
      messageBox.insertBefore(para, messageBox.firstChild);
    }
    else {
      messageBox.appendChild(para);
    }
  };

  var logError = function (text) {
    var p = makePara("Error" ,text);
    console.error(text);
    p.style.color = 'red';
    addMessage(p);

    if( identity.role == "roomba"){
      WebRTCDataMethold.FeedBack("Error", text);
    }

  };



  var logMessage = function (tag, text) {

    if( identity.role == "roomba" ){

      WebRTCDataMethold.FeedBack(tag, text);

    }
    else if( identity.role == "control" ){
      if(tag == "BLE" && text == "RB: -- Done BLE Connectinng --" ){
        alert("-- Your teleRoomba BLE is Connected! --");

          var BLEStatus = document.getElementById("BLEStatus");
          BLEStatus.attributes.class.value = "BLEOn bnt";

      }
    }

    var tagGroup={
                  "BLE": "#0580FF",
                  "Peer": "#FF7700",
                  "Turn Server": "#11FFAA",
                  "Local Media": "#FF11AA",
                  "On Air": "#FF5500",
                  "Touch" : "#FFF",
                  "Error" : "#FF0000",
                }

    var color = '#0580FF';

    var p = makePara(tag, text);

    for (var key in tagGroup) {
      if(key == tag){
        p.style.color = tagGroup[key];
      }
    }
    
    addMessage(p);
  };
