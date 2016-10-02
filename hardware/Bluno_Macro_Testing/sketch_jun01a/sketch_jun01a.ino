#include <SoftwareSerial.h>
SoftwareSerial roombotSerial(10, 11);//RX/TX

int police[] = {88,95};
int reverse[] = {88,88};

void setup() {
  // put your setup code here, to run once:
    roombotSerial.begin(115200);  
    roombotSerial.write(128);  // START
    
      // put your main code here, to run repeatedly:
  delay(300);
  roombotSerial.write(131);

}

void loop() {
  beep();
}

void beep(){
  
  roombotSerial.write(140);
  roombotSerial.write(1);
  roombotSerial.write(2);
  
  roombotSerial.write(reverse[0]);
  roombotSerial.write(8);
  
  roombotSerial.write(reverse[1]);
  roombotSerial.write(8);
  
  //delay(20);
  
  roombotSerial.write(141);
  roombotSerial.write(1);

}


