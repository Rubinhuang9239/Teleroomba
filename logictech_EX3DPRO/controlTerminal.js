
var SerialPort = require("serialport");

//-----------------Demo_SendVal----------------//

var sendVal = [90,138];

var portNameChoice = ["/dev/cu.usbmodem1411", "/dev/cu.usbmodem1421"];
var portName = null;

SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {

    for(i=0; i < portNameChoice.length ;i++){

      if(portNameChoice[i] == port.comName){
        portName = port.comName;

      }

    }

  });

if(portName != null){

  console.log(portName);

  var port = new SerialPort(portName, {
    baudRate: 9600,
    parser: SerialPort.parsers.readline("\n"),
  });


  port.on('open', function() {
    console.log("opened");

    setTimeout(function(){
      port.write("0");
      console.log("Hand shake say hi");
    },2000);  

  });

  var serialData = null;

  port.on( 'data', function(data){

    serialData = data.toString();

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write('\x1b[33m'+"Serial Data>> "+serialData+'\x1b[0m');


    var sendingMSG = sendVal.length + ","; 

    for(var i = 0; i < sendVal.length; i++){


      //-- pack! --//
      if( (sendVal.length > 1) && (i < sendVal.length - 1) ){
        sendingMSG += sendVal[i] + ",";
      }
      else if( i == sendVal.length - 1 ){
        sendingMSG += sendVal[i];
      }

    }

    port.write( sendingMSG );

  });

}

});


//-------------logiEX_HID-------------//

var hid = require('node-hid');
// var BitArray = require('node-bitarray');

// Logitech Extreme 3D Pro's vendorID and productID: 1133:49685 (i.e. 046d:c215)

var logiEX = {};

logiEX.logiEX_HID = null;

logiEX.checkConnection = function(){

  var hidDeviceList = hid.devices();

  for( i = 0; i < hidDeviceList.length; i++ ){
    if(hidDeviceList[i].vendorId == 1133 && hidDeviceList[i].productId == 49685){
      logiEX.logiEX_HID = new hid.HID(1133, 49685);

      logiEX.logiEX_HID.on('data', function (buf) {

        var ch = buf.toString('hex').match(/.{1,2}/g).map(function (c) {
          return parseInt(c, 16);
        });

        var controls = {
          roll: ((ch[1] & 0x03) << 8) + ch[0], // left_right 0 << 512 >> 1023
          pitch: ((ch[2] & 0x0f) << 6) + ((ch[1] & 0xfc) >> 2), // up_down 0 << 512 >> 1023
          yaw: ch[3], //left_right 0 << 128 >> 256
          view: (ch[2] & 0xf0) >> 4, // clockwise 0 >> 7 // 8 for none
          throttle: -ch[5] + 255, // up_down 255 >> 0
          buttons: [
            (ch[4] & 0x01) >> 0, // trigger btn
            (ch[4] & 0x02) >> 1, // thumb btn
            (ch[4] & 0x04) >> 2,
            (ch[4] & 0x08) >> 3,
            (ch[4] & 0x10) >> 4,
            (ch[4] & 0x20) >> 5,
            (ch[4] & 0x40) >> 6,
            (ch[4] & 0x80) >> 7,

            (ch[6] & 0x01) >> 0,
            (ch[6] & 0x02) >> 1,
            (ch[6] & 0x04) >> 2,
            (ch[6] & 0x08) >> 3
          ]
        };

        var servoVal = map.mapServo(controls.roll, controls.pitch);
        sendVal[0] = servoVal.horiVal;
        sendVal[1] = servoVal.vertiVal;

        if(currentSocket){
          if( controls.roll != pVal[0] || controls.pitch != pVal[1]){
            currentSocket.emit("data", { r: controls.roll, p: controls.pitch } );
            pVal[0] = controls.roll;
            pVal[1] = controls.pitch;
            //console.log("send");
          }
        }

      });


      logiEX.logiEX_HID.on('error',function(err){
        console.log("\n[Logitech EX PRO] error:",err);
        logiEX.logiEX_HID = false;
        console.log("[Logitech EX PRO] Try to reconnect to device.");
        setTimeout(function(){
          logiEX.checkConnection();
        },3000);
      });

    }
  }

  if(!logiEX.logiEX_HID){

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write('\x1b[33m'+'[Logitech EX PRO] No Logitech EX 3D Pro was found! Plug in to USB.'+'\x1b[0m');

    setTimeout(function(){
      logiEX.checkConnection();
    },3000);
    
  }
  else{
    console.log("\n[Logitech EX PRO] Logitech EX 3D Pro connected!");
  }

}

logiEX.checkConnection();


var pVal = [0,0];

var map = {};

map.mapFunc = function(input,floor,ceil,MFloor,MCeil){

  var output = null;

  output = MFloor + (MCeil - MFloor) * (input - floor) / (ceil - floor);

  return output

}

map.mapServo = function(roll, pitch){

  var servoVal = {};

  servoVal.horiVal = Math.round(map.mapFunc(roll, 0, 1023, 0, 180));
  servoVal.vertiVal = Math.round(map.mapFunc(pitch, 0, 1023, 96, 180));

  return servoVal;

}


//--------HTTP/HTTPS--------//
//--------Express-----------//
//--------Socket.io---------//


//--------------http-----------------------//
var http = require('http');
//--------------https-----------------------//
var https = require('https');

var express = require('express');
var app = express();

var io = null;

//--------------File_System---------------//

var fs = require('fs');

var httpsOptions = {
   key: fs.readFileSync('my-key.pem'),
   cert: fs.readFileSync('my-cert.pem')
 };

var useHttps = true;

if(useHttps == false){

  httpServer = http.createServer(app);

  httpServer.listen(3000, function(){
      console.log("----------http://localhost----------");
      console.log("Control Term server open on port " + 3000);
  });


  io = require('socket.io')(http);

}
else{

  var httpsServer = https.createServer(httpsOptions,app);

  httpsServer.listen(3000,function(){

    console.log("----------https://localserial.itp.io----------");
    console.log("Control Term server open on port " + 3000);

  });

  io = require('socket.io')(httpsServer);
}

app.use(express.static('public'));

var currentSocket = null;

io.on("connection",function(socket){

  console.log("\n[Socket.io] "+ socket.id + " connected")

  setTimeout(function(){
    currentSocket = socket;
  },100);
  
})


