<template>
	<div class="container">
		<div v-for="(item, index) in list" :key="index">
			<div v-if="item.images.length >= 3" class="img-more">
				<h3 @click="sendToDetail(item.id)" class="title">{{item.title}}</h3>
				<p @click="sendToDetail(item.id)" class="content">
					<a href="javascript:;">{{item.summary}}</a>
				</p>
				<div @click="sendToDetail(item.id)" class="imgs">
					<a href="#">
						<img :src="item.images[0]" alt="">
					</a>
					<a href="#">
						<img :src="item.images[1]" alt="">
					</a>
					<a href="#">
						<img :src="item.images[2]" alt="">
					</a>
				</div>
				<div class="bottom">
					<div class="left">
						<i class="el-icon-location"></i>
						<span class="city">{{item.cityName}}&nbsp;&nbsp;by</span>
						<img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt="">
						<a class="username" href="#">{{item.account.nickname}}</a>
						<span class="look"><i class="el-icon-view"></i>{{item.watch}}</span>
					</div>
					<div class="right">
						<span>66</span>赞
					</div>
				</div>
			</div>
			<div v-else class="img-one">
				<a @click="sendToDetail(item.id)" v-if="item.images.length" href="javascript:;">
					<img class="left-img" :src="item.images[0]" alt="">
				</a>
				<a @click="sendToDetail(item.id)" v-else href="javascript:;">
					<img class="left-img" src="@/assets/img/left-content.jpg" alt="">
				</a>
				<div class="right">
					<h3 @click="sendToDetail(item.id)" class="title">{{item.title}}</h3>
					<p @click="sendToDetail(item.id)" class="content">{{item.summary}}</p>
					<div class="bottom">
						<div class="left">
							<i class="el-icon-location"></i>
							<span class="city">{{item.cityName}}&nbsp;&nbsp;by</span>
							<!-- <div v-if=""></div> -->
							<img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt="">
							<a class="username" href="#">{{item.account.nickname}}</a>
							<span class="look"><i class="el-icon-view"></i>{{item.watch}}</span>
						</div>
						<div class="right">
							<span>66</span>赞
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		pageSize: {
			type: Number,
			default: 3
		},
		list: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		sendToDetail(id) {
			this.$router.push({
				path: '/strategy/postDetail',
				query: { id }
			})
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	.img-more {
		border-bottom: 1px solid #ddd;
		width: 700px;
		.title {
			padding: 18px 0;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			cursor: pointer;
			&:hover {
				color: #ffa552;
			}
		}
		.content {
			font-size: 14px;
			color: #666;
			line-height: 22px;
			cursor: pointer;
			a {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
			}
		}
		.imgs {
			display: flex;
			justify-content: space-between;
			padding: 20px 0;
			cursor: pointer;
			img {
				width: 220px;
				height: 150px;
			}
		}
		.bottom {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20px;
			align-items: center;
			.left {
				i {
					font-size: 15px;
					color: #999;
				}
				.city {
					font-size: 15px;
					color: #999;
					margin-right: 5px;
				}
				img {
					width: 15px;
					vertical-align: middle;
					margin-top: -3px;
				}
				.username {
					color: #ffa552;
					font-size: 14px;
				}
				.look {
					font-size: 15px;
					color: #999;
					i {
						padding-right: 5px;
					}
				}
			}
			.right {
				color: #ffa552;
				span {
					padding-right: 8px;
				}
			}
		}
	}
	.img-one {
		padding: 20px 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #ddd;
		widows: 700px;
		.right {
			margin-left: 15px;
			.content {
				font-size: 14px;
				color: #666;
				margin: 16px 0;
				line-height: 22px;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				cursor: pointer;
			}
			.title {
				width: 465px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				cursor: pointer;
				&:hover {
					color: #ffa552;
				}
			}
			.bottom {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left {
					i {
						font-size: 15px;
						color: #999;
					}
					.city {
						font-size: 15px;
						color: #999;
						margin-right: 5px;
					}
					img {
						width: 15px;
						vertical-align: middle;
						margin-top: -3px;
					}
					.username {
						color: #ffa552;
						font-size: 14px;
					}
					.look {
						font-size: 15px;
						color: #999;
						i {
							padding-right: 5px;
						}
					}
				}
				.right {
					color: #ffa552;
					span {
						padding-right: 8px;
					}
				}
			}
		}
		.left-img {
			width: 220px;
			height: 150px;
			flex-shrink: 0;
		}
	}
}
</style>
