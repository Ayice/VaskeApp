<template>
  <div class="row">
    <div class="col-12 profile__container">
      <div class="profile__edit">
        <button
          @click="handleEdit"
          class="btn btn-link"
        >
          <span v-if="!edit"> Rediger </span>
          <span v-else> Tilbage </span>
        </button>
      </div>

      <img
        src=""
        :alt="getUserDetails.fname"
      >
      <div v-if="!edit">
        <h2>{{ getUserDetails.username }}</h2>
        <p> {{ appartment.title }} </p>
        <p> {{ appartment.city }} {{ appartment.zip }} </p>
      </div>
      <div v-else>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="app-name">Postnummer</label>
            <input
              v-model="appZip"
              @change="handleZipChange"
              type="text"
              class="form-control"
              id="app-zip"
              name="app-zip"
              aria-describedby="app-zip"
              :placeholder="appartment.zip"
            >
          </div>

          <div class="form-group">
            <label for="app-name">By</label>
            <input
              v-model="appCity"
              @change="handleAdressChange"
              type="text"
              class="form-control"
              id="app-city"
              name="app-city"
              aria-describedby="app-city"
              :placeholder="appartment.city"
            >
          </div>

          <div
            v-if="cityZip"
            class="form-group"
          >
            <label for="app-name">Adresse</label>
            <input
              v-model="appTitle"
              type="text"
              class="form-control"
              id="app-name"
              name="app-name"
              aria-describedby="app-name"
              :placeholder="appartment.title"
            >
          </div>

          <div class="form-group">
            <button
              v-if="cityZip"
              type="submit"
              class="btn btn-success"
            > Gem ændringer </button>
            <button
              v-else
              @click="cityZip = true"
              class="btn btn-success"
            >Næste</button>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {},
    data() {
      return {
        appartment: {},
        edit: false,
        appTitle: '',
        appCity: '',
        appZip: '',
        cityZip: false,
      };
    },
    methods: {
      ...mapActions(['getAppartment', 'fetchCity']),
      handleEdit() {
        this.edit = !this.edit;
      },
      handleSubmit() {
        if (!this.appCity || !this.appZip || !this.appTitle) return;
        const data = {
          lejlighed: this.appTitle,
          by: this.appCity,
          zip: this.appZip,
        };
        console.log(data);
      },
      async handleZipChange() {
        this.fetchCity(this.appZip).then(
          response => (this.appCity = response.res.title)
        );
      },
      async handleAdressChange() {
        // TODO: Get addresses from given zip/city
        // And search for existing address with same name in that list
      },
    },
    computed: {
      ...mapGetters(['getUserDetails']),
    },
    mounted() {
      this.getAppartment().then(res => {
        this.appartment = res.data;
      });
    },
  };
</script>
