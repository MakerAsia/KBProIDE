module.exports = {
    name : 'arduino-library-converter',
    title : 'Arduino Library Converter',
    description : 'Arduino library to KBIDE plugin converter',
    auther : 'Comdet Phueadphut',
    website : 'fb.com/comdet',
    git : 'https://github.com/comdet/arduino-library-converter',
    image : '/static/display.jpg',
    version : '0.1.0',
    component : [
        'converter-page',
    ],
    data : {
        loaded : false , //this will automatic set to 'true' if this pacakage loaded to IDE
    },
    persistence : {
        
    }
};