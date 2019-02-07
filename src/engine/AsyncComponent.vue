<template>
    <component :is="component" :data="data" v-if="component" />
</template>

<script>
export default {
    name: 'async-component',
    props: ['data', 'target', 'name', 'base','type'],
    data() {
        return {
            component: null,
        }
    },
    mounted() {
        this.reloadComponent();
    },
    watch :{
        target : function(){
            this.reloadComponent();
        }
    },
    methods : {
        reloadComponent : function(){
            if(this.target){
                if(this.base){
                    console.log('loading async component : ' + `${this.base}/${this.target}`);
                    this.component = () => { return import(`${this.base}/${this.target}`); };
                }else{
                    console.log('loading async component : ' + `${this.target}`);
                    this.component = () => { return import(`${this.target}`); };                    
                }
            }else{
                console.log('async component no target');
            }
        }
    }
}
</script>