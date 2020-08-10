import axios from 'axios';
import router from 'vue-router';

export default {
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

        return res.data;
      })
      .then(() => {
        dispatch('fetchMachines', state.user.lejlighed)
          .then(() => {
            router.push('/machine-overview/');
            commit('SET_IS_LOADING', false);
          })
          .catch(err => {
            commit('SET_IS_LOADING', false);

            return err.response.data;
          });
      });
  },
  getUserData({ commit, dispatch }, userId) {
    commit('SET_IS_LOADING', true);

    axios
      .get(`${process.env.VUE_APP_API_URL}user/${userId}`)
      .then(res => {
        commit('SET_USER_DATA', res.data.user);

        dispatch('fetchMachines', res.data.user.lejlighed)
          .then(() => {
            commit('SET_IS_LOADING', false);
          });
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

    try {
      const response =
        await axios.post(` ${process.env.VUE_APP_API_URL}machine/rent/${rentingData.machineId}`, data,
          {
            headers: { 'auth-token': state.userToken }
          });

      commit('SET_STATUS_MSG', response.data);

    } catch (error) {
      let errors = error.response && error.response.data ||
        'Der skete en fejl, prøv igen senere.';

      commit('SET_STATUS_MSG', errors);
    }

    commit('SET_IS_LOADING', false);
  },
};
