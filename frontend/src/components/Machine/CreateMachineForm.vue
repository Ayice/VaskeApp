<template>
  <form class="form login-form" @submit.prevent="createMachine(form)">
    <div class="form-group">
      <label for="machine-name">Maskines navn</label>
      <input
        v-model="form.name"
        type="text"
        class="form-control"
        id="machine-name"
        name="machine-name"
        aria-describedby="machine-name"
        placeholder="Hvid Miele "
      />
      <small id="machine-name" class="form-text text-muted">Skriv Vaskemaskinens navn</small>
    </div>

    <div class="form-group">
      <label for="machine-img">Billede af maskine</label>
      <input
        type="file"
        class="form-control"
        id="machineImg"
        name="machineImg"
        aria-describedby="machineImg"
      />
      <small id="machineImg" class="form-text text-muted">Upload billede af maskine</small>
    </div>

    <div class="form-group">
      <button class="btn btn-success btn-block">Log in</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'create-machine-form',
  data() {
    return {
      name: ''
    };
  }
};
</script>
