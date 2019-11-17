<template>
	<div class="filters">
		<el-row type="flex" class="filters-top" justify="space-between" align="middle">
			<el-col :span="8">
				单程：
				{{data.info.departCity}} - {{data.info.destCity}}
				/
				{{data.info.departDate}}
			</el-col>
			<el-col :span="4">
				<el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
					<el-option v-for="(item, index) in data.options.airport" :key="index" :label="item" :value="item">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
					<el-option v-for="(item, index) in data.options.flightTimes" :key="index" :label="`${item.from}:00 - ${item.to}:00`" :value="`${item.from},${item.to}`">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
					<el-option v-for="(item, index) in data.options.company" :key="index" :label="item" :value="item">
					</el-option>
				</el-select>
			</el-col>
			<el-col :span="4">
				<el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
					<el-option v-for="(item, index) in airSizeList" :key="index" :label="item.value" :value="item.type">
					</el-option>
				</el-select>
			</el-col>
		</el-row>
		<div class="filter-cancel">
			筛选：
			<el-button type="primary" round plain size="mini" @click="handleFiltersCancel">
				撤销
			</el-button>
		</div>
		<span v-show="false">{{filter}}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			airport: "",        // 机场
			flightTimes: "",    // 出发时间
			company: "",        // 航空公司
			airSize: "",        // 机型大小
			airSizeList: [
				{ value: '大', type: 'L' },
				{ value: '中', type: 'M' },
				{ value: '小', type: 'S' }
			]
		}
	},
	props: {
		data: {
			type: Object,
			default: () => ({
				flights: [],
				info: {},
				options: {}
			})
		}
	},
	computed: {
		filter() {
			let arr = this.data.flights.filter(item => {
				let valid = true

				let [start, end] = this.flightTimes.split(',')
				let current = item.dep_time.split(':')[0]

				if (this.airport && this.airport !== item.org_airport_name || this.company && this.company !== item.airline_name || this.airSize && this.airSize !== item.plane_size || this.flightTimes && !(start <= current && current < end)) {
					valid = false
				}

				return valid
			})

			this.$emit('setDataList', arr)

			return ''
		}
	},
	methods: {
		// 选择机场时候触发
		handleAirport(value) {
			// let arr = this.data.flights.filter(item => {
			// 	return item.org_airport_name == value
			// })

			// this.$emit('setDataList', arr)
		},

		// 选择出发时间时候触发
		handleFlightTimes(value) {
			// let [start, end] = value.split(',')
			// let arr = this.data.flights.filter(item => {
			// 	let current = item.dep_time.split(':')[0]
			// 	return start <= current && current < end
			// })

			// this.$emit('setDataList', arr)
		},

		// 选择航空公司时候触发
		handleCompany(value) {
			// let arr = this.data.flights.filter(item => {
			// 	return item.airline_name == value
			// })

			// this.$emit('setDataList', arr)
		},

		// 选择机型时候触发
		handleAirSize(value) {
			// let arr = this.data.flights.filter(item => {
			// 	return item.plane_size == value
			// })

			// this.$emit('setDataList', arr)
		},

		// 撤销条件时候触发
		handleFiltersCancel() {
			this.airport = ""        // 机场
			this.flightTimes = ""    // 出发时间
			this.company = ""       // 航空公司
			this.airSize = ""

			this.$emit('setDataList', this.data.flights)
		},
	}
}
</script>

<style scoped lang="less">
.filters {
	margin-bottom: 20px;
}

.filters-top {
	> div {
		/deep/ .el-select {
			margin-left: 10px;
		}
	}
}

.filter-cancel {
	margin-top: 10px;
}
</style>
