import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    userToken: '',
    user: {},
    authenticated: false,
    machines: [],
    api: process.env.VUE_APP_API_URL
  },
  mutations: {
    SET_IS_LOADING(state, data) {
      state.isLoading = data;
    },

    SET_USER_TOKEN(state, data) {
      state.userToken = data;
    },

    SET_AUTHENTICATION(state, data) {
      state.authenticated = data;
    },

    SET_MACHINES(state, data) {
      state.machines = data;
    },

    SET_USER_DATA(state, data) {
      state.user = { ...data };
    }
  },
  actions: {
    // Login function
    async postLogin({ dispatch, commit, state }, data) {
      commit('SET_IS_LOADING', true);
      axios
        .post(process.env.VUE_APP_API_URL + 'user/login', data)
        .then(res => {
          commit('SET_USER_TOKEN', res.data.token);
          commit('SET_AUTHENTICATION', true);
          commit('SET_USER_DATA', res.data.user);
          localStorage.token = res.data.token;
          localStorage.userId = res.data.user._id;
          return res;
        })
        .then(() => {
          dispatch('fetchMachines', state.user.lejlighed)
            .then(() => {
              router.push('machine-overview');
              commit('SET_IS_LOADING', false);
            })
            .catch(() => {
              commit('SET_IS_LOADING', false);
              console.log(
                'Der opstod en fejl, ved at hente vaskemaskinerne. Prøv igen senere, '
              );
            });
        });
    },
    getUserData({ commit, dispatch }, userId) {
      commit('SET_IS_LOADING', true);
      axios
        .get(`${process.env.VUE_APP_API_URL}user/${userId}`)
        .then(res => {
          commit('SET_USER_DATA', res.data.user);
          dispatch('fetchMachines', res.data.user.lejlighed);
          setTimeout(() => {
            commit('SET_IS_LOADING', false);
          }, 1000);
        })
        .catch(() => {
          commit('SET_IS_LOADING', false);
        });
    },

    logout({ commit }) {
      commit('SET_IS_LOADING', true);
      commit('SET_AUTHENTICATION', false);
      commit('SET_USER_TOKEN', '');
      commit('SET_USER_DATA', {});
      localStorage.userId = '';
      localStorage.token = '';
      router.push('/');
      setTimeout(() => {
        commit('SET_IS_LOADING', false);
      }, 500);
    },

    async fetchMachines({ commit, state }, lejlighed) {
      const response = await axios.get(
        `${process.env.VUE_APP_API_URL}machine/${lejlighed}`,
        {
          headers: { 'auth-token': state.userToken }
        }
      );
      return commit('SET_MACHINES', response.data);
    },

    async postRentMachine({ commit, state }, rentingData) {
      commit('SET_IS_LOADING', true);
      const data = {
        time: rentingData.time
      };

      const response = await axios.post(` ${process.env.VUE_APP_API_URL}machine/rent/${rentingData.machineId}`, data,
        {
          headers: { 'auth-token': state.userToken }
        });

      commit('SET_IS_LOADING', false);

      console.log(response.data, 'test');
      return response.data;
    }
  },

  getters: {
    machinesInApp: state => {
      return state.machines;
    },
    apiUrl: state => {
      return state.api;
    },
    isLoading: state => {
      return state.isLoading;
    },
    userAppartment: state => {
      return state.user.lejlighed;
    }
  },
  modules: {}
});
