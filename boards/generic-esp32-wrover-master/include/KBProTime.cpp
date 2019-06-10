#include "KBProTime.h"
#include "time.h"

const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = 3600*7;// GTM+7 for Bangkok Hanoi Jakata

void KBProTime::sync()
{
    configTime(gmtOffset_sec, 0, ntpServer);
}
int KBProTime::getYear()
{
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)){
        return -1;
    }
    return timeinfo.tm_year + 1900;
}
int KBProTime::getMonth()
{
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)){
        return -1;
    }
    return timeinfo.tm_mon + 1;
}
int KBProTime::getDayOfMonth()
{
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)){
        return -1;
    }
    return timeinfo.tm_mday;
}
int KBProTime::getDayOfWeek()
{
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)){
        return -1;
    }
    return timeinfo.tm_wday;
}
int KBProTime::getHour()
{
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)){
        return -1;
    }
    return timeinfo.tm_hour;
}
int KBProTime::getMinute()
{
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)){
        return -1;
    }
    return timeinfo.tm_min;
}
int KBProTime::getSecond()
{
    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)){
        return -1;
    }
    return timeinfo.tm_sec;
}