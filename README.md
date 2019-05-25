
# KBProIDE

## Windows Install
use node v10.15.0 (but v8 also work too) and need Anaconda python2
first run CMD as Administrator and install build tool first 
- (cmd as Administrator) npm install --global --production windows-build-tools
- npm uninstall -g vue-cli && npm install -g @vue/cli
- npm install
- npm run electron:rebuild
- npm run electron:rebuild-serial

## MacOS Install
- npm uninstall -g vue-cli && npm install -g @vue/cli
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
