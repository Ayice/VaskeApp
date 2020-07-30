<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="../assets/images/vaskeLogo.png" alt="Vaske logo" />
        </router-link>
      </div>

      <a role="button" class="navbar-burger-trigger" @click="showMenu()">
        <span class="navbar-burger-span"></span>
        <span class="navbar-burger-span"></span>
        <span class="navbar-burger-span"></span>
      </a>

      <div @click="showMenu" :class="[show ? 'show' : '', 'navbar-menu']">
        <router-link
          v-for="route in routes.options.routes"
          :key="route.name"
          :to="route.path"
          class="navbar-item"
        >{{ route.name }}</router-link>
        <button class="btn btn-secondary btn-logout" @click="logout">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
import router from '../router/index';
import { mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      routes: router,
      show: false
    };
  },

  methods: {
    ...mapActions(['logout']),
    showMenu() {
      this.show = !this.show;
    }
  }
};
</script>
