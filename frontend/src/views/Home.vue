<template>
	<div class="container fullscreen-height">
		<div class="row mt-5">
			<div class="home-view col-12">
				<h1 class="title">Login</h1>
				<LoginForm />
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import LoginForm from '@/components/Login/components/LoginForm.vue'
export default {
	name: 'Home',
	components: {
		LoginForm
	}
}
</script>
<style lang="scss">
@import '@/assets/styles/views/_home.scss';
</style>
