<template>
  <div class="status-modal__container container">
    <div class="status-modal__header">
      <h1>{{statusMsg.status}}</h1>
    </div>

    <div class="status-modal__body">{{statusMsg.msg}}</div>
    <div class="status-modal__footer">
      <button
        @click="testFetch()"
        :class="[statusMsg.status == 'Error' ? 'btn-danger': 'btn-success', 'btn']"
      >Luk besked
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    methods: {
      ...mapActions(['fetchMachines']),
      testFetch() {
        this.fetchMachines(this.$store.getters.userAppartment).then(() => {
          this.$router.push('/machine-overview');
        });
      },
    },
    computed: {
      ...mapGetters({
        statusMsg: 'getStatusMsg',
      }),
    },
  };
</script>
