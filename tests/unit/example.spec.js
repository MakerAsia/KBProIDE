import {shallowMount} from '@vue/test-utils';
import AppUpdater from '@/App.vue';

describe('AppFooter.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(AppUpdater, {
      propsData: {msg},
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
