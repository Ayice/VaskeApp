import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		is_loading: true,
		user_token: '',
		authenticated: false,
		machines: [],
		api_url: process.env.VUE_APP_API_URL
	},
	mutations: {
		SET_IS_LOADING(state, data) {
			state.is_loading = data
		},

		SET_USER_TOKEN(state, data) {
			state.user_token = data
		},

		SET_AUTHENTICATION(state, data) {
			state.authenticated = data
		},

		SET_MACHINES(state, data) {
			state.machines = data
		},

		SET_USER_DATA(state, data) {
			state.user = { ...data }
		}
	},
	actions: {
		// Login function
		async postLogin({ dispatch, commit, state }, data) {
			commit('SET_IS_LOADING', true)
			axios
				.post('/user/login', data)
				.then(res => {
					commit('SET_USER_TOKEN', res.data.token)
					commit('SET_AUTHENTICATION', true)
					commit('SET_USER_DATA', res.data.user)
				})
				.then(() => {
					dispatch('fetchMachines', state.user.user_appartment)
				})
		},

		async fetchMachines({ commit, state }, lejlighed) {
			console.log(lejlighed)
			console.log(state.user)
			const response = await axios.get(`/machine/${lejlighed}`, {
				headers: { 'auth-token': state.user_token }
			})
			return commit('SET_MACHINES', response.data)
		}
	},
	getters: {
		machinesInApp: state => {
			return state.machines
		},
		apiUrl: state => {
			return state.api_url
		}
	},
	modules: {}
})
