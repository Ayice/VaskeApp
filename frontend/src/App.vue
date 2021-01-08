<template>
  <div
    :class="[isLoading ? 'loading' : '' ,'app']"
    id="app"
  >
    <Header />
    <bread-crumbs> </bread-crumbs>
    <router-view />
  </div>
</template>

<script>
  import { mapMutations, mapState, mapActions } from 'vuex';
  import Header from './components/Partials/Header';
  import BreadCrumbs from './components/Partials/BreadCrumbs';

  export default {
    components: {
      BreadCrumbs,
      Header,
    },
    methods: {
      ...mapMutations(['SET_AUTHENTICATION', 'SET_USER_TOKEN']),
      ...mapActions(['getUserData']),

      getUserToken() {
        this.SET_AUTHENTICATION(true);
        this.SET_USER_TOKEN(localStorage.token);
        this.getUserData(localStorage.userId);
      },
    },
    mounted() {
      if (localStorage.token) {
        this.getUserToken();

        this.$router.push('/machine-overview');
      }
    },
    computed: {
      ...mapState(['isLoading']),
    },
  };
</script>

<style lang="scss">
</style>
