var SerialPort = require("serialport");

// var express = require("express");
// var app = express();

var io = require("socket.io")(3000);

io.on('connection', function (socket) {
  console.log(socket.id);
});




//-------SerialPort----------//

//Unix MacOS
var portNameChoice = ["/dev/cu.usbmodem1411", "/dev/cu.usbmodem1421"];
portName = null;

SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    // console.log(port.pnpId);
    // console.log(port.manufacturer);

    for(i=0; i < portNameChoice.length ;i++){

      if(portNameChoice[i] == port.comName){
        portName = port.comName;
        // console.log("ok " + i);
      }

    }

  });



  if(portName != null){

    var myPort = new SerialPort(portName, {
       baudRate: 9600,
       // look for return and newline at the end of each data packet:
       parser: SerialPort.parsers.readline("\n")
     });



    myPort.on('open', function() {
      // myPort.write(120, function(err) {
      //   if (err) {
      //     return console.log('Error on write: ', err.message);
      //   }
      //   console.log('message go');
      // });
      console.log("Serial opened on " + portName);
    });

    myPort.on('data', function(data) {
      console.log(data);
      //myPort.flush();
      myPort.write("265,800,420\n");
    });

    // open errors will be emitted as an error event
    myPort.on('error', function(err) {
      console.log('Error: ', err.message);
    });

    }

    else{
      console.log("No avaliable serial port")
    }
});

