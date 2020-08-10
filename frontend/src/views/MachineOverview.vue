<template>
  <div class="machine-container container">
    <transition
      name="slide"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="sass">

.slide
  &-enter-active 
    transition: all .5s ease
  &-leave-active 
    transition: all .5s ease
  &-enter
    opacity: 0
    transform: translateX(-50%)
  &-leave-to 
    opacity: 0
    transform: translateX(50%)

</style>
