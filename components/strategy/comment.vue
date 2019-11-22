<template>
	<div class="m-comment">
		<span id="jump" class="pinglun">评论</span>
		<span v-show="HFisShow" class="huifu-btn">回复 @地球发动机
			<i class="el-tag__close el-icon-close" @click="close"></i>
		</span>
		<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
		</el-input>
		<div class="upload-button">
			<el-upload action="http://127.0.0.1:1337/upload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" name='files' :file-list="picsArr">
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-button @click="submitPost" class="submitbtn" type="primary">提交</el-button>
		</div>
		<!-- 评论内容区域 -->
		<ul class="comment-content">
			<li @mouseover.stop="enter" @mouseout.stop="leave" v-for="(item, index) in commentsList" :key="index">
				<div class="title">
					<div class="author">
						<img :src="$axios.defaults.baseURL + item.account.defaultAvatar" alt="">
						<span>{{item.account.nickname}}</span>
						<i>2019-11-08 10:56</i>
					</div>
					<span>1</span>
				</div>
				<ParentComment  v-if="item.parent" :floorItem='item.parent' :floorItemLenght="item" class="parentComment" @reply="getParentCommentId" />
				<p class="text-content">{{item.content}}</p>
				<div v-if="item.pics.length" class="imgs-box">
					<div class="img-content">
						<img v-for="(itemImg, index) in item.pics" :key="index" :src="$axios.defaults.baseURL + itemImg.url" alt="">
					</div>
				</div>
				<a v-show="isShow" @click="reply(item.id)" class="reply" href="javascript:;">回复</a>
			</li>
		</ul>
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[2, 5, 10, 20]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>
</template>

<script>
import ParentComment from '@/components/strategy/parentComent'

export default {
	props: ['id'],
	data() {
		return {
			textarea: '',
			currentPage: 1,
			commentsList: [],
			pageSize: 2,
			pageIndex: '',
			total: 0,
			isShow: false,
			followId: null,
			HFisShow: false,
			picsArr: []
		}
	},
	methods: {
		handleSuccess(res) {
			console.log(res)
			res.forEach(item => {
        item.url = this.$axios.defaults.baseURL + item.url
      })
      this.picsArr = res
		},
		handleRemove(file, fileList) {
			console.log(file, fileList)
		},
		handlePictureCardPreview(file) {
			console.log(file)
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`)
			this.pageSize = val
			this.getCommentsData()
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`)
			this.pageIndex = (val - 1) * this.pageSize
			this.getCommentsData()
		},
		reply(id) {
			this.followId = id
			// this.getCommentsData()
			console.log(id)
			this.HFisShow = true
			// this.getCommentsData(id)
		},
		close() {
			this.HFisShow = false
		},
		getParentCommentId(obj) {
			console.log(obj)
		},
		// 获取评论列表
		getCommentsData() {
			this.$axios({
				url: '/posts/comments',
				params: {
					post: this.id.id,
					_limit: this.pageSize,
					_start: this.pageIndex,
				}
			}).then(res => {
				console.log(res)
				let { data } = res.data
				this.commentsList = data
				this.total = res.data.total
			})
		},
		submitPost() {
			if (this.HFisShow) {
				this.sendComment(this.followId)
				this.HFisShow = false
			} else {
				this.sendComment()
			}

		},
		// 发送评论
		sendComment(follow) {
      console.log(this.picsArr)
			let token = this.$store.state.user.userInfo.token
			this.$axios({
				url: '/comments',
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token || 'NO TOKEN'}`
				},
				data: {
					content: this.textarea,
					post: this.id.id,
					follow,
					pics: this.picsArr
				}
			}).then(res => {
				console.log(res)
				if (res.data.status === 0) {
					this.$message.success(res.data.message)
					this.getCommentsData()
          this.textarea = ''
          this.picsArr = []
				}
			})
		},
		enter() {
			this.isShow = true
		},
		leave() {
			this.isShow = false
		}
	},
	mounted() {
		this.getCommentsData()
	},
	components: {
		ParentComment
	}
}
</script>

<style lang="less" scoped>
.m-comment {
	width: 700px;
	.pinglun {
		display: block;
		font-size: 18px;
		padding-bottom: 20px;
	}
	.huifu-btn {
		display: inline-block;
		font-size: 14px;
		color: #666;
		background-color: #f4f4f5;
		text-align: center;
		padding: 8px;
		margin-bottom: 10px;
		border-radius: 4px;
		.el-tag__close {
			border-radius: 50%;
			padding: 2px;
			cursor: pointer;
			&:hover {
				background-color: #909399;
				color: white;
			}
		}
	}
	.upload-button {
		display: flex;
		justify-content: space-between;
		margin: 16px 0 28px 0;
		// flex-direction: row;
		/deep/ .el-upload-list--picture-card {
			/deep/ .el-upload-list__item {
				width: 100px;
				height: 100px;
			}
			/deep/ .el-upload-list__item {
				.el-upload-list__item-thumbnail {
					width: 100px;
					height: 100px;
				}
			}
		}
		/deep/ .el-upload--picture-card {
			width: 100px;
			height: 100px;
			line-height: 100px;
		}
		.el-upload {
		}
		.submitbtn {
			width: 70px;
			height: 32px;
			line-height: 0px;
		}
	}
	.comment-content {
		border: 1px solid #ddd;
		li {
			position: relative;
			border-bottom: 1px dashed #ddd;
			padding: 20px;
			&:last-child {
				border-bottom: none;
			}
			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				img {
					width: 18px;
				}
			}
			.parentComment {
				margin-left: 30px;
				margin-top: 15px;
			}
			.text-content {
				margin: 20px 0 20px 30px;
			}
			.imgs-box {
				display: flex;
				flex-direction: row;
				margin-left: 30px;
				.img-content {
					border: 1px dashed #ddd;
					width: 90px;
					height: 90px;
					margin-right: 2px;
					img {
						width: 80px;
						height: 80px;
						vertical-align: middle;
						margin-top: 5px;
						margin-left: 5px;
					}
				}
			}
			.reply {
				position: absolute;
				bottom: 10px;
				right: 20px;
				font-size: 14px;
				color: #1e50a2;
			}
		}
	}
	.el-pagination {
		display: flex;
		justify-content: center;
		margin: 20px 0;
	}
}
</style>
