var SerialPort = require("serialport");

// var express = require("express");
// var app = express();

var io = require("socket.io")(3000);

io.on('connection', function (socket) {
  console.log(socket.id);

  socket.on("drive",function(data){

    drive.lv = data[0];
    drive.rv = data[1];

    console.log(data);

  })

});

var drive = {
  lv: 0,
  rv: 0
}



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
      console.log("Serial opened on " + portName);
    });

    myPort.on('data', function(data) {
      //data feed check
      console.log(data);

      myPort.write(drive.lv + "," + drive.rv + "\n");
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

