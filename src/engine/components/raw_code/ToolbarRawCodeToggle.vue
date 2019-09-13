<template>
  <div v-if="$global.setting.devMode === true">
  	<div class="container-raw-code" v-if="this.$global.editor.mode > 1 && this.$store.state.rawCode.display">
  		<span class="f-manjari-b text-white">RAW CODE</span>
      <toggle-button :value="this.$store.state.rawCode.mode"
                     :labels="{checked: 'ON', unchecked: 'OFF'}"
                     :sync="true"
                     @change="onChangeRawCode"/>
  	</div>
  </div>
</template>

<style scoped>
.container-raw-code {
  display: flex !important; 
  flex-direction: column !important; 
  padding: 0 10px 5px 10px;
  /*background-color: rgba(255, 255, 255, 0.8);*/
  border-radius: 6px;
  align-items: center;
  margin-left: 5px;
}

.text-dark {
  color: #2e2e2e;
}

.text-white {
  color: white;
}
</style>

<script>
  import { ToggleButton } from 'vue-js-toggle-button'

	export default {
		name: 'RawCodeToggle',
    mounted() {
      // console.log('------------> RawCode Mounted')
    },
    components: {
      'ToggleButton': ToggleButton
    },
    data() {
      return {
        mode: this.$store.state.rawCode.mode
      }
    },
    methods: {
      onChangeRawCode() {

        // console.log('------> onChangeRawCode')

        if (this.$store.state.rawCode.rollbackMode === 0) {
          this.$store.dispatch('rollbackRawCode', this.$global.editor.mode)
        }
        
        this.$store.dispatch('rawCodeMode', !this.$store.state.rawCode.mode);
        
        if (this.$store.state.rawCode.mode === false) {
          this.$global.editor.mode = 2;
          this.$global.$emit("editor-mode-change", 2);
        } else {
          this.$global.editor.mode = 3;
          this.$global.$emit("editor-mode-change", 3, true);
        }

      }
    },
	}
</script>