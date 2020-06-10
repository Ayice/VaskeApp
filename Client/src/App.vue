<template>
	<div class="app" id="app">
		<Header />
		<router-view />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from './components/Header.vue'

@Component({
	components: {
		Header
	}
})
export default class App extends Vue {
	data() {
		return {}
	}
}
</script>

<style lang="scss">
</style>
