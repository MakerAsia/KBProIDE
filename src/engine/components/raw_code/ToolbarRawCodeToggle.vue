<template>
    <div v-if="$global.setting.devMode === true">
        <div class="container-raw-code" v-if="$global.editor.mode === 2">
            <span class="f-manjari-b text-white">RAW CODE</span>
            <toggle-button v-model="$global.editor.rawCodeMode"
                           :labels="{checked: 'ON', unchecked: 'OFF'}"/>
        </div>
    </div>
</template>

<script>
  import {ToggleButton} from "vue-js-toggle-button";
  export default {
    name: "RawCodeToggle",
    components: {
      "ToggleButton": ToggleButton
    },
  };
</script>

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