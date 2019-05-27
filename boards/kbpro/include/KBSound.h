#ifndef KBSOUND_H
#define KBSOUND_H

#include <Arduino.h>
#include <vector>
#include <inttypes.h>


#define SAY_BUFFER_SIZE     24	// 24 sets of 4 bytes plus added queue indexes is about 100 added bytes.
class Talkie
{
	public:
		void say(const uint8_t * address);
		int8_t sayQ(const uint8_t * address);
		const uint8_t * ptrAddr;
		uint8_t ptrBit;
		uint8_t active( void );
		uint8_t getBits(uint8_t bits);
		bool setPtr(const uint8_t * addr);
		bool say_add( const uint8_t *addr );	// sayisr() calls this
		const uint8_t * say_remove();	// sayisr() calls this
	private:
		// Say queue
		const uint8_t *  say_buffer[SAY_BUFFER_SIZE];
		uint8_t head; // init on setup = 0
		uint8_t tail; // init on setup = 0
		uint8_t free; // init on setup = SAY_BUFFER_SIZE
		
		// Setup
		uint8_t setup;
		
		// Bitstream parser
		uint8_t rev(uint8_t a);
};


class KBSound
{
    public:
    	void speak(String word);
        void speak(std::vector<uint8_t *>words);
        void speak(std::vector<const uint8_t *>words);
        void speak(double number,int deep = 0);
    	void speak(uint8_t *word);
    	void speak(const uint8_t *word);
    	void setVolume(int level);
    private:
    	Talkie voice;
};


#endif