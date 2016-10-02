#include <SoftwareSerial.h>
SoftwareSerial roombotSerial(10, 11);//RX/TX

int beepType[] = {0,0};
boolean beeping = false;

void setup() {
  
  //Init Windows/Linux serial port interaction
  Serial.begin(9600);
  Serial.setTimeout(100);
  delay(50);
  //Init software serial port to Roomba
  roombotSerial.begin(115200); 
  delay(50);
  roombotSerial.write(128);  // START
  delay(50);
  roombotSerial.write(131);  // SAFE MODE
  
  //CAUTION!! FULL MODE MAY DAMAGE TELEROOMBA. MUST TESTING IN YOUR RANGE OF VIEW
  //roombotSerial.write(131);
  
}

void loop() {
  // put your main code here, to run repeatedly:
  if( Serial.available() > 0 ){
    int cmd = 0;
    int input1 = 0;
    int input2 = 0;
    cmd = Serial.parseInt();
    input1 = Serial.parseInt();
    input2 = Serial.parseInt();
    
    delay(2);
    Serial.print(cmd);
    Serial.print(' ');
    Serial.print(input1);
    Serial.print(' ');
    Serial.println(input2);
    // [0.standby]
    // [1.drive]
    // [2.roomba beep]
    // [3.dock]
    // [4.enter safe mode again]
    // [5.touch boobs....]
    
    
    if( cmd == 0 ){   //standby
      //Serial.println("standby");
      signed int leftV = 0;
      signed int rightV = 0;
      drive(leftV,rightV);
    }
    else if( cmd == 1 ){  //drive
      //Serial.println("drive");
      signed int leftV = input1;
      signed int rightV = input2;
      drive(leftV,rightV);
    }
    else if( cmd == 2 ){ //start/stop roomba beep
      //Serial.println("handle beep");
      int action = input1; //1.start 2.stop
      int type = input2; //1.police 2.reverse 3.low freq
      handleBeep(action,type);
    }
    else if( cmd == 3 ){ //dock
      //Serial.println("dock");
    }
    else if( cmd == 4 ){ //enter safe mode again
      //Serial.println("restart");
      roombotSerial.write(131); // SAFE MODE
    }
     
    }
    
    if(beeping == true){
       beep();
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

void handleBeep(int action, int type){ //1.start 2.stop, //1.police 2.reverse 3.low freq
  
  if(action == 1){
    beeping = true;
  }
  else if(action == 2){
    beeping = false;
  }
  
  if(type == 1){
    beepType[0] = 88;//police
    beepType[1] = 95;
  }
  else if(type == 2){
    beepType[0] = 87;//reverse
    beepType[1] = 87;
  }
  else if(type == 3){
    beepType[0] = 48;//reverse
    beepType[1] = 56;
  }

}

void beep(){
  
    roombotSerial.write(140);
    roombotSerial.write(1);
    roombotSerial.write(2);
    
    roombotSerial.write(beepType[0]);
    roombotSerial.write(12);
    roombotSerial.write(beepType[1]);
    roombotSerial.write(12);
    
    roombotSerial.write(141);
    roombotSerial.write(1);

}


