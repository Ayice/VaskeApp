
export default {
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
  },
  SET_STATUS_MSG(state, data) {
    state.statusMsg = { ...data };
  }
};
