#include <Arduino.h>
#include <vector>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>
#include "KBProTime.h"
#include "BluetoothSerial.h"

using namespace std;

KBProTime kbprotime;
BluetoothSerial SerialBT;

Number ballSpeed;
Number barYPos;
Number ballXDir;
Number ballXPos;
Number fpsDelay;
Number ballYDir;
Number ballYPos;
Boolean enterGame;
Number cpuScore;
Number humanScore;
 void compute();
 void render();
 void reset();


void compute(){
          if (ballXDir) {
    ballXPos = ballXPos + ballSpeed;
  } else {
    ballXPos = ballXPos - ballSpeed;
  }
  if (ballYDir) {
    ballYPos = ballYPos + ballSpeed;
  } else {
    ballYPos = ballYPos - ballSpeed;
  }
  if (ballXPos >= 125) {
    if ((ballYPos >= barYPos - 3) && (ballYPos <= barYPos + 20)) {
      ballXDir = !ballXDir;
      fpsDelay = fpsDelay - 1;
    } else {
      cpuScore = cpuScore + 1;
      delay(1000);
      reset();
    }
  }
  if (ballXPos <= 2) {
    ballXDir = !ballXDir;
  }

          return;

}


void render(){
          display.clear();

  display.setFont(ArialMT_Plain_10);
  display.drawString(0,0,String(((String("CPU:")+String(cpuScore)))));

  display.setFont(ArialMT_Plain_10);
  display.drawString(95,0,String(((String("YOU:")+String(humanScore)))));
  display.fillCircle(ballXPos,ballYPos,2);
  display.fillRect(125,barYPos,3,20);
  display.fillRect(0,ballYPos,3,10);
  display.display();

          return;

}


void reset(){
          ballSpeed = 1;
  fpsDelay = 30;
  ballXPos = 64;
  ballYPos = 32;
  ballXDir = 1;
  ballYDir = 1;
  barYPos = 32;

          return;

}


void setup()
{
  
  
    pinMode(37,INPUT_PULLUP);
  pinMode(38,INPUT_PULLUP);
  pinMode(39,INPUT_PULLUP);
  enterGame = false;
  reset();
  humanScore = 0;
  cpuScore = 0;

  display.setFont(ArialMT_Plain_24);
  display.drawString(30,20,String(String("PONG")));

  display.setFont(ArialMT_Plain_10);
  display.drawString(28,50,String(String("cheating version")));
  display.display();
  delay(3000);
  while (!enterGame) {
    if (digitalRead(38) == 0) {
      enterGame = true;
    }
    delay(50);
  }
  display.clear();

  display.setFont(ArialMT_Plain_24);
  display.drawString(20,20,String(String("START")));
  display.display();
  delay(500);
  display.clear();


}
void loop()
{
  /**
 * Describe this function...
 */
/**
 * Describe this function...
 */
/**
 * Describe this function...
 */
  if ((!digitalRead(14))) {
    barYPos = barYPos + 2;
  }
  if ((!digitalRead(15))) {
    barYPos = barYPos - 2;
  }
  if (ballYPos < 0) {
    ballYDir = !ballYDir;
  }
  if (ballYPos > 64) {
    ballYDir = !ballYDir;
  }
  compute();
  render();
  delay(fpsDelay);

  
}