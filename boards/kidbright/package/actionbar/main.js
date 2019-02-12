import Vue from 'vue';
import wrap from '@vue/web-component-wrapper';
import ActionbarNewfile from './ActionbarNewfile';
const CustomElement = wrap(Vue, ActionbarNewfile);
window.customElements.define('actionbar-newfile', CustomElement);