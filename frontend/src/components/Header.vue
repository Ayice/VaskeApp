<template>
  <header>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link
          to="/"
          class="navbar-item"
        >
          <img
            src="../assets/images/vaskeLogo.png"
            alt="Vaske logo"
          />
        </router-link>
      </div>

      <a
        role="button"
        class="navbar-burger-trigger"
        @click="showMenu()"
      >
        <span class="navbar-burger-span"></span>
        <span class="navbar-burger-span"></span>
        <span class="navbar-burger-span"></span>
      </a>

      <div :class="[show ? 'show' : '', 'navbar-menu']">
        <router-link
          v-for="route in routes.options.routes"
          :key="route.name"
          :to="route.path"
          class="navbar-item"
        >{{ route.name }}</router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import router from "../router/index";

export default {
  name: "Header",
  data() {
    return {
      routes: router,
      show: false
    };
  },

  methods: {
    showMenu() {
      this.show = !this.show;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/components/header.scss";
</style>
