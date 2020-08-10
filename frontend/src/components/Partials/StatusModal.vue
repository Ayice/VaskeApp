<template>
  <div class="status-modal__container">
    <div class="status-modal__header">
      <h1>{{statusMsg.status}}</h1>
    </div>
    <div class="status-modal__body">{{statusMsg.msg}}</div>
    <div class="status-modal__footer">
      <router-link
        to="MachineOverview"
        :class="[statusMsg.status == 'Error' ? 'btn-danger': 'btn-success', 'btn']"
      >Luk besked
      </router-link>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    methods: {},
    computed: {
      ...mapGetters({
        statusMsg: 'getStatusMsg',
      }),
    },
  };
</script>
