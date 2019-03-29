#include <Arduino.h>
int val = 0;
void setup(){
	Serial.begin(115200);
  	Serial.println("hello world");
}

void loop(){
	Serial.println(val);
  	delay(1000);
  	val++;
}