<template>
    <div>
        <v-toolbar>
            <v-btn icon class="hidden-xs-only">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Arduino Library Converter | v0.1.0</v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-slot:extension>
                <v-tabs
                    v-model="tabs"
                    fixed-tabs
                    color="transparent"
                >
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                    <v-tab href="#tab-import">Import<v-icon right>fa-download</v-icon></v-tab>
                    <v-tab href="#tab-design">Block Design<v-icon right>fa-puzzle-piece</v-icon></v-tab>
                    <v-tab href="#tab-example">Example Creator<v-icon right>fa-area-chart</v-icon></v-tab>
                    <v-tab href="#tab-export">Export<v-icon right>fa-upload</v-icon></v-tab>
                </v-tabs>
            </template>
        </v-toolbar>
        <v-tabs-items v-model="tabs">
            <v-tab-item value="tab-import">
                <v-container grid-list-xl>
                    <v-layout row wrap>
                        <v-flex xs10 offset-xs1>
                            <v-card>
                                <v-card-text>
                                    <p class="title text-xs-center">Input arduino repo</p>
                                    <v-divider></v-divider>
                                    <v-text-field  
                                        v-model="targetGit"
                                        append-outer-icon="fa-search"
                                        prepend-inner-icon="fa-github"
                                        clear-icon="mdi-close-circle"
                                        clearable
                                        label="arduino github repo https://github.com/user/repo/"
                                        type="text"
                                        @click:append-outer="parseGit"
                                    ></v-text-field>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs10 offset-xs1 v-if="libJson != null">
                            <v-card>
                                <v-card-text>
                                    <div>
                                        <p class="title text-xs-center">Edit library.properties</p>
                                        <v-divider></v-divider>
                                        <vue-json-editor v-model="libJson" :show-btns="false"></vue-json-editor>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs10 offset-xs1>
                            <v-card>
                                <v-card-text>
                                    <p  class="title text-xs-center">Select function to create block</p>
                                    <v-divider></v-divider>
                                    <p class="body-2 mt-2 mb-0">Servo.h</p>
                                    <v-switch v-model="ex11" label="xxxx" color="primary" value="red" hide-details></v-switch>
                                    <v-switch v-model="ex11" label="xxxx" color="primary" value="red" hide-details></v-switch>
                                    <v-switch v-model="ex11" label="xxxx" color="primary" value="red" hide-details></v-switch>
                                    <v-switch v-model="ex11" label="xxxx" color="primary" value="red" hide-details></v-switch>
                                    <v-switch v-model="ex11" label="xxxx" color="primary" value="red" hide-details></v-switch>
                                    <v-switch v-model="ex11" label="xxxx" color="primary" value="red" hide-details></v-switch>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-tab-item>

            <v-tab-item value="tab-design">
                
            </v-tab-item>

            <v-tab-item value="tab-example">
                <v-card flat>
                    <v-card-text>test</v-card-text>
                </v-card>
            </v-tab-item>

            <v-tab-item value="tab-export">
                <v-card flat>
                    <v-card-text>test</v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>
<script>
import vueJsonEditor from 'vue-json-editor'
import { Promise } from 'q';
const request = require('request-promise');

var parseClass = function(source){
    var classMatch = /class\s*([_0-9A-Za-z]+)\s*(?:\:\s*(?:public)?\s*(?:[_0-9A-Za-z]+)?\s*)*\{(.*?)\};/gms.exec(source);
    //parse class
    if(classMatch && classMatch.length == 3){
        var className = classMatch[1];
        var sourceCode = classMatch[2];
    }
    //public section
    let publicSection1 = /public:(.*?)(?:private:)/gms.exec("#START " + sourceCode + " #END");
    let publicSection2 = /public:(.*?)#END/gms.exec("#START " + sourceCode + " #END");
    let publicSection = '';
    publicSection += ((publicSection1 && (publicSection1.length == 2))? publicSection1[1] : '')
    publicSection += ((publicSection2 && (publicSection2.length == 2))? publicSection2[1] : '')
    
    return { 
        class: className, 
        code : sourceCode, 
        public : publicSection, 
        constructors : parseConstructor(publicSection) 
    };
};

var parseParameter = function(source){

};

var parseConstructor = function(className,source){
    let constructorRegex = new RegExp(`${className}\s*\((.*?)\);`, "gm");
    let constructors = [], result;
    while ( (result = constructorRegex.exec(source)) ) {
        let c = {
            name : className,
            parameters : parseParameter(result[1])
        }
        constructors.push(c);
    }
    return constructors;
}

var parseFunction = function(source){
    let f1 = /^\s*/gm
};
export default {
    components: {
         vueJsonEditor 
    },
    data () {
        return {
            tabs: null,
            targetGit : 'https://github.com/RoboticsBrno/ESP32-Arduino-Servo-Library/',
            gitContent : null,
            libJson : null,
            publicFunction : null,
            cppIncSource : [],
        }
    },
    methods:{
        parseGit(){
            let mother = this;
            this.cppIncSource = [];
            let url = this.targetGit;
            let urlPart = /https?:\/\/github\.com\/(.*?)\/(.*?)\/$/g.exec(url);
            if(urlPart && urlPart.length == 3){
                let contentUriApi = `https://api.github.com/repos/${urlPart[1]}/${urlPart[2]}/contents`;
                var repoStructure = null;
                request.get(contentUriApi,{json:true})
                .then(body=>{
                    repoStructure = body;
                    let libfile = body.find(obj=>obj.name == "library.properties");
                    return request.get(libfile.download_url);
                })
                .then(libPropRaw => {
                    let lines = libPropRaw.split('\n');
                    let libJson = {};
                    for(let i in lines){
                        let data = lines[i].split('=');
                        if(data.length == 2){
                            libJson[data[0]] = data[1];
                        }
                    }
                    mother.libJson = libJson;
                    if(repoStructure.find(obj=>obj.name == "src" && obj.type == 'dir')){
                        let srcContentApi = `https://api.github.com/repos/${urlPart[1]}/${urlPart[2]}/contents/src`;
                        return request.get(srcContentApi,{json:true});
                    }else{
                        return repoStructure;
                    }
                })
                .then(srcContents => {
                    let hFile = srcContents.filter(obj => obj.name.endsWith('.h') || obj.name.endsWith('.hpp'));
                    return new Promise((resolve,reject)=>{
                        hFile.forEach((val, key, arr) =>{
                            let fileInfo = hFile[key];
                            request.get(fileInfo.download_url)
                            .then(incData=>{
                                fileInfo.sourceCode = incData;
                                mother.cppIncSource.push(fileInfo);
                                if (Object.is(arr.length - 1, key)) { //last 
                                    resolve();
                                }
                            });
                        });
                    });
                })
                .then(()=>{
                    //parse function
                    //public: section
                    for(let i in mother.cppIncSource){
                        let elm = mother.cppIncSource[i];
                        let res = parseClass(elm.sourceCode);
                        elm.className = res.class;
                        let funcs = parseFunction(res.public);
                    }
                })
                .catch(err=>{
                    console.log(err);
                }); 
            }
        }
    }
}
</script>
