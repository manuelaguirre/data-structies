/* eslint-disable no-undef, import/no-unresolved */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import BTreeVisualizer from '../BTreeVisualizer.vue';
import InsertInput from '../shared/InsertInput.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('BTreeVisualizer', () => {
  it('displays', () => {
    const expectedTreeObject = {
      leaves: {
        keys: [
          '69',
        ],
      },
      children: [],
    };
    const wrapper = mount(BTreeVisualizer, {
      localVue,
      router,
    });
    wrapper.find(InsertInput).vm.$emit('myEvent', '69');
    expect(wrapper.vm.$data.bTree.toJSON()).toMatchObject(expectedTreeObject);
  });
});
