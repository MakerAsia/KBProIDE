import * as ComponentMap from './actionbar'

export default {
  install(Vue, options)
  {
  	Vue.component("PythonPage",import("./pages/PythonPage").default);
    // register all components globally
    for (var componentName in ComponentMap)
    {
      Vue.component( componentName, ComponentMap[ componentName ] );
    }
  }
};
