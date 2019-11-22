<template>
	<div class="map-container">
		<el-row>
			<el-col :span=14>
				<div class="search-options el-row">
					<div class="option-row city-row el-row el-row--flex">
						<div class="el-col el-col-3">区域：</div>
						<div class="el-col el-col-24 hidden-all">
							<div class="scenics-box">
								<a href="#" class="location-budget">全部</a>
								<a href="#" class="location-budget">镇兴路沿线</a>
								<a href="#" class="location-budget">视觉艺术学院</a>
								<a href="#" class="location-budget">大成名店</a>
								<a href="#" class="location-budget active">南京西站</a>
								<a href="#" class="location-budget">铜山镇</a>
								<a href="#" class="location-budget">大桥南路</a>
								<a href="#" class="location-budget">宝塔路沿线</a>
								<a href="#" class="location-budget">宝塔路/万辰苏果</a>
								<a href="#" class="location-budget">珠江路沿线</a>
								<a href="#" class="location-budget">华侨城</a>
								<a href="#" class="location-budget">江浦</a>
								<a href="#" class="location-budget">东屏镇</a>
								<a href="#" class="location-budget">南京南站/明发</a>
								<a href="#" class="location-budget">北岭路沿线</a>
								<a href="#" class="location-budget">苜蓿园</a>
								<a href="#" class="location-budget">弘阳广场/新一城</a>
								<a href="#" class="location-budget">新街口地区</a>
								<a href="#" class="location-budget">紫金山/孝陵卫</a>
								<a href="#" class="location-budget">火车站/玄武湖</a>
								<a href="#" class="location-budget">东坝镇</a>
								<a href="#" class="location-budget">禄口机场</a>
								<a href="#" class="location-budget">奥体中心</a>
								<a href="#" class="location-budget">雨润大街</a>
								<a href="#" class="location-budget">新模范马路</a>
								<a href="#" class="location-budget">将军山</a>
								<a href="#" class="location-budget">国际慢城</a>
								<a href="#" class="location-budget">云鼎时尚街区</a>
								<a href="#" class="location-budget">百家湖</a>
								<a href="#" class="location-budget">湖南路</a>
								<a href="#" class="location-budget">竹山路沿线</a>
								<a href="#" class="location-budget">南大/南师大</a>
								<a href="#" class="location-budget">南大</a>
								<a href="#" class="location-budget">湖熟镇</a>
								<a href="#" class="location-budget">南大和园</a>
								<a href="#" class="location-budget">南大和园</a>
								<a href="#" class="location-budget">大西门</a>
								<a href="#" class="location-budget">谷里</a>
								<a href="#" class="location-budget">汤山镇</a>
								<a href="#" class="location-budget">雄州</a>
							</div>
							<a href="#"><i class="el-icon-d-arrow-right"></i>
								等43个区域
							</a>
						</div>
					</div>
					<div class="option-row stragety-row el-row el-row--flex">
						<div class="el-col el-col-3">攻略:</div>
						<div class="el-col el-col-24">
							北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。

							景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。

							由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
					</div>
					<div class="option-row price-row el-row el-row--flex">
						<div class="el-col el-col-3">
							均价
							<el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
								<i class="questiosn">?</i>
							</el-tooltip>
							:</div>
						<div class="el-col el-col-24">
							<div class="el-row el-row--flex">
								<div class="el-col el-col-6">
									<span class="el-tooltip" aria-describedby="el-tooltip-4947" tabindex="0">
										<i class="iconfont iconhuangguan"></i>
										<i class="iconfont iconhuangguan"></i>
										<i class="iconfont iconhuangguan"></i>
										<span class="price-budget">¥332</span>
									</span>
								</div>
								<div class="el-col el-col-7">
									<span class="el-tooltip" aria-describedby="el-tooltip-4595" tabindex="0">
										<i class="iconfont iconhuangguan"></i>
										<i class="iconfont iconhuangguan"></i>
										<i class="iconfont iconhuangguan"></i>
										<i class="iconfont iconhuangguan"></i>
										<span class="price-budget">¥521</span>
									</span>
								</div>
								<div class="el-col el-col-8">
									<span class="el-tooltip" aria-describedby="el-tooltip-9735" tabindex="0">
										<i class="iconfont iconhuangguan"></i>
										<i class="iconfont iconhuangguan"></i>
										<i class="iconfont iconhuangguan"></i>
										<i class="iconfont iconhuangguan"></i>
										<i class="iconfont iconhuangguan"></i>
										<span class="price-budget">¥768</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</el-col>
			<el-col :span=10>
				<div id="container"></div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			map: null
		}
	},
	props: {
		list: {
			type: Array,
			default: () => []
		}
	},
	async mounted() {
		this.map = await this.createMap()
		this.setMarker()
	},
	methods: {
		createMap() {
			return new Promise((resolve) => {
				window.onLoad = () => {
					console.log(this.list)
					var map = new AMap.Map('container', {
						zoom: 15,//级别
						center: [118.8718107, 31.32846821],//中心点坐标
					});
					resolve(map)
				}

				var url = 'https://webapi.amap.com/maps?v=1.4.15&key=3afbf17bc61c656c7915b3dda60ed006&callback=onLoad';
				var jsapi = document.createElement('script');
				jsapi.charset = 'utf-8';
				jsapi.src = url;
				document.head.appendChild(jsapi);
			})
		},
		setMarker() {
			let arr = []
			this.list.forEach(item => {
				var marker = new AMap.Marker({
					position: [item.location.longitude, item.location.latitude], //位置
				})
				marker.setLabel({
					content: item.name,
					direction: 'top'
				})
				// 给点标记添加鼠标移动时间
				// var position = new AMap.LngLat(item.location.longitude, item.location.latitude)
				// AMap.event.addListener(marker, 'mouseover', () => {
				// 	marker.setLabel({
				// 		content: item.name,
				// 		direction: 'top'
				// 	})
				// 	this.map.setCenter(position)
				// })
				// 移除事件
				// AMap.event.addListener(marker, 'mouseout', () => {
				// 	marker.setLabel({
				// 		content: ''
				// 	})
				// })
				arr.push(marker)
			})
			this.map.add(arr)
		}
	}
}
</script>

<style lang="less" scoped>
.search-options {
	padding-right: 20px;
	font-size: 14px;
	color: #666;
	.stragety-row {
		padding: 20px 0;
	}
	.city-row {
		.scenics-box {
			a {
				padding-right: 10px;
				&:hover {
					color: #0099ff;
				}
			}
		}
		.el-icon-d-arrow-right {
			transform: rotate(270deg);
			color: #f90;
		}
	}
	.price-row {
		.questiosn {
			display: inline-block;
			width: 16px;
			height: 16px;
			background-color: #cccccc;
			border-radius: 50%;
			text-align: center;
			cursor: pointer;
		}
		.iconhuangguan {
			font-size: #f90;
		}
	}
}
#container {
	width: 410px;
	height: 260px;
	/deep/ .amap-marker-label {
		position: absolute;
		z-index: 2;
		border: 1px solid #ccc;
		border-radius: 8px;
		background-color: white;
		white-space: nowrap;
		cursor: default;
		padding: 10px;
		font-size: 12px;
		line-height: 14px;
		// top: -12px;
	}
}
</style>
