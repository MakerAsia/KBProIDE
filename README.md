
# KBProIDE

## Windows Install
use node v10.15.0 (but v8 also work too) and need Anaconda python2
first run CMD as Administrator and install build tool first 
- git clone --recursive https://github.com/MakerAsia/KBProIDE
- cd KBProIDE 
- git submodule init
- git submodule update
- (cmd as Administrator) npm install --global --production windows-build-tools
- npm uninstall -g vue-cli && npm install -g @vue/cli
- npm install
- npm run electron:rebuild
- npm run electron:rebuild-serial

## MacOS Install
- git clone --recursive https://github.com/MakerAsia/KBProIDE
- cd KBProIDE 
- git submodule init
- git submodule update
- npm uninstall -g vue-cli && npm install -g @vue/cli
- npm install
- npm run electron:rebuild
- npm run electron:rebuild-serial

## Linux Install
- sudo apt-get install python-pip git nodejs npm
- sudo pip install pyserial
- git clone --recursive https://github.com/MakerAsia/KBProIDE
- cd KBProIDE 
- git submodule init
- git submodule update
- sudo npm uninstall -g vue-cli //if new install no need this command
- sudo npm install -g @vue/cli
- npm install
- npm run electron:rebuild
- npm run electron:rebuild-serial
- (add Serial permission to user) $sudo adduser $USER dialout
## Run
- npm run electron:serve

## Build
- npm run electron:build

## Test
- npm run test:unit

## License

[MIT]
