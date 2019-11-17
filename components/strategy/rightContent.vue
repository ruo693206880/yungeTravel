<template>
	<el-row :span="24" class="right-container">
		<div class="title">
			<input v-model="input" @keydown.enter="gotoPost" type="text" placeholder="请输入想去的地方,比如:'广州',enter键确认">
			<i class="el-icon-search"></i>
			<dl>
				<dt>推荐</dt>
				<dd v-for="(item, index) in ddList" :key="index" @click="getPostData(item)">{{item}}</dd>
			</dl>
		</div>
		<div class="content">
			<div class="title">
				<span>推荐攻略</span>
				<el-button @click="writePost" type="primary" icon="el-icon-edit">写游记</el-button>
			</div>
			<List :pageSize='pageSize' :list='list' />
		</div>
		<!-- 分页组件 -->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 5, 10, 15]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</el-row>
</template>

<script>
import List from './list'

export default {
	props: ['city'],
	data() {
		return {
			currentPage: 1,
			pageSize: 3,
			list: [],
			current: 0,
      total: 0,
      ddList: ['广州', '上海', '北京'],
      input: ''
		}
	},
	components: {
		List
	},
	watch: {
		city(newVal) {
			this.getPostData(newVal)
		}
	},
	mounted() {
		this.getPostData()
		console.log(this.city, 'abc')
	},
	methods: {
		handleSizeChange(val) {
			console.log(`每页${val}条`);
			this.pageSize = val
			this.getPostData()
		},
		handleCurrentChange(val) {
			console.log(`当前页${val}`);
			this.current = (val - 1) * this.pageSize
			this.getPostData()
    },
    gotoPost(){
      if(this.input.trim() === ''){
        return
      }
      this.getPostData(this.input)
      this.input = ''
    },
		getPostData(city) {
			this.$axios({
				url: '/posts',
				params: {
					_limit: this.pageSize,
					_start: this.current,
					city
				}
			}).then(res => {
				let { data } = res.data
				this.list = data
				this.total = res.data.total
			})
		},
		writePost() {
			this.$router.push('/strategy/addPost')
		}
	},
}
</script>

<style lang="less" scoped>
.right-container {
	position: relative;
	width: 700px;
	.title {
		input {
			// outline-color: #ffa500;
			outline: none;
			border: 2px solid #ffa500;
			height: 40px;
			width: 100%;
			line-height: 40px;
			text-indent: 10px;
			box-sizing: border-box;
		}
		i {
			position: absolute;
			right: 10px;
			top: 8px;
			color: #ffa500;
			font-size: 26px;
			font-weight: 700;
		}
		dl {
			display: flex;
			flex-direction: row;
			align-items: center;
			margin-top: 10px;
			font-size: 14px;
			color: #666;
			dd {
				margin-left: 10px;
				cursor: pointer;
				&:hover {
					color: #ffa500;
				}
			}
		}
	}
	.content {
		margin-top: 10px;
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #ddd;
			// padding: 8px 0;
			span {
				color: #ffa500;
				font-size: 22px;
				padding: 18px 0;
				border-bottom: 2px solid #ffa500;
			}
		}
	}
	.el-pagination {
		margin: 20px 0;
	}
}
</style>
