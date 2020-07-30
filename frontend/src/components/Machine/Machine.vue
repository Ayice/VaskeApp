<template>
  <div class="machine__container">
    <div class="col-3 machine__image">
      <img :src="apiUrl + machine.machine_image" :alt="machine.title" />
    </div>

    <div class="col-7 machine__text">
      <p class="machine__title">{{ machine.title }}</p>
      <p class="machine__time">{{ timetime | removeDigits }}</p>
    </div>
    <div class="col-2">
      <button class="btn btn-primary machine__rent-btn" @click="$emit('showModal', machine)">Brug</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Machine',
  components: {},
  props: {
    machine: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentDate: 0,
      secondCounter: 0,
      timeLeft: null
    };
  },
  methods: {
    getCurrentDate() {
      if (this.machine.tid_tilbage == 0) return;
      setInterval(() => {
        let dateInMilli = new Date().getTime();
        // let counter = 0;
        let timeLeft = new Date(this.machine.tid_tilbage);
        this.currentDate = (timeLeft - dateInMilli) / 1000 / 60;
      }, 1000);
    }
  },
  created() {
    this.getCurrentDate();
  },
  computed: {
    ...mapGetters(['apiUrl']),

    timetime() {
      if (this.currentDate < 1) return 0;
      return this.currentDate;
    }
  },
  mounted() {
    this.getCurrentDate();
  },
  beforeDestroy() {
    clearInterval(this.timeLeft);
  },
  filters: {
    removeDigits(amount) {
      const amt = Number(amount);
      return (
        (amt &&
          amt.toLocaleString(undefined, { maximumFractionDigits: 0 }) +
            ' min') ||
        '0'
      );
    }
  }
};
</script>

