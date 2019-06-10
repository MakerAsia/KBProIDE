# KB-PRO board for KBIDE

This repository is official KB-PRO block and structure board for KBIDE. Build apon esp32-arduino and esp-idf platform with the board's static library that can access all sensor and GPIO in the board.

### Block mode

All block are compatible with arduino-esp32 platform but we provide extended block to easy to access onboard sensors and GPIO
- display -drawing display function
- gpio -add button state and read/write board IO
- sensor -access all board sensor
- music -sound control and synthesis onboard speaker

### Programming mode

All accessible functions are cited in **'include'**  folder, and all pin defination are compatibled with esp32-wrover module

### Schematic 

can be found in static folder

### Change log

Version 1.1.0
 - upgrade code style to arduino-platform v1.0.2
 - add KBSound text to speech library.
 - add KBSound music generator (midi).
 - add display example
 
Version 1.0.1
 - rename block button state to button is presssed and invert logic (button pulled high)
 - add bug to fix next version
### License
MIT
