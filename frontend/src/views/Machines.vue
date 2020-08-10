<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Maskiner du kan leje</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div v-if="machinesInApp.length < 1">
          <p>Der er endnu ikke nogle maskiner oprettet i din bopæl</p>
          <p>Opret en herunder</p>
          <router-link
            to="machine-overview/create-machine"
            tag="button"
            class="btn btn-primary"
          >Opret maskine her</router-link>
        </div>

        <machine
          v-for="machine in machinesInApp"
          :key="machine._id"
          :machine="machine"
          v-else
        ></machine>
      </div>
    </div>
    <div class="row new-machine">
      <div class="col">
        <router-link
          tag="button"
          class="btn"
          to="machine-overview/create-machine"
        >
          Opret ny maskine
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Machine from '@/components/Machine/Machine';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      Machine,
    },
    computed: {
      ...mapGetters(['machinesInApp', 'isLoading', 'userAppartment']),
    },
  };
</script>
