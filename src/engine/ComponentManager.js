import utils from '@/engine/utils';
let listedComponents = {};

let listComponent = function(){
    let res = require.context('./components', true, /^\.\/.*?\.(vue|js)$/); //<<< "./component" must fix value, cannot use dynamic variable in webpack naja!!!!
    let context = {};
    res.keys().forEach(element => {
        let tmp = (/\.\/([_A-Za-z0-9]+)\/([A-Za-z0-9]+)\.(vue|js)$/g).exec(element);
        if(tmp != null && tmp.length == 4){
            let fullPath = tmp[0];
            let name = tmp[1];
            let componentName = tmp[2];
            let type = tmp[3];
            if (!(name in context)){//existing key
                context[name] = {};
            }
            if(type === 'vue'){
                context[name][componentName] = './components/'+name+'/'+componentName;
            }
            if(type === 'js' && componentName === 'config'){
                context[name]['config'] = require('./components/'+name+'/'+componentName).default;
            }
        }
    });
    //sort menu by config index
    let orderedContext = {};
    Object.keys(context).sort(function(a,b) {
        if(context[a].config && context[b].config){
            if('index' in context[a].config && 'index' in context[b].config)
            return context[a].config.index - context[b].config.index;
        }
        return 0;
    }).forEach(function(key) {
        orderedContext[key] = context[key];
    });
    if(components)
    return orderedContext;
};

let components = function(){
    if(Object.entries(listedComponents).length === 0 && listedComponents.constructor === Object){ // check empty object !!!
        listedComponents = listComponent();
    }
    return listedComponents;
};
export default {
    components,
    listComponent,
    listToolbar : utils.filterFileName(components(),'Toolbar'),
    listActionbar : utils.filterFileName(components(),'Actionbar'),
    listPage : utils.filterFileName(components(),'Page'),
    listLeftDrawer : utils.filterFileName(components(),'LeftDrawer'),
    listRightDrawer : utils.filterFileName(components(),'RightDrawer'),
    listBottomPanel : utils.filterFileName(components(),'BottomPanel'),
    listRightTab : utils.filterFileName(components(),'RightTab'),
    listBottomTab : utils.filterFileName(components(),'BottomTab'),
    listSetting : utils.filterFileName(components(),'Setting'),
    load : ()=>{

    },
    install : (namespace)=>{

    },
    remove : (namespace)=>{

    },
    update : (namespace)=>{

    }
}
