// XTronical DAC Audio Library, currently supporting ESP32
// May work with other processors and/or DAC's with or without modifications
// (c) XTronical 2018, Licensed under GNU GPL 3.0 and later, under this license absolutely no warranty given
// See www.xtronical.com for documentation
// This software is currently under active development (Jan 2018) and may change and break your code with new versions
// No responsibility is taken for this. Stick with the version that works for you, if you need newer commands from later versions
// you will have to alter your original code to work with the new if required.

#include "MusicDefinitions.h";

#define BUFFER_SIZE 600						    // Size of buffer to store data to send to DAC. 3 bytes minimum!
												// 600 bytes (Default) should allow for very slow main loops
												// that repeat only about every 100Hz, If your main loop is much faster
												// than this and the VAST majority will be you can safely reduce this size
												// without any issues down to an absolute minimum of 3 bytes
												// If you experience sound slowing down then you need to increase
												// Buffer memory.
												// If your main loop is very very slow but you want to keep buffer
												// memory low then consider calling the DAC_Audio_Class FillBuffer
												// routine more than once in you main loop. Although to be affective
												// they should not be called in quick succession but farther apart in
												// time on your main loop.
												// Use the routine MaxBufferUsage in your main loop to output the max
												// buffer memory (via serial monitor) that your loop is using, you can
												// then set you buffer memory very precisely
												

uint8_t SetVolume(uint8_t Volume);				// returns the sound byte value adjusted for the volume passed


class XT_PlayListItem_Class
{
	protected:	
	//virtual uint32_t CalcPlayTime();
	
	public:
	// These are the linked list items for the sounds to play through the DAC:
	XT_PlayListItem_Class *PreviousItem=0;		// used in linked list of wavs
	XT_PlayListItem_Class *NextItem=0;	
	bool Playing=false;							// true if currently being played else false
	uint32_t PlayingTime;						// Total playing time of this item in 1000's of a second
	uint32_t TimeElapsed;						// Total playing time elapsed so far in 1000's of a second
	uint32_t TimeLeft;							// Total playing time left so far in 1000's of a second
	
	uint8_t LastValue;							// Last value returned from NextByte function below
	uint8_t Volume;								// volume 0 min, 127 max
	virtual uint8_t NextByte();				 	// to be overridden by any descendants
	virtual void Init();						// initialize any default values
};


// The Main Wave class for sound samples
class XT_Wav_Class : public XT_PlayListItem_Class
{
	protected:
	//uint32_t CalcPlayTime();
	
	public:      
	uint16_t SampleRate;  
	uint32_t DataSize=0;                         // The last integer part of count
	uint32_t DataIdx=44;
	unsigned char *Data;  
	float IncreaseBy=0;                         // The amount to increase the counter by per call to "onTimer"
	float Count=0;                              // The counter counting up, we check this to see if we need to send
	int32_t LastIntCount=-1;                    // The last integer part of count
	
	// constructors
	XT_Wav_Class(unsigned char *WavData);
	
	// functions
	uint8_t NextByte();
	void Init();						 		// initialize any default values
};





// Envelope class for instruments to use, see www.xtronical.com for details
class XT_EnvelopePart_Class
{
	// Definition of a single part of a sound envelope
	
	private:	
	uint16_t Duration;									// How long this part plays for in 1000's of a second
	
	public:
	uint8_t TargetVolume;								// volume to reach in this part 0-127
	uint32_t RawDuration;								// duration ins 50,000's of a second

	XT_EnvelopePart_Class *PreviousPart=0;				
	XT_EnvelopePart_Class *NextPart=0;					
	
	// functions
	void SetDuration(uint16_t Duration);
	uint16_t GetDuration();
	
};


class XT_Envelope_Class
{
	// Envelope definition contains basically a linked list of Envelope parts
	// Using the envelope class you can have basic ADSR envelopes or more complex (or even simpler) ones
	
