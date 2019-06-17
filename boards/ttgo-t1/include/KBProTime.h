#ifndef KBPROTIME_H
#define KBPROTIME_H

#if(ARDUINO >= 100)
    #include "Arduino.h"
#else
    #include "WProgram.h"
#endif

#include "time.h"

class KBProTime
{
    public:
        void sync(void);
        int getYear(void);
        int getMonth(void);
        int getDayOfMonth(void);
        int getDayOfWeek(void);
        int getHour(void);
        int getMinute(void);
        int getSecond(void);    
};
/*
class KBPROHTTP
{
    public:
        String httpGet(String url);
        String httpPost(String url,String data,const char* contentType);        
};*/

#endif