document.addEventListener('DOMContentLoaded', function () {
  // PeerJS server location
  var SERVER_IP = 'localhost';
  var SERVER_PORT = 8888;

  // var SERVER_IP = '45.55.168.221';
  // var SERVER_PORT = 8001;

  //socketCon.init(SERVER_IP);

  // DOM elements manipulated as user interacts with the app
  var callerIdEntry = document.querySelector('#caller-id');
  var connectBtn = document.querySelector('#connect');
  var recipientIdEntry = document.querySelector('#recipient-id');
  var dialBtn = document.querySelector('#dial');
  var remoteVideo = document.querySelector('#remote-video');
  var localVideo = document.querySelector('#local-video');

  // the ID set for this client
  var callerId = null;
  var peer = null;

  var localStream = null; // local video audio

  // set caller ID and connect to the PeerJS server
  var connect = function () {
    callerId = callerIdEntry.value;

    if (!callerId) {
      webConsole.logError('please set caller ID first');
      return;
    }

    try {

      // create connection to the ID server
      peer = new Peer(callerId, {host: SERVER_IP, port: SERVER_PORT, secure: false});

      // hack to get around the fact that if a server connection cannot
      // be established, the peer and its socket property both still have
      // open === true; instead, listen to the wrapped WebSocket
      // and show an error if its readyState becomes CLOSED

      peer.socket._socket.onclose = function () {
        webConsole.logError('no connection to server');
        peer = null;
      };

      // get local stream ready for incoming calls once the wrapped
      // WebSocket is open
      peer.socket._socket.onopen = function () {
        webConsole.logMessage("handShake Server","Turn Server Go!");
        getLocalStream(); //just get user media
      };


      // handle events representing incoming calls
      peer.on('open',function(id){
        //console.log("peer_id: " + id);
      });

      peer.on('connection',function(connection){
        
        connection.on('open', function() {
            WebRTCDataMethold.connected = true;
        });

        connection.on('data',function(data){
            //console.dir(data);
            WebRTCDataMethold.caching(data);
        });

        WebRTCDataMethold.sendData = function(data){
          if(WebRTCDataMethold.connected){
            connection.send(data);
          }
        }

      });

      peer.on('call', answerNewCall);

    }
    catch (e) {
      peer = null;
      webConsole.logError('error while connecting to server');
    }
  };

  // make an outgoing call
  var dial = function () {
    if (!peer) {
      webConsole.logError('please connect first');
      return;
    }

    if (!localStream) {
      webConsole.logError('could not start call as there is no local camera');
      return;
    }

    var recipientId = recipientIdEntry.value;

    if (!recipientId) {
      webConsole.logError('could not start call as no recipient ID is set');
      return;
    }

    //the connection by dial out
    connection = peer.connect(recipientId+"");

    connection.on('open', function() {
      WebRTCDataMethold.connected = true;

    });

    connection.on('data', function(data) {

      console.log("connection " + data.type + " " + data.text);

      webConsole.logMessage(data.type, data.text);

    });

    var makeTheCall = function(theloaclStream){

        var call = peer.call(recipientId, theloaclStream);

        webConsole.logMessage("Peer","Outgoing call initiated...waitting for Response.");

        call.on('stream', showRemoteStream);//get remote stream back

        call.on('close',function(){
          remoteVideo.style.backgroundColor = "#FFF";
          webConsole.logMessage("Peer", " Roomba has disconnected");
          remoteVideo.src = "img/placeHolderVideo.mp4";
          remoteVideo.loop = "loop";
          WebRTCDataMethold.connected = false;
          //lost connection stop moving! speak to serial port
        });

        call.on('error', function (e) {
          webConsole.logError(e.message);
        });
    }


    getLocalStream(makeTheCall);


  };

  // answer an incoming call
  var answerNewCall = function (call) {
    if (!peer) {
      webConsole.logError('cannot answer a call without a connection');
      return;
    }

    if (!localStream) {
      webConsole.logError('could not answer call as there is no localStream ready');
      return;
    }

    call.on('stream', showRemoteStream);
    call.answer(localStream);

    webConsole.logMessage("Peer", "Incoming call answered");

  };

    var getLocalStream = function (successCb) {//successCb, just callback
    if (localStream && successCb) {
      successCb(localStream);
    }
    else { // create local if do not have one  
      navigator.webkitGetUserMedia(
        {
          video: identity.video,
          audio: identity.audio
        },

        function (stream) {//callback for create url for local video 
          localStream = stream;
          localVideo.src = window.URL.createObjectURL(stream);
          webConsole.logMessage("Local Media", "Local Video Go!");

          if (successCb) {
            successCb(stream);
          }

        },

        function (err) {
          webConsole.logError('failed to access local camera');
          webConsolelogError(err.message);
        }
      );
    }
  };

  // set the "REMOTE" video element source
  var showRemoteStream = function (stream) {

    remoteVideo.src = window.URL.createObjectURL(stream);
    remoteVideo.style.backgroundColor = "#333";

    webConsole.logMessage("On Air","You have telepresence on the other side!");

  };


  WebRTCDataMethold.sendData = function(data){

    if(WebRTCDataMethold.connected){ 
      connection.send(data);
      if(data.type == "DR"){
          animate.speedCalcu(data.lV,data.rV);
      }
    }
    else{
      if(data.type == "DR"){
        animate.speedCalcu(0,0,1);
      }
      else{
        console.warn( "Data did not send, no WebRTC connection: ", data );
      }
    }

  }

  //addEventListener
  connectBtn.addEventListener('click', connect);
  dialBtn.addEventListener('click', dial);

});




//--------webConsole_relative-----------//

  var webConsole = {};

  webConsole.makePara = function ( tag, text ) {
    var p = document.createElement('p');
    p.innerHTML = "<span style = 'font-size:1.25em'>[" + tag + "]</span> " + text; ;
    return p;
  };

  webConsole.addMessage = function (para) {
    var messageBox = document.querySelector('#messages');
    if (messageBox.firstChild) {
      messageBox.insertBefore(para, messageBox.firstChild);
    }
    else {
      messageBox.appendChild(para);
    }
  };

  webConsole.logError = function (text) {
    var p = webConsole.makePara("Error" ,text);
    console.error(text);
    p.style.color = 'red';
    webConsole.addMessage(p);

    if( identity.role == "thetaS" || identity.role == "frontCam"){
      WebRTCDataMethold.FeedBack("Error", text);
    }

  };

  webConsole.logMessage = function (tag, text) {

    if( identity.role == "roomba" ){

      WebRTCDataMethold.FeedBack(tag, text);

    }

    var tagGroup={
                  "Peer": "#FF7700",
                  "handShake Server": "#11FFAA",
                  "Local Media": "#FF11AA",
                  "On Air": "#FF5500",
                  "Touch" : "#FFF",
                  "Error" : "#FF0000",
                }

    var color = '#0580FF';

    var p = webConsole.makePara(tag, text);

    for (var key in tagGroup) {
      if(key == tag){
        p.style.color = tagGroup[key];
      }
    }
    
    webConsole.addMessage(p);
  };
