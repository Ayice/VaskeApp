<template>
  <form
    class="form login-form"
    @submit.prevent="login"
  >
    <div class="form-group">
      <label for="email">Email address</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="email"
        name="email"
        aria-describedby="emailHelp"
        placeholder="example@example.com"
      />
      <small
        id="emailHelp"
        class="form-text text-muted"
      >Skriv din email her.</small>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="password"
        name="password"
        aria-describedby="passwordHelp"
        placeholder="******"
      />
      <small
        id="passwordHelp"
        class="form-text text-muted"
      >Skriv dit password her.</small>
    </div>

    <div class="form-group">
      <button class="btn btn-success btn-block">Log in</button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['postLogin']),
    ...mapMutations([
      'SET_AUTHENTICATION',
      'SET_USER_DATA',
      'SET_USER_TOKEN',
      'SET_IS_LOADING'
    ]),

    login() {
      this.SET_IS_LOADING(true);

      const data = {
        email: this.email,
        password: this.password
      };

      this.postLogin(data)
        .then(() => {
          this.$router.push('/about');
          this.SET_IS_LOADING(false);
        })
        .catch(() => {
          this.SET_IS_LOADING(false);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../../assets/styles/basics/_forms.scss';
@import '../../../assets/styles/components/_login-form.scss';
</style>
