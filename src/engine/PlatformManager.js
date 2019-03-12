import util from '@/engine/utils';
//import axios from 'axios';
import fs from 'fs';
const os = require('os');
const request = require('request');
const progress = require('request-progress');

const db = Vue.prototype.$db;

var getPlatformInfo = function(name)
{
    return new Promise((resolve,reject) => {
        db.collection('platforms')
            .where("name", "==", name)
            .get()
            .then(platfromData =>{    
                platfromData.forEach(element => {
                    resolve(element.data());                    
                });
            }).catch(err=>{
                reject(err);
            });
    });  
}
var installPlatfromByName = function(name,cb){
    return new Promise((resolve,reject)=>{
        return getPlatformInfo(name);
    }).then(info=>{
        if(info.platform){
            return installPlatfromByName(info.name);
        }
        return info;
    }).then((info)=>{
        if(info){
            if(fs.readdirSync(util.platformDir).includes(info.name)){
                return null;
            }else{ //download file 
                var zipUrl = info.git + "/archive/master.zip";
                var zipFile = os.tmpdir()+'/'+util.randomString(10)+'.zip';
                progress(
                    request(zipUrl),
                    {
                        throttle: 2000, // Throttle the progress event to 2000ms, defaults to 1000ms 
                        delay: 1000,    // Only start to emit after 1000ms delay, defaults to 0ms 
                        followAllRedirects: true,
                        follow : true,
                    }
                ).on('progress', function (state) {
                    cb & cb({process : 'platform', status : 'DOWNLOAD', state:state });
                }).on('error', function (err) {
                    return Promise.reject(err);
                }).on('end', function () { //downloaded
                    return utils.unzip(zipFile,{dir: utils.boardDir},p=>{ 
                        cb & cb({process : 'platform', status : 'UNZIP', state:p });
                    });
                })
                .pipe(fs.createWriteStream(zipFile));
            }
        }else{
            return Promise.reject('no data passing');
        }
    });
};

var updatePlatformByName = function(name){

};

export default {
    installPlatfromByName,
    updatePlatformByName
}