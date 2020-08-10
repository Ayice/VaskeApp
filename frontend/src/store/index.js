import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    userToken: '',
    user: {},
    authenticated: false,
    machines: [],
    api: process.env.VUE_APP_API_URL,
    statusMsg: {}
  },
  mutations,
  actions,
  getters,
  modules: {}
});
