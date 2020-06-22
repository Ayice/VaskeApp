<template>
	<div class="machine-container">
		<div class="container" :class="showModal ? 'blur' : ''">
			<div class="row">
				<div class="col-12">
					<h1>Maskiner på din bopæl</h1>
				</div>
			</div>

			<div class="row">
				<div class="col-12">
					<div v-if="machinesInApp.length < 1">
						<p>Der er endnu ikke nogle maskiner oprettet i din bopæl</p>
						<p>Opret en herunder</p>
						<router-link
							to="/create-machine"
							tag="button"
							class="btn btn-primary"
							>Opret maskine her
						</router-link>
					</div>
					<Machine
						v-for="machine in machinesInApp"
						:key="machine._id"
						:machine="machine"
						@showModal="rentAMachine($data)"
						v-else
					>
					</Machine>
				</div>
			</div>
		</div>

		<MachineModal v-if="showModal" :machine="machine"></MachineModal>
	</div>
</template>

<script>
import Machine from '@/components/Machine/Machine.vue'
import MachineModal from '@/components/Machine/MachineModal'
import { mapGetters } from 'vuex'

export default {
	name: 'MachineContainer',
	components: {
		Machine,
		MachineModal
	},
	data() {
		return {
			showModal: false,
			chosenMachine: null
		}
	},
	methods: {
		rentAMachine($data) {
			this.showModal = true
			this.chosenMachine = $data
		}
	},
	computed: {
		...mapGetters(['machinesInApp'])
	}
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/views/_machine-overview';
</style>
