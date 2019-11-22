<template>
	<div class="container">
		<div class="left-box">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/strategy' }">旅游攻略</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/strategy/postDetail?id=4' }">攻略详情</el-breadcrumb-item>
			</el-breadcrumb>
			<h2 class="title">{{data.title}}</h2>
			<div class="navbar">攻略：<i>2019-05-22 10:57</i>阅读：<em>9900</em></div>
			<div class="post-content" v-html="data.content"></div>
			<ul class="interActive">
				<li>
					<i class="el-icon-edit-outline"></i>
					<span>评论(<i>100</i>)</span>
				</li>
				<li>
					<i class="el-icon-star-off"></i>
					<span>收藏</span>
				</li>
				<li>
					<i class="el-icon-share"></i>
					<span>分享</span>
				</li>
				<li>
					<i class="el-icon-thumb"></i>
					<span>点赞(<i>66</i>)</span>
				</li>
			</ul>
			<!-- 评论组件 -->
			<Comment :id='postId' />
		</div>

		<div class="right-box">
			<dl>
				<dt>相关攻略</dt>
				<dd @click="goToPostDetail(item)" v-for="(item, index) in recommentList" :key="index">
					<img v-if="!item.images.length" src="http://157.122.54.189:9095/uploads/a278a2283b884a09baa6f96656b3d61a.gif" alt="">
					<img v-else :src="item.images[0]" alt="">
					<div class="right">
						<span>{{item.title}}</span>
						<div><span>2019-11-07 4:21</span> 阅读 <i>8</i></div>
					</div>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script>
import Comment from '@/components/strategy/comment'

export default {
	data() {
		return {
			postId: this.$route.query,
			data: {},
			recommentList: []
		}
	},
	components: {
		Comment
	},
	mounted() {
		this.getPostDeatailData(this.postId.id)
		this.getPostRecommend()
	},
	async beforeRouteUpdate(to, from, next) {
		await this.getPostDeatailData(to.query.id)
    next()
	},
	methods: {
		getPostDeatailData(id) {
			this.$axios({
				url: '/posts',
				params: {
					id
				}
			}).then(res => {
				console.log(res)
				let { data } = res.data
				this.data = data[0]
			})
		},
		getPostRecommend() {
			this.$axios({
				url: '/posts/recommend',
				params: {
					id: this.postId.id
				}
			}).then(res => {
				console.log(res)
				let { data } = res.data
				this.recommentList = data
			})
		},
		goToPostDetail(item) {
			this.$router.push({
				path: '/strategy/postDetail',
				query: { id: item.id }
			})
		}
	}
}
</script>

<style lang="less" scoped>
.container {
	display: flex;
	justify-content: space-between;
	width: 1000px;
	margin: 0 auto;
	.left-box {
		width: 700px;
		.el-breadcrumb {
			margin: 20px 0;
		}
		.title {
			font-size: 32px;
			border-bottom: 1px solid #ddd;
			padding: 4px 0 20px 0;
		}
		.navbar {
			color: #999999;
			text-align: right;
			padding: 20px;
		}
		.post-content {
			max-width: 700px !important;
			/deep/ img {
				max-width: 700px !important;
			}
		}
		.interActive {
			display: flex;
			flex-direction: row;
			justify-content: center;
			margin: 40px 0 20px 0;
			li {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				padding-right: 50px;
				cursor: pointer;
				& > i {
					font-size: 36px;
					color: #f90;
				}
				span {
					padding-top: 5px;
					font-size: 14px;
					color: #999999;
				}
				&:last-child {
					padding-right: 0;
				}
			}
		}
	}
	.right-box {
		width: 280px;
		dt {
			border-bottom: 1px solid #ddd;
			padding-bottom: 20px;
			font-size: 24px;
			padding-top: 30px;
		}
		dd {
			display: flex;
			border-bottom: 1px solid #ddd;
			padding: 20px 0;
			cursor: pointer;
			img {
				width: 100px;
				height: 80px;
				flex-shrink: 0;
				cursor: pointer;
			}
			.right {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 14px;
				margin-left: 10px;
				color: #999;
				> span {
					display: block;
					margin-top: 5px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
