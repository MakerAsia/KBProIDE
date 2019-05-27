
# KBProIDE

## Windows Install
use node v10.15.0 (but v8 also work too) and need Anaconda python2
first run CMD as Administrator and install build tool first 
- git clone --recursive https://github.com/MakerAsia/KBProIDE
- cd KBProIDE 
- git submodule update
- (cmd as Administrator) npm install --global --production windows-build-tools
- npm uninstall -g vue-cli && npm install -g @vue/cli
- npm install
- npm run electron:rebuild
- npm run electron:rebuild-serial

## MacOS Install
- git clone --recursive https://github.com/MakerAsia/KBProIDE
- cd KBProIDE 
- git submodule update
- npm uninstall -g vue-cli && npm install -g @vue/cli
- npm install
- npm run electron:rebuild
- npm run electron:rebuild-serial

## Linux (we test on x64)
- git clone --recursive 
- cd KBProIDE 
- git submodule update
- sudo npm uninstall -g vue-cli
- sudo npm install -g @vue/cli
- npm install
- npm run electron:rebuild
- npm run electron:rebuild-serial

## Run
- npm run electron:serve

## Build
- npm run electron:build
- npm run build-mac # copy boards and platforms for macOS

## License

[MIT]
