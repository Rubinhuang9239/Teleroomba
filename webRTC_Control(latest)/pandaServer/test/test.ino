void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  Serial.setTimeout(0);
}

//char skip = ',';

void loop() {
  // put your main code here, to run repeatedly:
  int read1 = 0; 
  int read2 = 0;
  int read3 = 0; 
  if( Serial.available() > 0 ){
    read1 = Serial.parseInt();
    read2 = Serial.parseInt();
    read3 = Serial.parseInt();
  }
  delay(40);
  Serial.print(read1);
  Serial.print(' ');
  Serial.print(read2);
  Serial.print(' ');
  Serial.println(read3);
  //Serial.println(read+1);
  //Serial.write("1");
}
