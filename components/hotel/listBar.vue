<template>
	<div class="container-all">
		<div class="hotel-list-container" v-for="(item, index) in list" :key="index">
			<div class="left-container">
				<img @click="goToHotemDeatail(item.id)" class="left" :src="item.photos" alt="">
				<div class="center">
					<h2 @click="goToHotemDeatail(item.id)">{{item.name}}</h2>
					<div class="title-en"><span>{{item.alias}}</span><span>{{item.hoteltype.name}}</span></div>
					<div class="star">
						<el-rate v-model="item.stars" disabled show-score text-color="#ff9900" score-template="{value}">
						</el-rate>
						<p><i>17</i>条评论</p>
						<p><i>78</i>篇游记</p>
					</div>
					<div class="address">
						<i class="el-icon-location">&nbsp;位于:&nbsp;</i>
						<span>{{item.address}}</span>
					</div>
				</div>
			</div>
			<div class="right">
				<ul>
					<li v-for="(item, index) in item.products" :key="index">
						<span>{{item.name}}</span>
						<div class="money">
							<span>￥<i>{{item.price}}</i> </span>起<i class="el-icon-arrow-right"></i>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: 3.7
		}
	},
	props: {
		list: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		goToHotemDeatail(id) {
      this.$router.push(`/hotel/${id}.html`)
      this.$store.commit('hotel/setId', id)
		}
	}
}
</script>

<style lang="less" scoped>
.hotel-list-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 0;
	.left-container {
		display: flex;
		justify-content: space-between;
		.left {
			width: 320px;
			height: 210px;
			flex-shrink: 0;
			cursor: pointer;
		}
		.center {
			margin-left: 20px;
			margin-top: 20px;
			width: 420px;
			h2 {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				cursor: pointer;
				&:hover {
					color: #ff9952;
				}
			}
			.address {
				padding-top: 20px;
				width: 420px;
			}
			.title-en {
				display: block;
				padding: 10px 0;
				width: 420px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.star {
				display: flex;
				// justify-content: space-between;
				align-items: center;
				p {
					padding-left: 20px;
				}
			}
		}
	}

	.right {
		padding-right: 10px;
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ddd;
			height: 50px;
			line-height: 50px;
			padding: 0 10px 0 10px;
			font-size: 14px;
			color: #666;
			cursor: pointer;
			&:hover {
				background: #f5f7fa;
			}
			& > span {
				padding-right: 50px;
			}
			.money {
				span {
					color: #ff9952;
					font-size: 16px;
					padding-right: 4px;
				}
			}
		}
	}
}
</style>
