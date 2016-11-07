
var SerialPort = require("serialport");

//-----------------Demo_SendVal----------------//

var sendVal = [90,138];
var horiArc = 0;
var vertiArc = 0;

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

    horiArc += 0.04;
    vertiArc += 0.05;

    if(horiArc >= 2*Math.PI ){
      horiArc = 0;
    }
    if(vertiArc >= 2*Math.PI ){
      vertiArc = 0;
    }

    sendVal[0] = Math.round(90 + 90*Math.sin(horiArc));
    sendVal[1] = Math.round(138 + 42*Math.sin(vertiArc));

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


//-------------HID-------------//

var hid = require('node-hid');
// var BitArray = require('node-bitarray');
var hidDeviceList = hid.devices();

// Logitech Extreme 3D Pro's vendorID and productID: 1133:49685 (i.e. 046d:c215)
var logiEX = null;

for( i = 0; i < hidDeviceList.length; i++ ){
  if(hidDeviceList[i].vendorId == 1133 && hidDeviceList[i].productId == 49685){
    logiEX = new hid.HID(1133, 49685);

    logiEX.on('data', function (buf) {

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

      // var bits = BitArray.fromBuffer(buf).toJSON().join('').match(/.{1,8}/g).join(' ');
      // console.log(bits, JSON.stringify(controls));
      //console.log(JSON.stringify(controls));
      console.log(controls);
    });

  }
}

if(!logiEX){
    console.log("No Logitech EX 3D Pro was found!");
    console.log("Please plugin to USB");
}
