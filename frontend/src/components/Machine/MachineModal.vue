<template>
	<div class="machine-modal">
		<div class="row">
			<div class="col-12">
				<h2 class="machine-modal__title">{{ machine.title }}</h2>
			</div>
		</div>

		<div class="col-12">
			<div class="machine-modal__img">
				<img :src="api_url + machine.machine_image" :alt="machine.title" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'machine-modal',

	props: {
		machine: {
			type: Object,
			required: true
		}
	},
	computed: {
		api_url() {
			return this.$store.getters.apiUrl
		}
	}
}
</script>

<style>
</style>
