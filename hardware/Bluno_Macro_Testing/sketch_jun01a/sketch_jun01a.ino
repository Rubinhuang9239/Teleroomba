#include <SoftwareSerial.h>
SoftwareSerial roombotSerial(10, 11);//RX/TX

int tones[] = {76,16,76,16,76,32,76,16,76,16,76,32,76,16,79,16};

void setup() {
  // put your setup code here, to run once:
    roombotSerial.begin(115200);  
    roombotSerial.write(128);  // START
    
    delay(2500);
  roombotSerial.write(131);
  
  roombotSerial.write(140);
  roombotSerial.write(1);
  roombotSerial.write(4);
  
  roombotSerial.write(tones[0]);
  roombotSerial.write(tones[1]);
  
  roombotSerial.write(tones[2]);
  roombotSerial.write(tones[3]);
  
  roombotSerial.write(tones[4]);
  roombotSerial.write(tones[5]);
  
  roombotSerial.write(tones[6]);
  roombotSerial.write(tones[7]);
  
  delay(30);
  
  roombotSerial.write(141);
  roombotSerial.write(1);


}

void loop() {
  // put your main code here, to run repeatedly:

}

int songLoadProcess = 0;

void songLoader(int songName){

  if( songLoadProcess == 0){
    roombotSerial.write(140);
    roombotSerial.write(1);
    roombotSerial.write( sizeof(songName) );
  }
  
  songLoadProcess++;
  
  if( songLoadProcess > sizeof(songName)){
    songLoadProcess = 0;
    return;
  }
  else{
    songLoader(songName);
  }

}
