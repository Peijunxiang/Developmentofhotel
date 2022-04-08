/**
 * @Desc:   全局的状态管理
 */
import { getMenuByRouter } from '../common/js/utils';
const store = {
  state: {
    router: [],
    activeName: 'home-index',
    openedNames: ['home'],
    userEngName: '',
  },
  mutations: {
    setRouter(state, router) {
      state.router = router;
    },
    updateOpenedNames(state, names) {
      state.openedNames = names;
    },
    updateActiveName(state, name) {
      state.activeName = name;
    },
    setUserEngName(state, userEngName) {
      state.userEngName = userEngName;
    },
  },
  actions: {
    setRouter({ commit }, router) {
      commit('setRouter', router);
    },
    updateOpenedNames({ commit }, name) {
      const names = [name];
      commit('updateOpenedNames', names);
    },
    updateActiveName({ commit }, name) {
      commit('updateActiveName', name);
    },
    // 设置用户英文名
    setUserEngName({ commit }, userEngName) {
      commit('setUserEngName', userEngName);
    },
  },
  getters: {
    menuList(state) {
      return getMenuByRouter(state.router);
    },
  },
  modules: {
  },
};

export default store;
