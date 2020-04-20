import Vue from 'vue';
import App from './App.vue';
import Foo from './components/Foo.vue';
import Bar from './components/Bar.vue';
import NotFoundComponent from './components/NotFoundComponent.vue';
import VueRouter from 'vue-router';
import myPlugin from './plugins/myPlugin.js';

Vue.use(VueRouter);
Vue.use(myPlugin, {abc: 123});

Vue.config.productionTip = false


// const Foo = { template: '<div>foo</div>' }
// const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '*', component: NotFoundComponent }
]

const router = new VueRouter({
  mode: 'history',
  base: '/vue_test/',
  routes // (缩写) 相当于 routes: routes
})


new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
// }).$mount('#app');
