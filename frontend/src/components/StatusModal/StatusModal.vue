<template>
  <div class="status-modal__container">
    <div class="status-modal__header">
      <h1>{{statusMsg.status}}</h1>
    </div>
    <div class="status-modal__body">{{statusMsg.msg}}</div>
    <div class="status-modal__footer">
      <button
        @click="handleClick"
        :class="[statusMsg.status == 'Error' ? 'btn-danger': 'btn-success', 'btn']"
      >Luk besked</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statusMsg: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('closeModal');
    }
  }
};
</script>
