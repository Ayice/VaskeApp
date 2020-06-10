<template>
  <div class="machine__container columns">
    <div class="column is-3 machine__image">
      <img src="" alt="" />
    </div>

    <div class="column is-4 machine__text">
      <p class="machine__title">
        {{ machine.title }}
      </p>
      <p class="machine__time">
        {{ machine.time }}
      </p>
      <p class="machine__renter">
        {{ machine.renter }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
type machine = {
  id: number
  title: string
  time: string
  renter: string
}

import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Machine extends Vue {
  @Prop({ required: true }) readonly machine!: machine
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/_machine.scss';
</style>
