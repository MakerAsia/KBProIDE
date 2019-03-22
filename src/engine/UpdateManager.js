import util from '@/engine/utils';
const fs = require('fs')

var getOnlineInfo = function(path)
{
    return new Promise((resolve,reject)=>{
        var onlineData = [];
        Vue.prototype.$db.collection(path)
            .orderBy("name")            
            .get().then(data =>{
                data.forEach(element => {
                    onlineData.push(element.data());
                });
                resolve(onlineData);
            }).catch(err=>{
                reject(err);
            });
    });
};

var getNotification = function()
{
    //getOnlineInfo
};

var updateApp = function()
{

};

var checkApp = function(){
    var appInfo = require('@/config.js');
    console.log(appInfo);
};

var checkBoard = function(){

};

var checkPlatfrom = function(){
    
};

var checkPackage = function(){

};

var checkPlugin = function(){

};

var run = function()
{
    setTimeout(t => {
        checkApp();
    },1000);
}
export default {
    run,
    updateApp
}