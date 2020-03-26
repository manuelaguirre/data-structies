import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import App from './App.vue';
import MainMenu from './components/MainMenu.vue';
import BTreeVisualizer from './components/BTreeVisualizer.vue';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';
import './assets/css/tailwind.css';


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueMaterial);

// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/structure/:code', component: BTreeVisualizer },
  { path: '/', component: MainMenu },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for `routes: routes`
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.

// Now the app has started!


new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
