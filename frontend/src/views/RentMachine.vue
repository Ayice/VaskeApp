<template>
  <div class="machine-modal container">
    <div class="row">
      <div class="col-12">
        <h2 class="machine-modal__title">{{ machine.title }}</h2>
      </div>

      <div class="col-12">
        <div class="machine-modal__img">
          <img
            :src="apiUrl + machine.machine_image"
            :alt="machine.title"
          />
        </div>
      </div>

      <div class="col-12">
        <form
          @submit.prevent="rentMachine"
          class="machine-modal__form"
        >
          <select
            name="machineTime"
            class="custom-select mb-3"
            v-model="time"
          >
            <option
              value
              selected
              disabled="true"
            >Tid du skal bruge maskinen</option>
            <option value="1">1 minut</option>
            <option value="30">30 minutter</option>
            <option value="60">60 minutter</option>
            <option value="90">90 minutter</option>
            <option value="120">120 minutter</option>
          </select>

          <input
            type="submit"
            value="Brug maskine"
            class="btn btn-block btn-success"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'RentMachine',
    data() {
      return {
        time: '',
        machine: {},
      };
    },
    methods: {
      ...mapActions(['postRentMachine']),

      rentMachine() {
        if (!this.time)
          return alert('Du skal vælge hvor lang tid du vil have maskinen');

        const data = {
          time: this.time,
          machineId: this.machine._id,
        };

        this.postRentMachine(data)
          .then(() => {
            this.$router.push('/machine-overview/renting-status');
          })
          .catch(() => {
            this.$router.push('/machine-overview/renting-status');
          });
      },
    },
    computed: {
      ...mapGetters(['apiUrl', 'getSpecificMachine']),
    },
    mounted() {
      this.machine = this.getSpecificMachine(this.$route.params.id);
    },
  };
</script>
