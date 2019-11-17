<template>
	<section class="contianer">
		<el-row type="flex" justify="space-between">

			<!-- 顶部过滤列表 -->
			<div class="flights-content">
				<!-- 过滤条件 -->
				<FlightsFilters :data='list' @setDataList='setDataList' />

				<!-- 航班头部布局 -->
				<FlightsListHead />

				<!-- 航班信息 -->
				<FlightsItem v-for="(item, index) in dataList" :key="index" :data='item' />

				<!-- 分页组件 -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>

			<!-- 侧边栏 -->
			<div class="aside">
				<!-- 侧边栏组件 -->
				<FlightsAside />
			</div>
		</el-row>
	</section>
</template>

<script>
import FlightsListHead from '@/components/pticket/flightsListHead'
import FlightsItem from '@/components/pticket/flightsItem'
import FlightsFilters from '@/components/pticket/flightsFilters'
import FlightsAside from '@/components/pticket/flightsAside'

import moment from "moment";

export default {
	data() {
		return {
			list: {
				flights: [],
				info: {},
				options: {}
			},
			// dataList: [],
			pageIndex: 1,
			pageSize: 5,
			total: 0,
			copyList: {
				flights: [],
				info: {},
				options: {}
			}
		}
	},
	components: {
		FlightsListHead,
		FlightsItem,
		FlightsFilters,
		FlightsAside
	},
	computed: {
		dataList() {
			return this.copyList.flights.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
		}
	},
	mounted() {
		this.getListData(this.$route.query)
	},
	async beforeRouteUpdate(to, from, next) {
		await this.getListData(to.query)
		next()
	},
	methods: {
		// 获取航班列表的数据
		getListData(query) {
			return this.$axios({
				url: '/airs',
				params: query
			}).then(res => {
				this.list = res.data
				// this.dataList = this.list.flights.slice(0, this.pageSize)
				this.total = res.data.total
				this.copyList = { ...res.data }
			})
		},
		// 分页组件的改变每页多少条的方法
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
			this.pageSize = val
			// this.dataList = this.list.flights.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
		},
		// 改变分页组件第几页的方法
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`)
			this.pageIndex = val
			// this.dataList = this.list.flights.slice((val - 1) * this.pageSize, val * this.pageSize)
		},
		// 过滤后子组件传过来的数据
		setDataList(arr) {
			if (arr) {
				this.pageIndex = 1
				this.copyList.flights = arr
				this.total = arr.length
			}
			// this.dataList = this.list.flights.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
			// this.total = this.list.total
		}
	}
}
</script>

<style scoped lang="less">
.contianer {
	width: 1000px;
	margin: 20px auto;
}

.flights-content {
	width: 745px;
	font-size: 14px;
	.el-pagination {
		display: flex;
		justify-content: center;
		margin: 20px 0 10px 0;
	}
}

.aside {
	width: 240px;
}
</style>
