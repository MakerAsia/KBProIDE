import utils from '@/engine/utils';
import Vue from "vue";
import { timeout } from 'q';
export default {
    persistence : {
        rightTabSize : 50, //percentage
        rightTabCache : [],
        bottomTabSize : 30, //percentage
        bottomTabCache : [],
        rightTabModel : false,
        rightTabModelComponent : false,
        bottomTabModel : false,
        bottomTabModelComponent : false,
        rightTab : [
            /*
            //{id : auto assign --cannot use as index} no use anymore!!!<<<<<<<<<<
            name : tabname use this as removeRightTab parameter. this will be cobined with id 'editor_source-0' assigned as index.
            title : tab title text must be show.
            component : url component load in tab body ,ex './components/editor/RightTabSourcecode'
            */
        ],
        bottomTab : [
            /* same as righttab */
        ],
    },
    data : {
        rightDrawerStatus : false,
        leftDrawerStatus : false,
        snackbarStatus : false,
        snackbarConfig : {
            timeout : 4000,
            color : "",
            x : '',
            y : 'top',
            mode : '',
            text : 'Hello I\'m sneakbar',
        },
        rightDrawerComponent : false,
        leftDrawerComponent : false,
        /* tab */

        global : ()=>{ return Vue.prototype.$global; },
        rightDrawer : function(comp){            
            if(comp){
                console.log('open right drawer' + comp);
                this.rightDrawerComponent = comp;
            }else{
                console.log('close right drawer');
                this.rightDrawerComponent = false;
            }
        },
        leftDrawer : function(comp){
            if(comp){
                this.leftDrawerComponent = comp;
            }else{
                this.leftDrawerComponent = false;
            }
        },
        snackbar : function(text,color,x,y,timeout){            
            if(text){ this.snackbarConfig.text = text;  }
            if(color){ this.snackbarConfig.color = color; }
            if(x){ this.snackbarConfig.x = x; }
            if(y){ this.snackbarConfig.y = y; }
            if(timeout){ this.snackbarConfig.timeout = timeout; }
            this.snackbarStatus = true;
        },
        bottomPanel : function(comp){ //not support yet.

        },
        /* tab function */
        addTab : function(tabName,tabTitle,tabComp,tabs){
            //let lastId = tabs.length;
            tabs.push({
                //id : lastId,
                //tabId : 'rtab-' + tabName+'-' + lastId,
                name : tabName,
                title : tabTitle,
                component : tabComp
            });
            setTimeout(()=>{this.global().$emit('panel-resize',100);},200);
        },
        removeTab : function(tabs,key,name){
            let removeSuccess = false;            
            for(var i = 0; i < tabs.length; i++) {
                if(tabs[i][key] == name) {
                    tabs.splice(i, 1);
                    removeSuccess = true;                    
                    break;
                }
            }
            this.reactiveTab();
            if(removeSuccess){
                setTimeout(()=>{this.global().$emit('panel-resize',100);},300);
            }
        },
        removeTabByName : function(tabs,name){
            this.removeTab(tabs,'name',name);
        },
        removeTabById : function(tabs,id){
            tabs.splice(id, 1);
        },
        reactiveTab : function(){
            let foundR = this.isExistTabKey(this.rightTab,this.rightTabModel);
            let foundB = this.isExistTabKey(this.bottomTab,this.bottomTabModel);
            if(!foundR && this.rightTab.length > 0){
                this.rightTabModel = 'rtab-' + this.rightTab[this.rightTab.length-1].name;
            }
            if(!foundB && this.bottomTab.length > 0){
                this.bottomTabModel = 'btab-' + this.bottomTab[this.bottomTab.length-1].name;
            }
        },     
        /* tab helper function */
        isExistTab : function(tabs,name){
            return tabs.find(o => o.name === name);
        },
        isExistTabKey : function(tabs,key){
            if(key && key.includes("-")){
                let ikey = key.split('-')[1];
                return this.isExistTab(tabs,ikey);
            }
            return false;
        },
        /* public function */
        addRightTab : function(tabName,tabTitle,tabComp){
            let found = this.isExistTab(this.rightTab,tabName);
            if(found){
                this.rightTabModel = 'rtab-'+found.name;
            }else{
                this.addTab(tabName,tabTitle,tabComp,this.rightTab);
                this.rightTabModel = 'rtab-'+this.rightTab[this.rightTab.length - 1].name;
            }
        },
        removeAllTab : function(tabName){
            if(tabName){
                this.removeTabByName(this.rightTab,tabName);
                this.removeTabByName(this.bottomTab,tabName);
            }else{ //close all tab
                this.rightTab = [];
                this.bottomTab = [];
            }
        },
        removeRightTab : function(tabName){
            this.removeTabByName(this.rightTab,tabName);            
        },
        removeRightTabById : function(id){
            this.removeTabById(this.rightTab,id);            
        },        
        addBottomTab : function(tabName,tabTitle,tabComp){
            let found = this.isExistTab(this.bottomTab,tabName);
            if(found){
                this.bottomTabModel = 'btab-'+found.name;
             }else{ 
                 this.addTab(tabName,tabTitle,tabComp,this.bottomTab);
                 this.bottomTabModel = 'btab-'+this.bottomTab[this.bottomTab.length - 1].name;
             }
        },
        removeBottomTab : function(tabName){
            this.removeTabByName(this.bottomTab,tabName);            
        },
        removeBottomTabById : function(id){
            this.removeTabById(this.bottomTab,id);            
        },
        setStatusText : function(text){
            //TODO implement here
        },
        page : function(comp){ 
            //TODO implement here
        },
        backNavigation : function(){
            //TODO implement here
        },
        
    }
}
