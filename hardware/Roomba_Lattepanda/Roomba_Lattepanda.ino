#include <SoftwareSerial.h>


SoftwareSerial roombotSerial(12, 11);//RX/TX

byte cmd = 1;

void setup() {
  
  //BLE Serial
  Serial.begin(115200);
  
  roombotSerial.begin(115200);  
  roombotSerial.write(128);  // START
  delay(100);
  roombotSerial.write(131);  // SAFE MODE
  
  //roombotSerial.write(131);
  //  CAUTION!! FULL MODE MAY DAMAGE TELEROOMBA. MUST TESTING IN YOUR RANGE OF VIEW
  
}


    signed int leftV = 0;
    signed int rightV = 0;

void loop() {
  // put your main code here, to run repeatedly:
  
  int commed = 0; 

  if( Serial.available() > 0 ){
    commed = Serial.parseInt();
    leftV = Serial.parseInt();
    rightV = Serial.parseInt();
  }
  
   delay(20);
}

void drive(signed int leftV, signed int rightV){

roombotSerial.write(145);//drive_mode

roombotSerial.write(leftV >> 8);
roombotSerial.write(leftV & 0xFF);

roombotSerial.write(rightV >> 8);
roombotSerial.write(rightV & 0xFF);

}
