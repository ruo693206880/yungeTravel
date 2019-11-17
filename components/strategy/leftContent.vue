<template>
	<div class="left-container">
		<div class="top">
			<ul @mouseenter="enter" @mouseleave="leave">
				<li @mouseover="handerActive(index)" :class="{active: index ===currentIndex}" v-for="(item, index) in list" :key="index">
					<span>{{item.type}}</span>
				</li>
			</ul>
		</div>
		<div v-if="flag" class="aside" @mouseenter="enter" @mouseleave="leave">
			<ul>
				<li v-for="(item, index) in list[currentIndex].children" :key="index" @click="goToCityDetail(item.city)">
					<div>
						<i>{{index + 1}}</i>
						<em>{{item.city}}</em>
						<a href="#">{{item.desc}}</a>
					</div>
				</li>
			</ul>
		</div>
		<div class="bottom">
			<span>推荐城市</span>
			<img src="@/assets/img/left-content.jpg" alt="">
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			currentIndex: 0,
			flag: false
		}
	},
	mounted() {
		this.getCityData()
	},
	methods: {
		handerActive(index) {
			this.currentIndex = index
		},
		enter() {
			this.flag = true
		},
		leave() {
			this.flag = false
		},
		getCityData() {
			this.$axios({
				url: '/posts/cities'
			}).then(res => {
				let { data } = res.data
				this.list = data
			})
		},
		goToCityDetail(city) {
      this.$emit('setCity', city)
		}
	}
}
</script>

<style lang="less" scoped>
.left-container {
	position: relative;
	width: 260px;
	.top {
		ul {
			border: 1px solid #ddd;
			.active {
				color: #ffa500;
				// border-color: #ffa500;
			}
			li {
				position: relative;
				height: 50px;
				line-height: 50px;
				border-bottom: 1px solid #ddd;
				padding: 0 19px;
				cursor: pointer;
				::after {
					display: block;
					content: '';
					width: 10px;
					height: 10px;
					border-right: 1px solid #999;
					border-top: 1px solid #999;
					-webkit-transform: rotate(45deg);
					transform: rotate(45deg);
					position: absolute;
					right: 20px;
					top: 20px;
				}

				&:hover {
					:after {
						border-color: #ffa500;
					}
				}
			}
		}
	}
	.aside {
		position: absolute;
		width: 330px;
		top: 0;
		left: 260px;
		border: 1px solid #ddd;
		background: #fff;
		z-index: 99;
		padding: 5px 19px 15px 19px;
		li {
			height: 50px;
			line-height: 50px;
			width: 100%;
			cursor: pointer;
			i {
				font-style: oblique;
				font-size: 24px;
				color: #ffa500;
			}
			em {
				color: #ffa500;
				padding: 0 8px;
				font-size: 16px;
			}
			div {
				color: #999999;
				font-size: 14px;
				a {
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}
	.bottom {
		span {
			display: block;
			border-bottom: 1px solid #ddd;
			padding: 10px 0;
			margin-top: 10px;
		}
		img {
			margin-top: 10px;
			width: 100%;
		}
	}
}
</style>
