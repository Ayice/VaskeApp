import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';
import RentMachine from '../views/RentMachine';
import Machines from '../views/Machines';
import StatusModal from '../components/Partials/StatusModal';
import CreateMachine from '../components/Machine/CreateMachineForm';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/machine-overview',
    name: 'MachineOverview',
    meta: {
      breadCrumb: 'Alle maskiner',
    },
    children:
      [
        {
          path: '/machine-overview',
          component: Machines,
          name: 'machines',

        },
        {
          path: '/machine-overview/renting-status',
          component: StatusModal,
          name: 'StatusMsg'
        },
        {
          path: '/machine-overview/create-machine',
          component: CreateMachine,
          name: 'create-machine',
          meta: {
            breadCrumb: 'Opret maskine'
          }
        },
        {
          path: '/machine-overview/:id',
          component: RentMachine,
          name: 'Machine',
          meta: {
            breadCrumb: 'Lej maskine'
          }
        },
      ],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "machineContainer" */ '../views/MachineOverview.vue'
      )
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.name !== 'Home' && !store.state.authenticated) next({ name: 'Home' });
  else next();
});

export default router;
