#include <Arduino.h>
int pin = 17;
void setup(){
  	Serial.begin(115200);
  	Serial.println("Hello world");
	pinMode(pin,OUTPUT);
}

void loop(){
	digitalWrite(pin,LOW);
	delay(100);
  	digitalWrite(pin,HIGH);
	delay(100);
}