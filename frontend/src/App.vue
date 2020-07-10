<template>
  <div
    :class="[isLoading ? 'loading' : '' ,'app']"
    id="app"
  >
    <Header />
    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import Header from './components/Header.vue';

export default {
  components: {
    Header
  },
  methods: {
    ...mapMutations(['SET_AUTHENTICATION', 'SET_USER_TOKEN']),
    ...mapActions(['getUserData']),

    getUserToken() {
      this.SET_AUTHENTICATION(true);
      this.SET_USER_TOKEN(localStorage.token);
      this.getUserData(localStorage.userId);
    }
  },
  mounted() {
    if (localStorage.token) {
      this.getUserToken();
      this.$router.push('/machine-overview');
    }
  },
  computed: {
    ...mapState(['isLoading'])
  }
};
</script>

<style lang="scss">
</style>
