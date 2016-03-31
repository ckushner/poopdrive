// transmitter.pde
//
// Simple example of how to use VirtualWire to transmit messages
// Implements a simplex (one-way) transmitter with an TX-C1 module
//
// See VirtualWire.h for detailed API docs
// Author: Mike McCauley (mikem@airspayce.com)
// Copyright (C) 2008 Mike McCauley
// $Id: transmitter.pde,v 1.3 2009/03/30 00:07:24 mikem Exp $

#include <VirtualWire.h>

const char *msg1 = "U1,1";
const char *msg2 = "U1,0";
int inPin = A1;
int analogVal = 0;
int delayTime = 100;
int state = 0;
int loopCount = 10;
void setup()
{
    Serial.begin(9600);	  // Debugging only
    Serial.println("setup");
    
    analogReference(DEFAULT);
    // Initialise the IO and ISR
    vw_set_ptt_inverted(true); // Required for DR3100
    vw_setup(2000);	 // Bits per sec

    state = 0;
}

void loop()
{
    analogVal = analogRead(inPin);
    Serial.println(analogVal,DEC);
    if (analogVal > 500 && state == 0) //state change to occupied
    {
      state = 1;
      for (int i = 0; i < loopCount; i++)
      {
        digitalWrite(13, true); // Flash a light to show transmitting
        vw_send((uint8_t *)msg1, strlen(msg1));
        vw_wait_tx(); // Wait until the whole message is gone
        Serial.println("sent message, supposedly");
        digitalWrite(13, false);
        delay(delayTime);
      }
    }
    if (analogVal < 500 && state == 1) // state change to unoccupied
    {
      state = 0;
      for (int i = 0; i < loopCount; i++)
      {
        digitalWrite(13, true); // Flash a light to show transmitting
        vw_send((uint8_t *)msg2, strlen(msg2));
        vw_wait_tx(); // Wait until the whole message is gone
        Serial.println("sent message, supposedly");
        digitalWrite(13, false);
        delay(delayTime);
      }
    }
  /*  else
    {
      digitalWrite(13, true); // Flash a light to show transmitting
      vw_send((uint8_t *)msg2, strlen(msg2));
      vw_wait_tx(); // Wait until the whole message is gone
      digitalWrite(13, false);
      delay(200);      
    }
    */
    delay(delayTime);
}
