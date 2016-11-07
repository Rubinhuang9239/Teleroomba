#include <Servo.h>

Servo horizontalServo;
Servo verticalServo;
const int horizontalPin = 3;
const int verticalPin = 5;
int horizontalVal = 90;
int verticalVal = 180;

void setup() {
  // put your setup code here, to run once:
   delay(200);
   horizontalServo.attach(horizontalPin);
   verticalServo.attach(verticalPin);
   
   Serial.begin(9600);
   Serial.setTimeout(0);
   
   horizontalServo.write(horizontalVal);
   verticalServo.write(verticalVal);
}

void loop() {
  
  if(Serial.available() > 0){
      printIntData();
      
    horizontalServo.write(horizontalVal);
    verticalServo.write(verticalVal);
  }
  
  delay(32);
}

void printIntData(){

      //Create a storage array with dynamic size.//
      const int msgSize = Serial.parseInt();
      int dataIn[msgSize];
      
      //
      for(int i = 0; i < msgSize; i++){
        dataIn[i] = Serial.parseInt();
      }
      
      //print the storage array.//
      for(int i=0; i < sizeof(dataIn)/sizeof(int); i++){
        Serial.print(dataIn[i]);
        Serial.print(' ');
      }
      //Don't for get finish sign!
      //See finish sign in Node.js code.//
      Serial.print('\n');

      horizontalVal = dataIn[0];
      verticalVal = dataIn[1];
}
