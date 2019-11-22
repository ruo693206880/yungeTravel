<template>
	<div class="hotel-detail">
		<!-- 面包屑组件 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/hotel' }">南京酒店</el-breadcrumb-item>
			<el-breadcrumb-item>{{detailData.name}}</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 酒店名字 -->
		<div class="hotel-name">
			<span class="name">{{detailData.name}}</span>
			<span>
				<i class="iconfont iconhuangguan"></i>
				<i class="iconfont iconhuangguan"></i>
				<i class="iconfont iconhuangguan"></i>
				<i class="iconfont iconhuangguan"></i>
				<i class="iconfont iconhuangguan"></i>
			</span>
			<p>{{detailData.alias}}</p>
		</div>
		<!-- 地址 -->
		<div class="address">
			<i class="el-icon-location"></i>
			<span>{{detailData.address}}</span>
		</div>
		<!-- 图片 -->
		<div class="imgs">
			<div class="big-img">
				<img ref="bigImg" src="@/assets/img/1.jpeg" alt="">
			</div>
			<div class="small-img">
				<!-- <img v-for="(item, index) in detailData.pics" :key="index" @click="selectImg(item.url)" :src="$axios.defaults.baseURL + item.url" alt=""> -->
				<img v-for="(item, index) in imgs" :key="index" @click="selectImg(item)" :src="item" alt="">
			</div>
		</div>
		<!-- 表格组件 -->
		<el-table :data="detailData.products" style="width: 100%">
			<el-table-column prop="name" label="酒店名字">
			</el-table-column>
			<el-table-column prop="bestType" label="低价房型">
			</el-table-column>
			<el-table-column prop="price" label="最低价格/每晚" width="150">
				<template slot-scope="scope">
					<div class="cell" @click="handleCell(scope.row)">
						<span>￥{{scope.row.price}}元起</span>
						<span><i class="el-icon-arrow-right"></i></span>
					</div>
				</template>

			</el-table-column>
		</el-table>
		<!-- 地图组件 -->
		<Map class="map" :mapLocation='detailData.location' :name='detailData.name'/>
		<!-- 酒店基本信息 -->
		<div class="assets-info">
			<el-row>
				<el-col class="left" :span="4">基本信息</el-col>
				<el-col class="right" :span="20">
					<el-col :span="6">入住时间: 14:00之后</el-col>
					<el-col :span="6">离店时间: 12:00之前</el-col>
					<el-col :span="6">{{detailData.creation_time}} / {{detailData.renovat_time}}</el-col>
					<el-col :span="6">酒店规模: {{detailData.roomCount}}间客房</el-col>
				</el-col>
			</el-row>
			<el-row class="facilities">
				<el-col class="left" :span="4">主要设施</el-col>
				<el-col class="facilities-right right" :span="20">
					<span>吹风机</span>
					<span>外币兑换服务</span>
					<span>wifi</span>
					<span>电梯</span>
					<span>洗衣服务</span>
					<span>热水壶</span>
				</el-col>
			</el-row>
			<el-row>
				<el-col class="left" :span="4">停车服务</el-col>
				<el-col class="right" :span="20">
					<el-col :span="6">-</el-col>
				</el-col>
			</el-row>
			<el-row>
				<el-col class="left" :span="4">品牌信息</el-col>
				<el-col class="right" :span="20">
					<el-col :span="6">-</el-col>
				</el-col>
			</el-row>
		</div>
		<!-- 评论组件 -->
		<Comment class="comment" />
	</div>
</template>

<script>
import Map from '@/components/hotel/detailMap'
import Comment from '@/components/hotel/comment'

export default {
	data() {
		return {
			imgs: [require('@/assets/img/1.jpeg'), require('@/assets/img/2.jpeg'), require('@/assets/img/3.jpeg'), require('@/assets/img/4.jpeg'), require('@/assets/img/5.jpeg'), require('@/assets/img/6.jpeg')],
			detailData: {}
		}
	},
	components: {
		Map,
		Comment
	},
	mounted() {
		this.getHotelDetail()
	},
	methods: {
		selectImg(item) {
			this.$refs.bigImg.src = item
		},
		getHotelDetail() {
			this.$axios({
				url: '/hotels',
				params: {
					id: JSON.parse(localStorage.getItem('store')).hotel.id
				}
			}).then(res => {
				let { data } = res.data
				this.detailData = data[0]
				console.log(data)
			})
		},
		handleCell(item) {
			console.log(item)
		}
	}
}
</script>

<style lang="less" scoped>
.hotel-detail {
	width: 1000px;
	margin: 0 auto;
	.el-breadcrumb {
		margin: 20px 0;
	}
	.hotel-name {
		.name {
			font-size: 26px;
			// font-weight: 700;
			padding-right: 10px;
		}
		p {
			padding: 6px 0;
		}
	}
	.imgs {
		display: flex;
		justify-content: space-between;
		width: 1000px;
		margin: 30px 0;
		.big-img {
			margin-right: 20px;
			img {
				width: 640px;
				height: 360px;
				cursor: pointer;
			}
		}
		.small-img {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			// width: 353px;
			img {
				width: 160px;
				height: 110px;
				margin-bottom: 15px;
				cursor: pointer;
			}
		}
	}
	.el-table {
		/deep/ .el-table__row {
			cursor: pointer;
		}
	}
	.map {
		margin: 30px 0;
	}
	.assets-info {
		.el-row {
			height: 60px;
			line-height: 60px;
			border-bottom: 1px solid #ddd;
			.right {
				font-size: 14px;
				color: #666;
			}
			.left {
				font-size: 15px;
				padding-left: 10px;
			}
		}
		.facilities {
			.facilities-right {
				span {
					padding: 5px 10px;
					background-color: #eeeeee;
					font-size: 14px;
				}
			}
		}
	}
	.comment {
		margin: 30px 0;
	}
}
</style>
