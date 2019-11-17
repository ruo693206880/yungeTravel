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
				<div :id="id" :style="{width:width+'px',height:height+'px'}" class="m-map" />
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	props: {
		width: {
			type: Number,
			default: 410
		},
		height: {
			type: Number,
			default: 260
		},
		point: {
			type: Array,
			default() {
				return [116.46, 39.92]
			}
		}
	},
	data() {
		return {
			id: 'map',
			key: '3afbf17bc61c656c7915b3dda60ed006'
		}
	},
	watch: {
		point(newVal, oldVal) {
			this.map.setCenter(newVal)
			this.marker.setPosition(newVal)
		}
	},
	mounted() {
		this.id = `map${Math.random().toString().slice(4, 6)}`
		window.onmaploaded = () => {
			let map = new window.AMap.Map(this.id, {
				resizeEnable: true,
				zoom: 11,
				center: this.point
			})
			this.map = map
			window.AMap.plugin('AMap.ToolBar', () => {
				let toolbar = new window.AMap.ToolBar()
				map.addControl(toolbar)
				let marker = new window.AMap.Marker({
					icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
					position: this.point
				})
				this.marker = marker
				marker.setMap(map)
			})
		}
		const url = `https://webapi.amap.com/maps?v=1.4.10&key=${this.key}&callback=onmaploaded`
		let jsapi = document.createElement('script')
		jsapi.charset = 'utf-8'
		jsapi.src = url
		document.head.appendChild(jsapi)
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
    .iconhuangguan{
      font-size: #f90;
    }
	}
}
</style>
