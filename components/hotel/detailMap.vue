<template>
	<div class="detail-map-container">
		<div class="map-left">
			<div id="container"></div>
		</div>
		<div class="list-right">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane class="scenery" label="风景" name="first">
					<ol>
						<li v-for="(item, index) in tableData" :key="index" @mouseenter="enter(item, index)" @mouseleave="leave(item, index)">
							<span>{{item.name}}</span>
							<span>{{(Math.random() * 2).toFixed(2) + '公里'}}</span>
						</li>
					</ol>
				</el-tab-pane>
				<el-tab-pane class="scenery" label="交通" name="second">
					<ol>
						<li v-for="(item, index) in tableData" :key="index" @mouseenter="enter(item, index)" @mouseleave="leave(item, index)">
							<span>{{item.name}}</span>
							<span>{{(Math.random() * 2).toFixed(2) + '公里'}}</span>
						</li>
					</ol>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		mapLocation: {
			type: Object,
			default: () => ({
				longitude: false,
				latitude: false
			})
		},
		name: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			tableData: [],
			activeName: 'first',
			map: null,
			markerList: []
		}
	},
	async mounted() {
		this.map = await this.creatMap()
		// setTimeout(() => {
		this.getTrafficData('110000')
		// }, 1000)
	},
	methods: {
		enter(item, index) {
			var position = new AMap.LngLat(item.location.split(',')[0], item.location.split(',')[1])
			this.map.setCenter(position)

			this.markerList[index].setLabel({
				content: item.name,
				direction: 'top'
			})
		},
		leave(item, index) {
			this.markerList[index].setLabel({
				content: '',
			})
		},
		handleClick(tab, event) {
			console.log(tab.name)
			if (tab.name == 'first') {
        this.map.clearMap()
				this.getTrafficData('110000')

			} else if (tab.name == 'second') {
				this.map.clearMap()
				this.getTrafficData('150700')
			}
		},
		getTrafficData(types) {
			// if(!this.map) return
			console.log(this.mapLocation.longitude, this.mapLocation.latitude)
			this.$axios({
				url: 'https://restapi.amap.com/v3/place/around',
				method: 'get',
				params: {
					key: '3afbf17bc61c656c7915b3dda60ed006',
					// location: '118.8718107,31.32846821',
					location: `${this.mapLocation.longitude},${this.mapLocation.latitude}`,
					// keywords: '风景',
					types,
					// city: '广州',
					radius: '1000',
					offset: '20'
				}
			}).then(res => {
				console.log(res)
				this.tableData = res.data.pois
				let arr = []
				// 生成多个点标记 然后放在数组中
				res.data.pois.forEach(item => {
					var marker = new AMap.Marker({
						position: [item.location.split(',')[0], item.location.split(',')[1]], //位置
					})
					// 给点标记添加鼠标移动时间
					var position = new AMap.LngLat(item.location.split(',')[0], item.location.split(',')[1])
					AMap.event.addListener(marker, 'mouseover', () => {
						marker.setLabel({
							content: item.name,
							direction: 'top'
						})
						this.map.setCenter(position)
					})
					// 移除事件
					AMap.event.addListener(marker, 'mouseout', () => {
						marker.setLabel({
							content: ''
						})
					})

					arr.push(marker)
				})
				this.map.add(arr)
				this.markerList = arr
			})
		},
		creatMap() {
			return new Promise((resolve) => {
				window.onLoad = () => {
					var map = new AMap.Map('container', {
						zoom: 15,//级别
						center: [this.mapLocation.longitude, this.mapLocation.latitude],//中心点坐标
					});
					//this.map = map
					resolve(map)
					// // 添加点标记
					// var marker = new AMap.Marker({
					// 	position: [this.mapLocation.longitude, this.mapLocation.latitude], //位置
					// 	// title: this.name,
					// 	label: {
					// 		content: this.name,
					// 		direction: 'top'
					// 	}
					// })
					// map.add(marker);//添加到地图
				}
				var url = 'https://webapi.amap.com/maps?v=1.4.15&key=3afbf17bc61c656c7915b3dda60ed006&callback=onLoad';
				var jsapi = document.createElement('script');
				jsapi.charset = 'utf-8';
				jsapi.src = url;
				document.head.appendChild(jsapi);
			})

		}
	}
}
</script>

<style lang="less" scoped>
.detail-map-container {
	display: flex;
	justify-content: space-between;
	.map-left {
		width: 650px;
		height: 360px;
		background-color: #ddd;
		#container {
			width: 650px;
			height: 360px;
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
	}
	.list-right {
		width: 330px;
		height: 360px;
		.scenery {
			ol {
				height: 300px;
				overflow: auto;
				margin-top: 6px;
				li {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #666;
					height: 40px;
					padding: 0 20px 0 10px;
					cursor: pointer;
					&:hover {
						color: #f90;
					}
				}
			}
		}
	}
}
</style>
