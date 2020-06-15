<template>
	<form class="form login-form" @submit.prevent="login(form)">
		<div class="form-group">
			<label for="email">Email address</label>
			<input
				v-model="form.email"
				type="email"
				class="form-control"
				id="email"
				name="email"
				aria-describedby="emailHelp"
				placeholder="example@example.com"
			/>
			<small id="emailHelp" class="form-text text-muted">Write your email address here</small>
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<input
				v-model="form.password"
				type="password"
				class="form-control"
				id="password"
				name="password"
				aria-describedby="passwordHelp"
				placeholder="******"
			/>
			<small id="passwordHelp" class="form-text text-muted">Write your password here</small>
		</div>

		<div class="form-group">
			<button class="btn btn-success btn-block">Log in</button>
		</div>
	</form>
</template>

<script>
import { postLogin } from '../utils/api.js'

export default {
	name: 'LoginForm',
	data() {
		return {
			form: {
				email: '',
				password: ''
			}
		}
	},
	methods: {
		login(form) {
			const data = {
				email: form.email,
				password: form.password
			}
			postLogin(data).then(data => {
				// Need to save this data.token in store, for future requests.
				console.log(data)
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../../assets/styles/basics/_forms.scss';
@import '../../../assets/styles/components/_login-form.scss';
</style>
