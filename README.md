
# KBProIDE [![Build Status](https://travis-ci.com/MakerAsia/KBProIDE.svg?branch=master)](https://travis-ci.com/MakerAsia/KBProIDE)

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
- npx vue-cli-service test:unit --watchAll

## Update submodules
- git config submodule.recurse true
- git pull --recurse-submodules
- git submodule update --recursive --remote
- git submodule foreach "(git checkout master; git pull)"

## Release
- cp mac/kbide.app/Contents/Resources/app.asar update.asar
- zip -9 1.0.0-darwin.zip update.asar


## License

[MIT]
