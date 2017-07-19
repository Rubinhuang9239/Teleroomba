#include <SoftwareSerial.h>
SoftwareSerial roombotSerial(10, 11);//RX/TX

//#include <Servo.h>
#include <Adafruit_TiCoServo.h>

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h>
#endif

//NeoPixel
#define LED 6//5
#define LEDNUM 12
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(LEDNUM, LED, NEO_GRB + NEO_KHZ800);
float ledTimer = 0;
int ledDir = 0;

//Beep
int beepType[] = {0,0};
boolean beeping = false;

//Debug Switch
#define debugSwitch 12

//Servo
#define SERVO_PIN_R    10
#define SERVO_PIN_P    9

Adafruit_TiCoServo servoR;
Adafruit_TiCoServo servoP;

//Servo servoR;
//Servo servoP;
//int servoRpin = 3; //Roll//Pitch
//int servoPpin = 6;
int servoRVal = 90;
int servoPVal = 128;

void setup() {
  
  //Init Windows/Linux serial port interaction
  pinMode(debugSwitch,INPUT);
  
  Serial.begin(38400);
  while(!Serial){
                //[Empty] wait for Serial Established
                };
  Serial.setTimeout(0);
  Serial.println("ready");
  
  pixels.begin(); // This initializes the NeoPixel library.
  pixels.setBrightness(25);
  
  servoR.attach(SERVO_PIN_R, 600, 2400);
  servoP.attach(SERVO_PIN_P, 240, 2450);

  
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
   

        int cmd = Serial.parseInt();
        int input1 = Serial.parseInt();
        int input2 = Serial.parseInt();
        
        int input3 = -1;
        int input4 = -1;
        
        //-------Incoming_CMDs------//
        // [0.standby]
        // [1.drive]
        // [2.roomba beep]
        // [3.dock]
        // [4.enter safe mode again]
        
            if(cmd >= 5){
              input3 = Serial.parseInt();
              input4 = Serial.parseInt();

              servoRVal = input3;
              servoPVal = input4;
              
              cmd = cmd - 5;  
            }
            
                
              if( cmd == 0 ){   //standby
                //Serial.println("standby");
                signed int leftV = 0;
                signed int rightV = 0;
                //if(abs(leftV)<=50 && abs(leftV)<=50){}
                drive(leftV,rightV);
              }
              else if( cmd == 1 ){  //drive
                signed int leftV = input1;
                signed int rightV = input2;
                drive(leftV,rightV);
              }
              else if( cmd == 2 ){ //start/stop roomba beep
                int action = input1; //1.start 2.stop
                int type = input2; //1.police 2.reverse 3.low freq
                handleBeep(action,type);
              }
              else if( cmd == 3 ){ //dock
                roombotSerial.write(131); // Seek dock
              }
              else if( cmd == 4 ){ //enter safe mode again
                roombotSerial.write(131); // SAFE MODE
              }
             
        
            //Serial Feed
           if( digitalRead(debugSwitch) == HIGH ){
              Serial.print(cmd);
              Serial.print(' ');
              Serial.print(input1);
              Serial.print(' ');
              Serial.print(input2);
              if( input4 != -1 ){// extend feedback
                Serial.print(' ');
                Serial.print(servoRVal);
                Serial.print(' ');
                Serial.print(servoPVal);
              }
          }
          
          Serial.print('\n');
        
    
    }
    
    if(beeping == true){
       beep();
    }

    ledTimer += 0.05;
    if( ledTimer > PI ){
      ledTimer = 0;
      pixels.setPixelColor(ledDir, pixels.Color( 0, 0 , 0 ));
      pixels.show();
      ledDir++;
      if(ledDir >= 12){
        ledDir = 0;
      }
    }
     
    int ledC = int((20 + 125 * sin(ledTimer)));
    
    for(int i = ledDir;i < ledDir+2; i++){
        pixels.setPixelColor(i, pixels.Color(  145-ledC, ledC , ledC ));
    }
    pixels.show();
   
    servoR.write(servoRVal);
    servoP.write(servoPVal);   
     
    delay(41);
   
}

void drive(signed int leftV, signed int rightV){
  
  leftV = leftV*10;
  rightV = rightV*10;

  roombotSerial.write(145);//drive_mode
  
  roombotSerial.write(rightV >> 8);
  roombotSerial.write(rightV & 0xFF);
  
  roombotSerial.write(leftV >> 8);
  roombotSerial.write(leftV & 0xFF);

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
