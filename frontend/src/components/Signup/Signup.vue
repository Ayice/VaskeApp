<template>
<div class="container">
  <form
    class="form login-form"
    @submit.prevent="signUp"
  >
  <p>Create User</p>
    <div class="form-group">
      <label for="email">Username</label>
      <input
        v-model="username"
        type="text"
        class="form-control"
        id="username"
        name="username"
        placeholder="Username"
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
      <label for="password2">Confirm password</label>
      <input
        v-model="password2"
        type="password"
        class="form-control"
        id="password2"
        name="password2"
        placeholder="******"
      />
      <small v-if="!identicalPasswords">The passwords need to be the same</small>
    </div>

    <div class="form-group">
      <label for="fname">First Name</label>
      <input
        v-model="fname"
        type="text"
        class="form-control"
        id="fname"
        name="fname"
        placeholder="Firstname"
      />
    </div>

    <div class="form-group">
      <label for="lname">Last Name</label>
      <input
        v-model="lname"
        type="text"
        class="form-control"
        id="lname"
        name="lname"
        placeholder="Last Name"
      />
    </div>

    <div class="form-group">
      <label for="email">Email Adress</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="email"
        name="email"
        placeholder="email"
      />
    </div>

    <div class="form-group">
      <label for="address">Address</label>
      <input
        v-model="appartment"
        type="text"
        class="form-control"
        id="address"
        name="address"
        placeholder="Address"
      />
    </div>

    <div class="form-group">
      <label for="floor">Floor</label>

      <input
        v-model="floor"
        type="text"
        class="form-control"
        id="floor"
        name="floor"
        placeholder="Floor"
      />
    </div>

      <div class="form-group">
        <button class="btn btn-success btn-block">Create User</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        password2: '',
        email: '',
        password: '',
        fname: '',
        lname: '',
        username: '',
        floor: '',
        appartment: ''
      };
    },
    computed: {
      identicalPasswords() {
        return this.password2 === this.password;
      }
    },
    methods: {
      ...mapActions(['newUser']),
      ...mapMutations([
        'SET_AUTHENTICATION',
        'SET_USER_DATA',
        'SET_USER_TOKEN',
        'SET_IS_LOADING',
      ]),

      signUp() {
        this.SET_IS_LOADING(true);

        const data = {
          email: this.email,
          password: this.password,
          fname: this.fname ,
          lname: this.lname,
          username: this.username,
          floor: this.floor,
          appartment: this.appartment
        };

        this.newUser(data).then((res) => {
          console.log(res);

          this.$router.push('/login');
           this.SET_IS_LOADING(false);
        }).catch(err => {
           this.SET_IS_LOADING(false);
          alert(err.msg);
        });
      },
    },
  };
</script>
