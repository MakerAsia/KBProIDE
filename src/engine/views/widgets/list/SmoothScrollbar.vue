<template>
  <div ref="scrollArea" class="smooth-scrollbar">
    <slot/>
  </div>
</template>

<script>  
  import SmoothScrollbar from 'smooth-scrollbar'
  const pg = require('smooth-scrollbar/plugins/overscroll');
  
  let scrollbar
  export default {
    name: 'smooth-scrollbar',
    props: {      
      options: {
        type: Object,
        required: false,
        default: () => ({})
      }
    },
    data() {
      return {
        scrollbar: null,
        defaultOptions : {
            damping: 0.1,
            thumbMinSize: 20,
            renderByPixels: true,
            alwaysShowTracks: false,
            continuousScrolling: true,
            delegateTo: null,
            plugins: {
                overscroll : { 
                    enable: true,
                    effect: 'glow',
                    damping: 0.1,
                    maxOverscroll: 150,
                    glowColor: '#222a2d'
                }
            }
        }
      }
    },
    mounted() {
      scrollbar = SmoothScrollbar.init(
        this.$refs.scrollArea,
        Object.assign({}, this.defaultOptions, this.options)
      )
      this.scrollbar = scrollbar
    },
    destroyed() {
      //scrollbar.destroy()
      scrollbar = null;
      this.scrollbar = null;
    }
  }
</script>

<style scoped>
.smooth-scrollbar {
  width: 100%;
  height: 100%;
}
</style>