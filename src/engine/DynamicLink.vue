<template>
    <component :is="component" :data="data" v-if="component" />
</template>

<script>
export default {
    name: 'dynamic-link',
    props: ['data', 'target', 'name', 'base','type'],
    data() {
        return {
            component: null,
        }
    },
    computed: {
        loader() {
            if (!this.target) {
                return null;
            }
            if(this.base){
                console.log('loading component : ' + `${this.base}/${this.target}`);
                return () => import(`${this.base}/${this.target}`)
            }else{
                console.log('loading component : ' + `${this.target}`);
                return () => import(`${this.target}`)
            }
        },
    },
    mounted() {
        this.loader()
            .then(() => {
                this.component = () => this.loader()
            })
            .catch(() => {
                this.component = () => import('@/engine/views/page/Error')
            })
    },
}
</script>