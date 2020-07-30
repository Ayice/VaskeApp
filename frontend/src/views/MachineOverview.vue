<template>
  <div class="machine-container">
    <div @click="removeModal" :class="[showModal ? 'blur' : '', 'container']">
      <div class="row">
        <div class="col-12">
          <h1>Maskiner på din bopæl</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div v-if="machinesInApp.length < 1">
            <p>Der er endnu ikke nogle maskiner oprettet i din bopæl</p>
            <p>Opret en herunder</p>
            <router-link to="/create-machine" tag="button" class="btn btn-primary">Opret maskine her</router-link>
          </div>

          <machine
            v-for="machine in machinesInApp"
            :key="machine._id"
            :machine="machine"
            @showModal="rentAMachine"
            v-else
          ></machine>
        </div>
      </div>
    </div>
    <transition :duration="{enter: 1500, leave: 300}" name="slide-fade">
      <status-modal
        v-if="showMsg"
        @closeModal="showMsg = false"
        :statusMsg="statusMsg"
        style="transition-delay: 500"
      ></status-modal>
    </transition>

    <transition name="slide-fade">
      <machine-modal
        v-if="showModal"
        :machine="chosenMachine"
        @rentMachine="handleMsg"
        @closeModal="showModal = false"
      ></machine-modal>
    </transition>
  </div>
</template>

<script>
import Machine from '@/components/Machine/Machine.vue';
import MachineModal from '@/components/Machine/MachineModal';
import StatusModal from '@/components/StatusModal/StatusModal';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'MachineContainer',
  components: {
    Machine,
    MachineModal,
    StatusModal
  },
  data() {
    return {
      showModal: false,
      chosenMachine: {},
      showMsg: false,
      statusMsg: {}
    };
  },
  methods: {
    ...mapActions(['postRentMachine', 'fetchMachines']),
    ...mapMutations(['SET_IS_LOADING']),

    rentAMachine($data) {
      this.showModal = true;
      this.chosenMachine = $data;
    },
    removeModal(e) {
      if (!this.showModal) return;
      if (!e.target.classList.contains('btn')) this.showModal = false;
    },
    handleMsg(data) {
      this.SET_IS_LOADING(true);

      this.postRentMachine(data)
        .then(res => {
          this.showModal = false;
          this.showMsg = true;
          this.statusMsg = { ...res };
          this.SET_IS_LOADING(false);
          this.fetchMachines(this.userAppartment);
        })
        .catch(err => {
          this.showModal = false;
          this.showMsg = true;
          this.statusMsg = { ...err.response.data };
          this.SET_IS_LOADING(false);
        });
    }
  },
  computed: {
    ...mapGetters(['machinesInApp', 'isLoading', 'userAppartment'])
  }
};
</script>
<style lang="sass">
.slide-fade
  &-enter-active,
  &-leave-active  
    transition: all .3s ease-out
  &-enter
    transform: translateX(100px)
    opacity: 1
  &-leave-to
    transform: scale(.5)
    opacity: 0
</style>

