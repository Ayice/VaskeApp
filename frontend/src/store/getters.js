export default {
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
  },
  getSpecificMachine: state => id => {
    return state.machines.find(machine => machine._id == id);
  },
  getStatusMsg: state => {
    return state.statusMsg;
  },
  getUserDetails: state => {
    return state.user;
  }
};
