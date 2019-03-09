const path = require("path");
const fs = require("fs");
const Transform = require("stream").Transform;
const yauzl = require('yauzl');

function mkdirP (p, opts, f, made) {
    if (typeof opts === 'function') {
        f = opts;
        opts = {};
    }
    else if (!opts || typeof opts !== 'object') {
        opts = { mode: opts };
    }
    
    var mode = opts.mode;
    var xfs = opts.fs || fs;
    
    if (mode === undefined) {
        mode = _0777 & (~process.umask());
    }
    if (!made) made = null;
    
    var cb = f || function () {};
    p = path.resolve(p);
    
    xfs.mkdir(p, mode, function (er) {
        if (!er) {
            made = made || p;
            return cb(null, made);
        }
        switch (er.code) {
            case 'ENOENT':
                mkdirP(path.dirname(p), opts, function (er, made) {
                    if (er) cb(er, made);
                    else mkdirP(p, opts, cb, made);
                });
                break;

            // In the case of any other error, just see if there's a dir
            // there already.  If so, then hooray!  If not, then something
            // is borked.
            default:
                xfs.stat(p, function (er2, stat) {
                    // if the stat fails, then that's super weird.
                    // let the original error be the failure reason.
                    if (er2 || !stat.isDirectory()) cb(er, made)
                    else cb(null, made);
                });
                break;
        }
    });
}
function uzip(zipPath, opts, cb){
    return new Promise((resolve,reject)=> {
        if (path.isAbsolute(opts.dir) === false) {
            reject('Target directory is expected to be absolute');
        }
        mkdirp(opts.dir, function (err) {
            if (err) { reject(err); }
            fs.realpath(opts.dir, function (err, canonicalDir) {
              if (err) { reject(err); }        
              opts.dir = canonicalDir;
              openZip(opts);
            })
        });
        function openZip () {
            yauzl.open(zipPath, {lazyEntries: true}, function (err, zipfile) {
                if (err) { reject(err); }
                var cancelled = false;
                zipfile.readEntry();
                zipfile.on('close', function () {
                    if (!cancelled) { //finish extraction
                      resolve();
                    }
                });
                zipfile.on('entry', function (entry) {
                    if (cancelled) {
                        debug('skipping entry', entry.fileName, {cancelled: cancelled});
                        return;
                    }
                    if (/^__MACOSX\//.test(entry.fileName)) { // dir name starts with __MACOSX/
                        zipfile.readEntry()
                        return;
                    }
                    var destDir = path.dirname(path.join(opts.dir, entry.fileName));
                    mkdirp(destDir, function (err) {
                        if (err) {
                          cancelled = true;
                          zipfile.close();
                          return cb(err)
                        }
              
                        fs.realpath(destDir, function (err, canonicalDestDir) {
                          if (err) {
                            cancelled = true
                            zipfile.close()
                            return cb(err)
                          }
              
                          var relativeDestDir = path.relative(opts.dir, canonicalDestDir)
              
                          if (relativeDestDir.split(path.sep).indexOf('..') !== -1) {
                            cancelled = true
                            zipfile.close()
                            return cb(new Error('Out of bound path "' + canonicalDestDir + '" found while processing file ' + entry.fileName))
                          }
              
                          extractEntry(entry, function (err) {
                            // if any extraction fails then abort everything
                            if (err) {
                              cancelled = true
                              zipfile.close()
                              return cb(err)
                            }
                            debug('finished processing', entry.fileName)
                            zipfile.readEntry()
                          })
                        })
                    });
                });
            });
        }
    });


  function openZip () {
    debug('opening', zipPath, 'with opts', opts)

    yauzl.open(zipPath, {lazyEntries: true}, function (err, zipfile) {
      if (err) return cb(err)

      var cancelled = false

      zipfile.readEntry()

      zipfile.on('close', function () {
        if (!cancelled) {
          debug('zip extraction complete')
          cb()
        }
      })

      zipfile.on('entry', function (entry) {
        if (cancelled) {
          debug('skipping entry', entry.fileName, {cancelled: cancelled})
          return
        }

        debug('zipfile entry', entry.fileName)

        if (/^__MACOSX\//.test(entry.fileName)) {
          // dir name starts with __MACOSX/
          zipfile.readEntry()
          return
        }

        var destDir = path.dirname(path.join(opts.dir, entry.fileName))

        
      })

      function extractEntry (entry, done) {
        if (cancelled) {
          debug('skipping entry extraction', entry.fileName, {cancelled: cancelled})
          return setImmediate(done)
        }

        if (opts.onEntry) {
          opts.onEntry(entry, zipfile)
        }

        var dest = path.join(opts.dir, entry.fileName)

        // convert external file attr int into a fs stat mode int
        var mode = (entry.externalFileAttributes >> 16) & 0xFFFF
        // check if it's a symlink or dir (using stat mode constants)
        var IFMT = 61440
        var IFDIR = 16384
        var IFLNK = 40960
        var symlink = (mode & IFMT) === IFLNK
        var isDir = (mode & IFMT) === IFDIR

        // Failsafe, borrowed from jsZip
        if (!isDir && entry.fileName.slice(-1) === '/') {
          isDir = true
        }

        // check for windows weird way of specifying a directory
        // https://github.com/maxogden/extract-zip/issues/13#issuecomment-154494566
        var madeBy = entry.versionMadeBy >> 8
        if (!isDir) isDir = (madeBy === 0 && entry.externalFileAttributes === 16)

        // if no mode then default to default modes
        if (mode === 0) {
          if (isDir) {
            if (opts.defaultDirMode) mode = parseInt(opts.defaultDirMode, 10)
            if (!mode) mode = 493 // Default to 0755
          } else {
            if (opts.defaultFileMode) mode = parseInt(opts.defaultFileMode, 10)
            if (!mode) mode = 420 // Default to 0644
          }
        }

        debug('extracting entry', { filename: entry.fileName, isDir: isDir, isSymlink: symlink })

        // reverse umask first (~)
        var umask = ~process.umask()
        // & with processes umask to override invalid perms
        var procMode = mode & umask

        // always ensure folders are created
        var destDir = dest
        if (!isDir) destDir = path.dirname(dest)

        debug('mkdirp', {dir: destDir})
        mkdirp(destDir, function (err) {
          if (err) {
            debug('mkdirp error', destDir, {error: err})
            cancelled = true
            return done(err)
          }

          if (isDir) return done()

          debug('opening read stream', dest)
          zipfile.openReadStream(entry, function (err, readStream) {
            if (err) {
              debug('openReadStream error', err)
              cancelled = true
              return done(err)
            }

            readStream.on('error', function (err) {
              console.log('read err', err)
            })

            if (symlink) writeSymlink()
            else writeStream()

            function writeStream () {
              var writeStream = fs.createWriteStream(dest, {mode: procMode})
              readStream.pipe(writeStream)

              writeStream.on('finish', function () {
                done()
              })

              writeStream.on('error', function (err) {
                debug('write error', {error: err})
                cancelled = true
                return done(err)
              })
            }

            // AFAICT the content of the symlink file itself is the symlink target filename string
            function writeSymlink () {
              readStream.pipe(concat(function (data) {
                var link = data.toString()
                debug('creating symlink', link, dest)
                fs.symlink(link, dest, function (err) {
                  if (err) cancelled = true
                  done(err)
                })
              }))
            }
          })
        })
      }
    })
  }
}
function unzip(zipFilePath,targetPath,zipcallback){
    return new Promise((resolve, reject)=>{
        yauzl.open(zipFilePath, {lazyEntries: true}, (err, zipfile) => {
            if (err){ reject(err); }
            // track when we've closed all our file handles
            var handleCount = 0;
            function incrementHandleCount() {
                handleCount++;
            }
            function decrementHandleCount() {
                handleCount--;
                if (handleCount === 0) {
                    console.log("all input and output handles closed");
                    resolve();
                }
            }
        
            incrementHandleCount();
            zipfile.on("close", function() {
                console.log("closed input file");
                decrementHandleCount();
            });
        
            zipfile.readEntry();
            zipfile.on("entry", function(entry) {
                if (/\/$/.test(entry.fileName)) {
                    // directory file names end with '/'
                    mkdirp(entry.fileName, function() {
                        if (err) { reject(err); }
                        zipfile.readEntry();
                    });
                } else {
                    // ensure parent directory exists
                    mkdirp(path.dirname(entry.fileName), function() {
                        zipfile.openReadStream(entry, function(err, readStream) {
                            if (err) { reject(err); }
                            // report progress through large files
                            var byteCount = 0;
                            var totalBytes = entry.uncompressedSize;
                            // report progress at 60Hz
                            var progressInterval = setInterval(function() {                                
                                zipcallback({byteCount : byteCount, totalBytes : totalBytes, percent : ((byteCount / totalBytes * 100) | 0)});
                            }, 1000 / 60);
                            var filter = new Transform();
                            filter._transform = function(chunk, encoding, cb) {
                                byteCount += chunk.length;
                                cb(null, chunk);
                            };
                            filter._flush = function(cb) {
                                clearInterval(progressInterval);
                                cb();
                                zipfile.readEntry();
                            };
                            // pump file contents
                            var writeStream = fs.createWriteStream(entry.fileName);
                            incrementHandleCount();
                            writeStream.on("close", decrementHandleCount);
                            readStream.pipe(filter).pipe(writeStream);
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