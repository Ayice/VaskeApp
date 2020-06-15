<template>
	<header>
		<nav class="navbar">
			<div class="navbar-brand">
				<router-link to="/" class="navbar-item">
					<img src="../assets/images/vaskeLogo.png" alt="Vaske logo" />
				</router-link>
			</div>

			<a role="button" class="navbar-burger-trigger" @click="showMenu()">
				<span class="navbar-burger-span"></span>
				<span class="navbar-burger-span"></span>
				<span class="navbar-burger-span"></span>
			</a>
			<div class="navbar-menu" :class="show ? 'show' : ''">
				<router-link to="/about" class="navbar-item">About</router-link>

				<router-link to="/about" class="navbar-item">About</router-link>

				<router-link to="/about" class="navbar-item">About</router-link>
			</div>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'Header',
	data() {
		return {
			show: false
		}
	},

	methods: {
		showMenu() {
			this.show = !this.show
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/components/header.scss';
</style>
