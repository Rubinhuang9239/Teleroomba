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
  
}


    signed int leftV = 0;
    signed int rightV = 0;

void loop() {
  // put your main code here, to run repeatedly:
  
  
    if (Serial.available()){
  
      cmd = Serial.read();
      if(cmd > 105){
      leftV = cmd - 160;
      }
      else if(cmd < 105){
      rightV = cmd - 50;
      }
      drive(leftV*8,rightV*8);
      }

      
    //delay(10);
    
//    signed int lv = leftV+50;
//    signed int rv = rightV+50;
//    byte buffer[5] = {0xAD,
//                      (byte)(lv),
//                      (byte)(lv >> 8),
//                      (byte)(rv),
//                      (byte)(rv >> 8),
//                     };
//    Serial.write(buffer, sizeof(buffer));
    delay(42);
}

void drive(signed int leftV, signed int rightV){

roombotSerial.write(145);//drive_mode

roombotSerial.write(leftV >> 8);
roombotSerial.write(leftV & 0xFF);

roombotSerial.write(rightV >> 8);
roombotSerial.write(rightV & 0xFF);

}
