<template>
    <div class="key"
         v-bind:class="isMajorOrSilence"
         @click="sound(tone)">
    </div>
</template>

<script>
  export default {
    name: "piano-key",
    props: {
      tone: {
        type: String,
        required: true,
      },
    },
    data() {
      return {};
    },
    computed: {
      isMajorOrSilence: function() {
        return {
          major: this.tone.includes("#"),
          silence: this.tone === "SIL",
        };
      },
    },
    methods: {
      sound: function(tone) {
        this.$parent.pressedNote(tone);
      },
    },
  };
</script>

<style scoped>
    .key {
        border: 1px solid #CCCCCC;
        background-color: #EEE;
        border-radius: 4px;
        float: left;
        height: 150px;
        width: 22px;
        position: relative;
        z-index: 1;
    }

    .key:hover {
        transform: translate(1px, 1px);
        -webkit-box-shadow: -1px 0px 14px -2px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: -1px 0px 14px -2px rgba(0, 0, 0, 0.75);
        box-shadow: -1px 0px 14px -2px rgba(0, 0, 0, 0.75);
        background-color: #555;
    }

    .key p {
        bottom: 0;
        color: black;
        cursor: default;
        font-size: 11px;
        text-align: center;
        position: absolute;
        width: 100%;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .key.major {
        background: #000000;
        border: 2px solid #CCCCCC;
        height: 100px;
        width: 20px;
        margin-left: -9px;
        position: relative;
        z-index: 2;
    }

    .key:hover {
        background: #111;
    }

    .key.major p {
        color: #FFFFFF;
    }

    .key.major + .key {
        margin-left: -9px;
    }

    .key.silence {
        background: #aaaaaa;
    }
</style>