	public:
	XT_EnvelopePart_Class *FirstPart=0;          	// start of linked list of envelope parts
	XT_EnvelopePart_Class *LastPart=0;          	// start of linked list of envelope parts
	XT_EnvelopePart_Class *CurrentEnvelopePart=0;	// Current active envelope part
	
	uint32_t DurationCounter;						// counts down until 0 for next envelope part
	float VolumeIncrement=0;;							// amount to increase volume by per sample
	float CurrentVolume=0;
	bool EnvelopeCompleted;							// Envelope completed
	
	XT_Envelope_Class();
	void Init();
	XT_EnvelopePart_Class* AddPart(uint16_t Duration,uint16_t TargetVolume);
	void InitEnvelopePart(XT_EnvelopePart_Class* EPart,uint8_t LastVolume);	
};




class XT_Wave_Class
{
	// Base wave class for all others to inherit from
	// Every Instrument must have a wave form class, by default if none specified
	// then uses square
	
	protected:
	uint8_t CurrentByte=255;
	float ChangeAmplitudeBy;
	float NextAmplitude;
	float CounterStartValue;
	float Counter;	
	
	public:
	uint16_t Frequency;							// Note frequency
	virtual uint8_t NextByte();
	virtual void Init(int8_t Note);
	
};





class XT_SquareWave_Class : public XT_Wave_Class
{
	// Square wave class
	public:	
	uint8_t NextByte();
	void Init(int8_t Note);
	
};




class XT_TriangleWave_Class : public XT_Wave_Class
{
	// Square wave class
	public:	
	uint8_t NextByte();
	void Init(int8_t Note);
	
};




class XT_SawToothWave_Class : public XT_Wave_Class
{
	// Square wave class
	public:	
	uint8_t NextByte();
	void Init(int8_t Note);
	
};

class XT_SineWave_Class : public XT_Wave_Class
{
	// Square wave class
	private:
		float AngleIncrement;						// The amount the angle changes per sample
		float CurrentAngle;							// The angle of the current sample
	public:	
	uint8_t NextByte();
	void Init(int8_t Note);
	
};



// Instrument class, main class for producing sounds, from simple tones to more complex sounds
// on it's own it will only produce simple tones, but in combination with an
// envelope object it can be made to simulate more complex audio/ instruments
class XT_Instrument_Class : public XT_PlayListItem_Class
{
	// max frequency depends on the type of wave being produced :
	// Square wave : 25Khz
	// Triangle :
	// Sawtooth :
	// Sine :
	// If you exceed the max then the max freq. will be used, no error returned
	
	private:
		uint8_t CurrentByte;						// value currently being sent to DAC
		bool SoundCompleted;						// true when sound has completed - not the 
		uint32_t SoundDurationCounter;				// count down to 0 then stops sound,
		uint32_t DurationCounter;					// count down to 0 then marks as completed	
		void ClearEnvelopes();
		
		// functions that set up instruments, called in the "SetInstrument" function below
		// must be private to stop calling directly and forgetting to clear any envelopes
		void SetDefaultInstrument();
		void SetPianoInstrument();
		void SetHarpsichordInstrument();
		void SetOrganInstrument();
		void SetSaxophoneInstrument();
		
	public:
		int8_t Note=-1;								// as listed in MusicDefinitions.h
		uint32_t SoundDuration;						// Sound Duration, how long sound is heard
		uint32_t Duration;							// Duration before marked as completed
		XT_Envelope_Class* Envelope=0;				// Any envelope associated with this Instrument 
		XT_Wave_Class* WaveForm=0;						// i.e. square, sawtooth, sine, triangle
		
		// Constructors
		XT_Instrument_Class();
		XT_Instrument_Class(int16_t InstrumentID);
		XT_Instrument_Class(int16_t InstrumentID, uint8_t Volume);
		
		// functions
		uint8_t NextByte();
		void Init();						 		// initialize any default values
		void SetWaveForm(uint8_t WaveFormType);
		void SetInstrument(uint16_t Instrument);
		
	
};







