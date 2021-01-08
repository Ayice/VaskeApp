import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store/index';
import RentMachine from '../views/RentMachine';
import Machines from '../views/Machines';
import StatusModal from '../components/Partials/StatusModal';
import CreateMachine from '../components/Machine/CreateMachineForm';
import ProfileView from '../views/ProfileView';
import ProfileInfo from '../components/Profile/ProfileInfo';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/machine-overview',
    name: 'Alle maskiner',
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
    component: () =>
      import(
        /* webpackChunkName: "machineContainer" */ '../views/MachineOverview.vue'
      )
  },
  {
    path: '/profile',
    name: 'Profil',
    component: ProfileView,
    meta: {
      breadCrumb: 'Profil'
    },
    children: [
      {
        path: '/profile',
        component: ProfileInfo,

      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Home' && !store.state.authenticated) {
    next({ name: 'Home' });
  } else if (to.name == 'Home' && store.state.authenticated) {
    next({ name: 'machines' });
  } else next();
});

export default router;
