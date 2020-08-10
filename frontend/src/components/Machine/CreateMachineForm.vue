<template>
  <form
    class="form login-form container"
    @submit.prevent="createMachine()"
  >
    <div class="form-group">
      <label for="machine-name">Maskines navn</label>
      <input
        v-model="title"
        type="text"
        class="form-control"
        id="machine-name"
        name="machine-name"
        aria-describedby="machine-name"
        placeholder="Hvid Miele "
      />
      <small
        id="machine-name"
        class="form-text text-muted"
      >Skriv Vaskemaskinens navn</small>
    </div>

    <div class="form-group">
      <label for="machine-img">Billede af maskine</label>
      <input
        type="file"
        id="machineImg"
        name="machineImg"
        @change="onFileSelected"
        aria-describedby="machineImg"
      />
      <small
        id="machineImg"
        class="form-text text-muted"
      >Upload billede af maskine</small>
    </div>

    <div class="form-group">
      <button class="btn btn-success btn-block">Opret maskine</button>
    </div>
  </form>
</template>

<script>
  import { postNewMachine } from './utils/api';

  export default {
    name: 'create-machine-form',
    data() {
      return {
        title: '',
        image: {},
      };
    },
    methods: {
      createMachine() {
        let form = new FormData();
        form.append('machineImage', this.image);
        form.append('title', this.title);
        form.append('lejlighed', this.$store.getters.userAppartment);

        postNewMachine(form);
      },
      onFileSelected(event) {
        this.image = event.target.files[0];
      },
    },
  };
</script>
