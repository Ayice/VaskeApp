<template>
	<div class="machine__container">
		<div class="col-3 machine__image">
			<img :src="api_url + machine.machine_image" :alt="machine.title" />
		</div>

		<div class="col-7 machine__text">
			<p class="machine__title">{{ machine.title }}</p>
			<p class="machine__time">{{ machine.tid_tilbage }}</p>
			<p class="machine__renter">{{ machine.optaget }}</p>
		</div>

		<button
			class="btn btn-primary machine__rent-btn"
			@click="$emit('showModal', machine)"
		>
			Brug
		</button>
	</div>
</template>

<script>
export default {
	name: 'Machine',
	components: {},
	props: {
		machine: {
			type: Object,
			required: true
		},
		data() {
			return {}
		}
	},
	computed: {
		api_url() {
			return this.$store.getters.apiUrl
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/components/_machine.scss';
</style>
