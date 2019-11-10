import { mount } from '@vue/test-utils';
import app from '../src/App.vue';

describe('App.vue', () => {
  const wrapper = mount(app);
  it('renders the todo app', () =>{
    expect(wrapper.contains('div')).toBe(true);
  });
});

