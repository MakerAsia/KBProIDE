const path = require("path");
const fs = require("fs");
const Transform = require("stream").Transform;
const yauzl = require('yauzl');
var concat = require('concat-stream')
var _0777 = parseInt('0777', 8);


function mkdirp (p, cb,made) {        
    //var mode = _0777 & (~process.umask());
    p = path.resolve(p);
    if (!made) made = null;
    fs.mkdir(p, {recursive: false}, (er) => {
        if (!er) {
            made = made || p;
            return cb(null, made);
        }
        switch (er.code) {
            case 'ENOENT':
                mkdirp(path.dirname(p),function (er, made) {
                    if (er) cb(er, made);
                    else mkdirp(p, cb, made);
                });
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                fs.stat(p, function (er2, stat) {
                    // if the stat fails, then that's super weird.
                    // let the original error be the failure reason.
                    if (er2 || !stat.isDirectory()) cb(er, made)
                    else cb(null, made);
                });
                break;
        }
    });
}

function unzip(zipPath, opts, fcb){
  return new Promise((resolve,reject)=> {
    yauzl.open(zipPath, {lazyEntries: true}, (err, zipfile) => {
      var lastProgress = 0;
      if (err) reject(err);
      var handleCount = 0;
      function incrementHandleCount() {
        handleCount++;
      }
      function decrementHandleCount() {
        handleCount--;
        if (handleCount === 0) {
          resolve(); //console.log("all input and output handles closed");          
        }
      }
      incrementHandleCount();
      zipfile.on("close", function() {        
        decrementHandleCount();//console.log("closed input file");
      });

      zipfile.readEntry();
      zipfile.on("entry", function(entry) {        
        var dest = path.join(opts.dir, entry.fileName);
        var mode = (entry.externalFileAttributes >> 16) & 0xFFFF;
        var IFMT = 61440,IFDIR = 16384,IFLNK = 40960;
        var symlink = (mode & IFMT) === IFLNK;
        var isDir = (mode & IFMT) === IFDIR;                  
        if (!isDir && entry.fileName.slice(-1) === '/') { // Failsafe, borrowed from jsZip
          isDir = true;
        }        
        // check for windows weird way of specifying a directory
        // https://github.com/maxogden/extract-zip/issues/13#issuecomment-154494566
        var madeBy = entry.versionMadeBy >> 8;
        if (!isDir) isDir = (madeBy === 0 && entry.externalFileAttributes === 16)
        if (mode === 0) {// if no mode then default to default modes
          if (isDir) {
            if (opts.defaultDirMode) mode = parseInt(opts.defaultDirMode, 10)
            if (!mode) mode = 493; // Default to 0755
          } else {
            if (opts.defaultFileMode) mode = parseInt(opts.defaultFileMode, 10)
            if (!mode) mode = 420; // Default to 0644
          }
        }
        var umask = ~process.umask();
        var procMode = mode & umask;
        var destDir = dest;
        if (!isDir) destDir = path.dirname(dest);
        if(isDir){
          mkdirp(destDir, function() {
            if (err){ reject(err); }
            zipfile.readEntry();
          });
        }else{
          mkdirp(destDir, function() {
            zipfile.openReadStream(entry, function(err, readStream) {
              if (err) reject(err); // report progress through large files
              /*var byteCount = 0;
              var totalBytes = entry.uncompressedSize;              
              var progressInterval = setInterval(function() { // report progress at 60Hz
                fcb({status:'PROGRESS',data : {byteCount : byteCount, totalBytes : totalBytes, percentage : ((byteCount / totalBytes * 100) | 0)}});
              }, 1000 / 60);*/
              var filter = new Transform();
              filter._transform = function(chunk, encoding, cb) {
                //byteCount += chunk.length;
                cb(null, chunk);
              };
              filter._flush = function(cb) {
                //clearInterval(progressInterval);
                cb();
                let percentage = ((zipfile.entriesRead / zipfile.entryCount * 100) | 0);
                if(Math.floor(percentage / 10) > lastProgress){
                  lastProgress = Math.floor(percentage / 10);
                  fcb({
                    entry : zipfile.entriesRead,
                    entryCount : zipfile.entryCount, 
                    percentage : percentage
                  });
                }               
                zipfile.readEntry();
              };
              // pump file contents
              if (symlink){
                readStream.pipe(concat(function (data) {
                  var link = data.toString();
                  fs.symlink(link, dest, function (err) {//debug('creating symlink', link, dest)
                    if (err) reject(err);
                  });
                }));
              }else{
                var writeStream = fs.createWriteStream(dest,{mode: procMode});
                incrementHandleCount();
                writeStream.on("close", decrementHandleCount);
                readStream.pipe(filter).pipe(writeStream);
              }            
            });
          });
        }   
      });
    });
  });
}
export default {
  unzip
}