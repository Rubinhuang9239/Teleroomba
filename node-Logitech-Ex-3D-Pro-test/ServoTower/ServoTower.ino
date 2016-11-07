#include <Servo.h>

Servo horizontalServo;
Servo verticalServo;
const int horizontalPin = 3;
const int verticalPin = 5;
int horizontalVal = 90;
int verticalVal = 180;

float horiArc = 0;
float vertiArc = 0;


void setup() {
  // put your setup code here, to run once:
   delay(200);
   horizontalServo.attach(horizontalPin);
   verticalServo.attach(verticalPin);
}

void loop() {
  
  horiArc += 0.04;
  vertiArc += 0.05;
  
  if(horiArc >= 2*PI ){
    horiArc = 0;
  }
  if(vertiArc >= 2*PI ){
    vertiArc = 0;
  }
  
  horizontalVal = 90 + 90*sin(horiArc);
  verticalVal = 138 + 42*sin(vertiArc);
  
  // put your main code here, to run repeatedly:
  horizontalServo.write(horizontalVal);
  verticalServo.write(verticalVal);
  
  delay(40);
}
