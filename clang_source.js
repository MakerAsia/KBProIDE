#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiAP.h>
#include <WebServer.h>

#include <Wire.h>
#include <RtcDS1307.h>

RtcDS1307<TwoWire> RTC1(Wire);



void setup()
{
  RTC1.Begin();
    RtcDateTime RTC1_compiled = RtcDateTime(__DATE__, __TIME__);
    // printDateTime(RTC1_compiled);

    if (!RTC1.IsDateTimeValid())
    {
      if (RTC1.LastError() != 0)
      {

      }
      else
      {
        RTC1.SetDateTime(RTC1_compiled);
      }
    }

    if (!RTC1.GetIsRunning())
    {
      RTC1.SetIsRunning(true);
    }

    RtcDateTime RTC1_now = RTC1.GetDateTime();
    if (RTC1_now < RTC1_compiled)
    {
      RTC1.SetDateTime(RTC1_compiled);
    }
    else if (RTC1_now > RTC1_compiled)
    {

    }
    else if (RTC1_now == RTC1_compiled)
    {

    }

    RTC1.SetSquareWavePin(DS1307SquareWaveOut_Low);
  pinMode(25,OUTPUT);
}
void loop()
{
    delay(500);

  
}
