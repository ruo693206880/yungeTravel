<template>
	<div class="detail-map-container">
		<div class="map-left">
			<div id="container"></div>
		</div>
		<div class="list-right">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane class="scenery" label="风景" name="first">
					<ol>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
					</ol>
				</el-tab-pane>
				<el-tab-pane class="scenery" label="交通" name="second">
					<ol>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
						<li>
							<span>红太阳广州</span>
							<span>1.03公里</span>
						</li>
					</ol>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tableData: [
				{
					scenery: '红太阳广州',
					distance: '1.03公里'
				},
				{
					scenery: '红太阳广州',
					distance: '1.03公里'
				},
				{
					scenery: '红太阳广州',
					distance: '1.03公里'
				},
				{
					scenery: '红太阳广州',
					distance: '1.03公里'
				},
				{
					scenery: '红太阳广州',
					distance: '1.03公里'
				},
				{
					scenery: '红太阳广州',
					distance: '1.03公里'
				},
				{
					scenery: '红太阳广州',
					distance: '1.03公里'
				},
				{
					scenery: '红太阳广州',
					distance: '1.03公里'
				},
				{
					scenery: '红太阳广州',
					distance: '1.03公里'
				},
				{
					scenery: '红太阳广州',
					distance: '1.03公里'
				}
			],
			activeName: 'first'
		}
	},
	methods: {
		handleClick() {

		}
	},
	mounted() {
		window.onLoad = function () {
			var map = new AMap.Map('container', {
				zoom: 11,//级别
				center: [116.397428, 39.90923],//中心点坐标
			});

      // 添加点标记
			var marker = new AMap.Marker({
        position: [116.39, 39.9], //位置
        title: '北京天安门'
			})
			map.add(marker);//添加到地图
		}
		var url = 'https://webapi.amap.com/maps?v=1.4.15&key=3afbf17bc61c656c7915b3dda60ed006&callback=onLoad';
		var jsapi = document.createElement('script');
		jsapi.charset = 'utf-8';
		jsapi.src = url;
		document.head.appendChild(jsapi);
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
				}
			}
		}
	}
}
</style>
