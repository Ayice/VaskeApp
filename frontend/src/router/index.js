import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		beforeEnter: (to, from, next) => {
			if (store.state.authenticated) {
				next()
			} else {
				next(false)
			}
		},
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path: '/machine-overview',
		name: 'Machine Overview',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(
				/* webpackChunkName: "machineContainer" */ '../views/MachineOverview.vue'
			)
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})
router.beforeEach((to, from, next) => {
	if (to.name !== 'Home' && !store.state.authenticated) next({ name: 'Home' })
	else next()
})
export default router
