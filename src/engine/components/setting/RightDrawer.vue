<template>
<div id="themeSetting">
  <v-toolbar color="primary" dark>
    <v-toolbar-title>
      Settings
    </v-toolbar-title>
  </v-toolbar>
  <v-container>
    <v-layout column>
      <v-flex>
        <v-subheader class="px-1 my-2">
          Theme color
        </v-subheader>
        <div class="color-option">
          <v-layout wrap>
            <label class="color-option--label flex xs6 pa-1" v-for="(option,index) in themeColorOptions" :key="index">
              <input type="radio" name="color" v-bind:value="option.key" v-model="themeColor">
              <span class="color-option--item bg">
                <span class="overlay">
                  <span class="material-icons">check</span>
                </span>
                <span class="color-option--item--header sideNav" :class="option.value.sideNav"></span>
                <span class="color-option--item--header mainNav" :class="option.value.mainNav"></span>
                <span class="sideMenu" :class="option.value.sideManu"></span>
              </span>
            </label>
          </v-layout>
        </div>
        <v-divider></v-divider>
        <div class="theme-options">
          <v-subheader class="px-1 my-2">
            Editor Theme
          </v-subheader>
          <div class="my-3">
            <v-select
              :items="editorTheme"
              label="Select theme"
              v-model="editorThemeValue"
            ></v-select>
          </div>
        </div>
      </v-flex>

    </v-layout>
  </v-container>
</div>
</template>

<script>
import colors from 'vuetify/es5/util/colors';
export default {
  data () {
    return {
      themeColor: false,
      colors: colors,
      editorTheme : [ 
        'default','3024-day','3024-night','abcdef','ambiance','base16-dark',
        'base16-light','bespin','blackboard','cobalt','colorforth','darcula',
        'dracula','duotone-dark','duotone-light','eclipse','elegant','erlang-dark',
        'gruvbox-dark','hopscotch','icecoder','idea','isotope','lesser-dark','liquibyte',
        'lucario','material','mbo','mdn-like','midnight','monokai','neat','neo','night',
        'oceanic-next','panda-syntax','paraiso-dark','paraiso-light','pastel-on-dark',
        'railscasts','rubyblue','seti','shadowfox','solarized dark','solarized light',
        'the-matrix','tomorrow-night-bright','tomorrow-night-eighties','ttcn','twilight',
        'vibrant-ink','xq-dark','xq-light','yeti','zenburn'],
      editorThemeValue : this.$global.editor.theme,
    };
  },
  mounted : function(){
    Object.keys(this.colors).forEach((key)=>{
      if(this.colors[key].base == this.$vuetify.theme.primary){
        this.themeColor = key;
      }
    });
  },
  computed: {
    themeColorOptions () {
      return [
        {
          key: 'blue',
          value: {
            sideNav: 'blue',
            mainNav: 'blue',
            sideManu: 'white'
          }
        },
        {
           key: 'lightBlue',
           value: {
             sideNav: 'blue',
             mainNav: 'white',
            sideManu: 'blue lighten-1'
          }
        },
        {
          key: 'teal',
          value: {
            sideNav: 'teal',
            mainNav: 'teal',
            sideManu: 'white'
          }
        },
        {
          key: 'red',
          value: {
            sideNav: 'red',
            mainNav: 'red',
            sideManu: 'white'
          }
        },
        {
          key: 'orange',
          value: {
            sideNav: 'orange',
            mainNav: 'orange',
            sideManu: 'white'
          }
        },
        {
          key: 'purple',
          value: {
            sideNav: 'purple',
            mainNav: 'purple',
            sideManu: 'white'
          }
        },
        {
          key: 'indigo',
          value: {
            sideNav: 'indigo',
            mainNav: 'indigo',
            sideManu: 'white'
          }
        },
        {
          key: 'cyan',
          value: {
            sideNav: 'cyan',
            mainNav: 'cyan',
            sideManu: 'white'
          }
        },
        {
          key: 'pink',
          value: {
            sideNav: 'pink',
            mainNav: 'pink',
            sideManu: 'white'
          }
        },
        {
          key: 'green',
          value: {
            sideNav: 'green',
            mainNav: 'green',
            sideManu: 'white'
          }
        }
      ];
    }
  },  
  watch: {
    themeColor: {
      handler (val) {
        if(val){
          this.$vuetify.theme.primary = this.colors[val].base; 
          this.$global.$emit('theme-change', this.colors[val].base);
          this.$global.setting.color = this.colors[val].base;
        }
      },
      immediate: true
    },
    editorThemeValue : {
      handler(value){
        if(value){
          this.$global.editor.theme = value;
          this.$global.$emit('editor-theme-change',value);
        }
      },
      immediate : true
    }
  },
};
</script>
<style lang="stylus" scoped>
.color-option
  &--label
    position: relative
    display: block
    cursor: pointer  
    & input[type="radio"] 
      display:none
      &+span 
        position: relative
        &>.overlay
          display: none;
          position: absolute
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,.3);
          text-align: center;
          line-height: 30px;
          color: #fff;                
      &:checked+span>.overlay
        display:block  
    & .bg        
      background-color: #f1f1f1
  &--item
    overflow: hidden;
    display: block;
    box-shadow: 0 0 2px rgba(0,0,0,.1);
    margin-bottom: 15px;      
    &--header
      height: 10px
    &>span 
      display: block;
      float: left;
      width: 50%;
      height: 20px;          
</style>

