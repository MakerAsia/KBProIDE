<template>
  <div id="piano">
    <piano-key tone="SIL"></piano-key>
    <piano-key v-for="tone in tones" :tone="tone.text" :key="tone.text"></piano-key>
    <piano-key tone="SIL"></piano-key>
  </div>
</template>

<script>
import PianoKey from "./PianoKey.vue";
import Notes from "./midikey";

export default {
  name: 'piano',
  data () {
    return {
      tones: Notes
    }
  },
  components: {
    PianoKey
  },
  methods : {
      pressedNote : function(note){
          this.$emit('pressed', note)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#piano {
  display: inline-block;
  margin: 0 auto;
}
</style>