// Music Score class

class XT_MusicScore_Class:public XT_PlayListItem_Class
{
	// a class that handles basic musical scores (sheet music) to allow the play back of a single
	// musical score for 1 instrument, at present cannot handle chords
	
	private:
		uint32_t ChangeNoteEvery;							// how often to change to a new note 
															// in 50,000's of a second (the internal
															// sample rate sent to the DAC
															// calculated from the tempo value below
		uint32_t ChangeNoteCounter;							// countdown counter for the above
		uint16_t ScoreIdx;									// Index position of next note to play
		uint16_t RepeatIdx;									// number of plays countdown counter
	public:
		XT_Instrument_Class* Instrument;					// The instrument to use
		uint16_t Tempo;										// In Beats Per Min (as used in music)
		
		int8_t* Score=0;									// the score itself, consists of the note
															// and then optionally an alteration to the
															// default duration. By default a note will
															// play for 1 beat, if you pass a beat after 
															// note then it's the beat in 1/4 beats, i.e.
															// 1 = 0.25 beat,2=0.5 beat, 3=0.75, 4=1 beat 
															// (the default) 5=1.25 beats etc. up to 
															// 126 (31.5 beats)
															// The note should be passed as a negative value
															// of the real index into the frequency array
															// you do not need to worry about this if you
															// use the preset defines in the Pitches.h
															// file
															// a value of -127 must be put at the end 
															// of the data to signify the end. Again use 
															// defines in Pitches.h
		
		uint16_t Repeat;									// Number of times to play, 1 to 65535 or set to
															// 0 for infinite. If you want to stop playing
															// before the repeats have completed then just
															// set the "completed" property to true;
															
		// constructors		 				
		XT_MusicScore_Class(int8_t* Score);
		XT_MusicScore_Class(int8_t* Score,uint16_t Tempo);
		XT_MusicScore_Class(int8_t* Score,uint16_t Tempo,XT_Instrument_Class* Instrument);
		XT_MusicScore_Class(int8_t* Score,uint16_t Tempo,XT_Instrument_Class* Instrument,uint16_t Repeat);
		XT_MusicScore_Class(int8_t* Score,uint16_t Tempo,uint16_t InstrumentID,uint16_t Repeat);
		
		// override functions
		uint8_t NextByte();
		void Init();				
		void SetInstrument(uint16_t InstrumentID);
	
};

class XT_MultiPlay_Class:public XT_PlayListItem_Class
{
	// allows you to queue up many playlist items one after the other with minimum effort
	
	private:
		XT_PlayListItem_Class *CurrentItem=0;			// current item playing from within the list
		XT_PlayListItem_Class *FirstItem=0;          	// first play list item to play in linked list
		XT_PlayListItem_Class *LastItem=0;          	// last play list item to play in linked list
	// the class itself is a playlist item
	public:	
		uint8_t NextByte();
		void Init();		
		void AddPlayItem(XT_PlayListItem_Class *PlayItem);
};







// the main class for using the DAC to play sounds
class XT_DAC_Audio_Class
{
  
	private:
		XT_PlayListItem_Class *FirstPlayListItem=0;          	// first play list item to play in linked list
		XT_PlayListItem_Class *LastPlayListItem=0;          	// last play list item to play in linked list
	public:

		XT_DAC_Audio_Class(uint8_t TheDacPin, uint8_t TimerNo);

		void FillBuffer();										// Fills the buffer of values to send to the DAC, put in your
																// main loop, see BUFFER_SIZE comments at top of code.
		uint8_t MixBytesToPlay();
		void Play(XT_PlayListItem_Class *Sound);
		void Play(XT_PlayListItem_Class *Sound,bool Mix);
		void StopAllSounds();
		void RemoveFromPlayList(volatile XT_PlayListItem_Class *ItemToRemove);
		void AverageBufferUsage();
		
	

};

                                                          