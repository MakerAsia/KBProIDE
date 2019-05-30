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


class AudioFileSource
{
  public:
    AudioFileSource() {};
    virtual ~AudioFileSource() {};
    virtual bool open(const char *filename) { (void)filename; return false; };
    virtual uint32_t read(void *data, uint32_t len) { (void)data; (void)len; return 0; };
    virtual uint32_t readNonBlock(void *data, uint32_t len) { return read(data, len); }; 
    virtual bool seek(int32_t pos, int dir) { (void)pos; (void)dir; return false; };
    virtual bool close() { return false; };
    virtual bool isOpen() { return false; };
    virtual uint32_t getSize() { return 0; };
    virtual uint32_t getPos() { return 0; };
    virtual bool loop() { return true; };
};

class AudioFileSourcePROGMEM : public AudioFileSource
{
  public:
    AudioFileSourcePROGMEM();
    AudioFileSourcePROGMEM(const void *data, uint32_t len);
    virtual ~AudioFileSourcePROGMEM() override;
    virtual uint32_t read(void *data, uint32_t len) override;
    virtual bool seek(int32_t pos, int dir) override;
    virtual bool close() override;
    virtual bool isOpen() override;
    virtual uint32_t getSize() override;
    virtual uint32_t getPos() override { if (!opened) return 0; else return filePointer; };

    bool open(const void *data, uint32_t len);

  private:
    bool opened;
    const void *progmemData;
    uint32_t progmemLen;
    uint32_t filePointer;
};


#define TSF_NO_STDIO
#include "tsf.h"

class MIDIGenerator
{
  public:
    MIDIGenerator() { freq=8000; };
    virtual ~MIDIGenerator(){};
    bool SetSampleRate(int newfreq) {
      if (isRunning()) return false;
      freq = newfreq;
      return true;
    }
    bool begin();
    bool stop();
    void playNote(int track,int note,float duration,int bpm);
    inline bool isRunning(){ return running; };

  private:
    int freq;
    tsf *g_tsf;
    struct tsf_stream afsSF2;
    AudioFileSource *sf2;
    
  protected:
  	bool running = false;
    unsigned long tempo;            /* current tempo in usec/qnote */

    // tsf_stream <-> AudioFileSource
    static int afs_read(void *data, void *ptr, unsigned int size);
    static int afs_tell(void *data);
    static int afs_skip(void *data, unsigned int count);
    static int afs_seek(void *data, unsigned int pos);
    static int afs_close(void *data);
    static int afs_size(void *data);
    void MakeStreamFromAFS(AudioFileSource *src, tsf_stream *afs);
};


class KBSound
{
    public:
        void speak(std::vector<uint8_t *>words);
        void speak(std::vector<const uint8_t *>words);
        void speak(double number,int deep = 0);
    	void speak(uint8_t *word);
    	void speak(const uint8_t *word);
    	void setVolume(int level);
    	int  getVolume(void);
    	void playNote(int track,int note,float duration,int bpm);
    	void playNotes(int track,std::vector<std::pair<int,float>> notes,int bpm);
    	void playNotes(int track,std::vector<int> notes,int bpm);
    	bool begin(int timerPort);
    private:
    	Talkie voice;
    	MIDIGenerator midi;
    	bool setup = false;
    	hw_timer_t* timer;
};

#endif