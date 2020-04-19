/* eslint-disable no-undef, import/no-unresolved */
// import { mount, createLocalVue } from '@vue/test-utils';
// import VueRouter from 'vue-router';
// import BTreeVisualizer from '../BTreeVisualizer.vue';
// import InsertInput from '../shared/InsertInput.vue';
// import DeleteInput from '../shared/DeleteInput.vue';

// const localVue = createLocalVue();
// localVue.use(VueRouter);
// const router = new VueRouter();

// describe('BTreeVisualizer', () => {
//   it('puts a number into the tree', () => {
//     const expectedTreeObject = {
//       leaves: {
//         keys: [
//           '69',
//         ],
//       },
//       children: [],
//     };
//     const wrapper = mount(BTreeVisualizer, {
//       localVue,
//       router,
//     });
//     wrapper.find(InsertInput).vm.$emit('myEvent', '69');
//     expect(wrapper.vm.$data.bTree.toJSON()).toMatchObject(expectedTreeObject);
//   });

//   it('deletes a number from the tree', () => {
//     const wrapper = mount(BTreeVisualizer, {
//       localVue,
//       router,
//     });
//     wrapper.setData({
//       bTree: {
//         leaves: {
//           keys: [
//             '96',
//           ],
//         },
//         children: [],
//       },
//     });
//     wrapper.find(DeleteInput).vm.$emit('myEvent', '96');
//     expect(wrapper.vm.$data.bTree.toJSON()).toMatchObject({
//       leaves: {
//         keys: [],
//       },
//       children: [],
//     });
//   });
// });
