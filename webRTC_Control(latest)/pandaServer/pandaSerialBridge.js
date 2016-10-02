var SerialPort = require("serialport");
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
    console.log("");
    console.log("");
    console.log("---------------|  Roomba Testing  |-----------------");
    console.log("");
    console.log("Server is on port 3000");
});

app.use(express.static('public'));

var drive = {
  lV : 0,
  rV : 0
};


//-------SerialPort----------//

//Unix MacOS
var portNameChoice = ["/dev/cu.usbmodem1411", "/dev/cu.usbmodem1421"];
portName = null;
var panda_arduino_Port = null;

SerialPort.list(function (err, ports) {
  ports.forEach(function(port) {
    //console.log(port);
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

    panda_arduino_Port = new SerialPort(portName, {
       baudRate: 9600,
       // look for return and newline at the end of each data packet:
       parser: SerialPort.parsers.readline("\n")
     });
    console.log(panda_arduino_Port);

    panda_arduino_Port.on('open', function() {
      console.log("Serial opened on " + portName);

      setInterval(function(){
        panda_arduino_Port.write(1 + "," + drive.lV + "," + drive.rV + "\n");
      },40)

    });

    panda_arduino_Port.on('data', function(data) {
      //data feed check
      console.log(">> " + data);

    });

    // open errors will be emitted as an error event
    panda_arduino_Port.on('error', function(err) {
      console.log('Error: ', err.message);
    });

    }

    else{
      console.log("No avaliable serial port")
    }
});

//---------Socket.io------------//

io.on('connection', function (socket) {
  console.log(socket.id);

  socket.on("drive",function(data){

    drive = data;

  })
  

});
