<template>
<div class="container">
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
    </div>

    <div class="form-group">
      <button class="btn btn-success btn-block">Log in</button>
    </div>
  </form>
</div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      ...mapActions(['postLogin']),
      ...mapMutations([
        'SET_AUTHENTICATION',
        'SET_USER_DATA',
        'SET_USER_TOKEN',
        'SET_IS_LOADING',
      ]),

      login() {
        this.SET_IS_LOADING(true);

        const data = {
          email: this.email,
          password: this.password,
        };

        this.postLogin(data)
        .then(() => {
          this.SET_AUTHENTICATION(true);
        }).then(() => {
          this.$router.push('/machine-overview');
        });
      },
    },
  };
</script>
