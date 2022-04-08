import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import routes from './handlers/routers';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './common/styles/reset.css';
import storeConfig from './services/store';
import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ViewUI);
const store = new Vuex.Store(storeConfig);
store.commit('setRouter', routes);
const router = new VueRouter({ routes });
router.beforeEach((to, from, next) => {
  if (to.fullPath === '/' || to.name === null) {
    // 首页或没找到路径, 去第一个
    next(routes[0]);
    return;
  }
  const activeName = to.name === null ? 'home-index' : to.name;
  const name = to.matched.length > 0 ? to.matched[0].name : 'home';
  store.dispatch('updateActiveName', activeName);
  store.dispatch('updateOpenedNames', name);
  next();
});
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
