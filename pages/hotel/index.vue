<template>
	<div class="container">
		<el-row>
			<el-col class="header" :span="24">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
					<el-breadcrumb-item>广州酒店预订</el-breadcrumb-item>
				</el-breadcrumb>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<Search @getCityId='getCityId' />
			</el-col>
		</el-row>
		<el-row>
			<Map class="map" :list='list' />
		</el-row>
		<el-row>
			<el-col :span="24">
				<dl class="dl-select">
					<dt>
						<div><span>价格</span>
							<p><i>0</i>-<em>{{hotelPrice}}</em></p>
						</div>
						<el-slider @change="handlePrice" :max="4000" v-model="value"></el-slider>
					</dt>
					<dd>
						<span>住宿等级</span>
						<el-dropdown @command="handleLevelCommand">
							<div class="el-dropdown-link">
								<span>{{levelData}}</span>
								<i class="el-icon-arrow-down"></i>
							</div>
							<el-dropdown-menu class="menu" slot="dropdown">
								<el-dropdown-item v-for="(item, index) in hotelOptions.levels" :key="index" class="item" :command="item.id + '-' + item.name">
									<i class="el-icon-circle-check"></i>
									<span class="dropdown-menu-text">{{item.name}}</span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</dd>
					<dd>
						<span>住宿类型</span>
						<el-dropdown @command="handleTypeCommand">
							<div class="el-dropdown-link">
								<span>{{typeData}}</span>
								<i class="el-icon-arrow-down"></i>
							</div>
							<el-dropdown-menu class="menu" slot="dropdown">
								<el-dropdown-item v-for="(item, index) in hotelOptions.types" :key="index" class="item" :command="item.id + '-' + item.name">
									<i class="el-icon-circle-check"></i>
									<span class="dropdown-menu-text">{{item.name}} </span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</dd>
					<dd>
						<span>酒店设施</span>
						<el-dropdown @command="handleAssetCommand">
							<div class="el-dropdown-link">
								<span>{{assetData}}</span>
								<i class="el-icon-arrow-down"></i>
							</div>
							<el-dropdown-menu class="menu" slot="dropdown">
								<el-dropdown-item v-for="(item, index) in hotelOptions.assets" :key="index" class="item" :command="item.id + '-' + item.name">
									<i class="el-icon-circle-check"></i>
									<span class="dropdown-menu-text">{{item.name}} </span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</dd>
					<dd>
						<span>酒店品牌</span>
						<el-dropdown @command="handleBrandCommand">
							<div class="el-dropdown-link">
								<span>{{brandData}}</span>
								<i class="el-icon-arrow-down"></i>
							</div>
							<el-dropdown-menu class="menu" slot="dropdown">
								<el-dropdown-item v-for="(item, index) in hotelOptions.brands" :key="index" :command="item.id + '-' + item.name">
									<i class="el-icon-circle-check"></i>
									<span class="dropdown-menu-text">{{item.name}} </span>
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</dd>
				</dl>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<List :list='list' />
			</el-col>
		</el-row>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" layout="prev, pager, next" :total="total" prev-text="上一页" next-text="下一页" :pager-count="5">
		</el-pagination>
		<!-- <span v-show="false">{{hotelFilter}}</span> -->
	</div>
</template>

<script>
import Search from '@/components/hotel/search'
import Map from '@/components/hotel/map'
import List from '@/components/hotel/listBar'

export default {
	data() {
		return {
			value: 4000,
			list: [],
			currentPage: 1,
			hotelOptions: {
				assets: [],
				brands: [],
				levels: [],
				types: []
			},
			pageSize: 5,
			pageIndex: 1,
			total: 0,
			hotelForm: {
				hotellevel: null,
				hoteltype: null,
				hotelbrand: null,
				hotelasset: null,
        price_lt: null,
        city: null
			},
			levelData: '不限',
			typeData: '不限',
			brandData: '不限',
			assetData: '不限',
			hotelPrice: '4000'
		}
	},
	components: {
		Search,
		Map,
		List
	},
	mounted() {
		this.getHotelsData()
		this.getHotelOptions()
	},
	methods: {
		// 获取酒店所有列表数据
		getHotelsData() {
			let { hotellevel, hoteltype, hotelbrand, hotelasset, price_lt, city } = this.hotelForm
			this.$axios({
				url: '/hotels',
				params: {
					hotellevel,
					hoteltype,
					hotelbrand,
					hotelasset,
          price_lt,
          city,
					_limit: this.pageSize,
					_start: (this.pageIndex - 1) * this.pageSize
				}
			}).then(res => {
				console.log(res)
				let { data } = res.data
				this.list = data
				this.total = res.data.total
			})
		},
		// 获取酒店选项的接口
		getHotelOptions() {
			this.$axios({
				url: '/hotels/options'
			}).then(res => {
				console.log(res)
				let { data } = res.data
				this.hotelOptions = data
			})
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
			this.pageSize = val
			this.getHotelsData()
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`)
			this.pageIndex = val
			this.getHotelsData()
		},
		// 酒店星级
		handleLevelCommand(command) {
			console.log(command)
			this.hotelForm.hotellevel = command.split('-')[0]
			this.getHotelsData()
			this.levelData = command.split('-')[1]
			console.log(this.hotelForm)
		},
		// 住宿类型
		handleTypeCommand(command) {
			console.log(command)
			this.hotelForm.hoteltype = command.split('-')[0]
			this.getHotelsData()
			this.typeData = command.split('-')[1]
			console.log(this.hotelForm)
		},
		// 酒店品牌
		handleBrandCommand(command) {
			console.log(command)
			this.hotelForm.hotelbrand = command.split('-')[0]
			this.getHotelsData()
			this.brandData = command.split('-')[1]
			console.log(this.hotelForm)
		},
		// 酒店设施
		handleAssetCommand(command) {
			console.log(command)
			this.hotelForm.hotelasset = command.split('-')[0]
			this.getHotelsData()
			this.assetData = command.split('-')[1]
			console.log(this.hotelForm)
    },
    // 根据价格搜索酒店
		handlePrice(val) {
			console.log(val)
			this.hotelForm.price_lt = val
			this.getHotelsData()
			this.hotelPrice = val
    },
    // 根据城市搜索酒店
		getCityId(id) {
      this.hotelForm.city = id
      this.getHotelsData()
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	width: 1000px;
	margin: 0 auto;
	position: relative;
	.header {
		padding: 15px 0;
	}
	.map {
		margin-top: 20px;
	}
	.dl-select {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #ddd;
		padding: 5px 10px;
		margin-top: 20px;
		margin-bottom: 10px;
		dt {
			width: 220px;
			font-size: 14px;
			color: #666666;
			div {
				padding-top: 12px;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.el-slider {
				padding-left: 10px;
				padding-top: 5px;
			}
		}
		dd {
			border-left: 1px solid #ddd;
			padding-left: 20px;
			width: 15%;
			font-size: 14px;
			color: #666666;
			/deep/ .el-dropdown {
				padding-top: 13px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				cursor: pointer;
				.el-dropdown-link {
					width: 145px;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
	}
	.el-pagination {
		display: flex;
		justify-content: flex-end;
		margin: 20px 0;
		.btn-next {
			border: 1px solid #ddd;
		}
	}
}

.menu {
	/deep/ .el-dropdown-menu__item {
		width: 110px;
	}
}
.el-dropdown-menu {
	max-height: 220px;
	overflow: auto;
}
</style>
