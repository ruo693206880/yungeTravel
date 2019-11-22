<template>
	<div class="container">
		<div class="main">
			<el-form ref="form" :model="postForm" label-width="80px">
				<el-form-item>
					<h2>发表新攻略</h2>
				</el-form-item>
				<el-form-item>
					<span>分享你的个人游记，让更多人看到哦！</span>
				</el-form-item>
				<el-form-item>
					<el-input v-model="postForm.input" placeholder="请输入标题"></el-input>
				</el-form-item>
				<el-form-item>
					<!-- <div class="quill-editor" :content="postForm.content" @change="onEditorChange($event)" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" v-quill:myQuillEditor="editorOption">
					</div> -->
					<vue-editor useCustomImageHandler @image-added="handleImageAdded" :editorToolbar="customToolbar" v-model="postForm.content" aria-placeholder="没有内容"></vue-editor>
				</el-form-item>
				<el-form-item>
					<span>选择城市&nbsp;&nbsp;</span>
					<el-autocomplete v-model="postForm.search_city" :fetch-suggestions="querySearchAsync" placeholder="请搜索游玩城市" @select="handleSelect"></el-autocomplete>
				</el-form-item>
				<el-form-item class="send">
					<el-button @click="onSubmit" type="primary">发布</el-button>
					<span>或者</span>
					<a @click="savePost" href="javascript:;">保存到草稿</a>
				</el-form-item>
			</el-form>
		</div>
		<div class="aside">
			<dl>
				<dt>草稿箱(<i>0</i>)</dt>
				<dd @click="getPostItem(item)" v-for="(item, index) in $store.state.stragety.draftList" :key="index">
					<div class="content">
						<span>{{item.input}}</span>
						<i class="el-icon-edit"></i>
					</div>
					<span>{{item.saveDate}}</span>
				</dd>
			</dl>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'

export default {
	data() {
		return {
			postForm: {
				input: '',
				content: '',
				search_city: '',
				saveDate: moment(new Date()).format('YYYY-MM-DD')
			},
			// editorOption: {
			// 	modules: {
			// 		toolbar: [
			// 			['bold', 'italic', 'underline', 'strike'],
			// 			[{ 'header': 1 }, { 'header': 2 }],
			// 			['image', 'video']
			// 		]
			// 	}
			// },
			customToolbar: [['bold', 'italic', 'underline'], [{ 'header': 1 }, { 'header': 2 }], ['image', 'video']],
			city: [
				{ "value": "北京市", "address": "长宁区新渔路144号" },
				{ "value": "南京市", "address": "上海市长宁区路6" },
				{ "value": "天津市", "address": "上海市普陀区真北路988号创邑金沙谷" },
				{ "value": "成都市", "address": "天山西路438号" },
				{ "value": "上海市", "address": "上海市长宁区金钟路9" },
				{ "value": "广州市", "address": "上海市长宁区金钟路633号" },
				{ "value": "武汉市", "address": "上海市嘉定区曹安公路曹安路" },
				{ "value": "珠海市", "address": "上海市普陀区同普路1435号" },
				{ "value": "三亚市", "address": "上海市北翟路1444弄81号B幢-107" },
			]
		}
	},
	computed: {
		saveDraftList() {
			let arr = []
			arr.push({
				title: this.postForm.input,
				content: this.postForm.content,
				city: this.postForm.search_city
			})

			console.log(arr)
			return arr

		}
	},
	mounted() {
		console.log('this is current quill instance object', this.myQuillEditor)
	},
	methods: {
		// onEditorChange(editor) {
		// },
		// onEditorBlur(editor) {
		// 	console.log(editor);
		// 	this.postForm.content = editor.container.innerText
		// },
		// onEditorFocus(editor) {

		// },
		handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
			var formData = new FormData()
			formData.append('files', file)
			this.$axios({
				url: '/upload',
				method: 'post',
				data: formData
			}).then(res => {
				console.log(res)
				let url = 'http://127.0.0.1:1337' + res.data[0].url
				Editor.insertEmbed(cursorLocation, 'image', url)
				resetUploader()
			}).catch(err => {
				console.log(err)
			})
		},
		handleSelect(item) {
			console.log(item);
		},
		querySearchAsync: _.debounce(function (query, callback) {
			if (this.city.length) {
				callback(this.city.filter(item => item.value.indexOf(query) > -1))
			}
		}),
		onSubmit() {
			console.log(this.postForm);
			let token = this.$store.state.user.userInfo.token
			if (!token) {
				this.$message.error('请先登录')
				this.$router.push('/user/login')
				return
			}
			this.$axios({
				url: '/posts',
				method: 'post',
				data: {
					content: this.postForm.content,
					title: this.postForm.input,
					city: this.postForm.search_city
				},
				headers: {
					Authorization: `Bearer ${token || 'NO TOKEN'}`
				}
			}).then(res => {
				console.log(res);
				this.$message.success(res.data.message)
				this.$router.push('/strategy')
			})
		},
		// 保存到草稿箱
		savePost() {
			let token = this.$store.state.user.userInfo.token
			if (!token) {
				this.$message.error('请先登录')
				this.$router.push('/user/login')
				return
			}
			console.log(this.postForm)
			this.$store.commit('stragety/addDraftList', {...this.postForm})
			this.postForm.input = ''
			this.postForm.content = ''
			this.postForm.search_city = ''
		},
		// 把草稿箱的赋值给列表
		getPostItem(item) {
			this.postForm.input = item.input
			this.postForm.content = item.content
			this.postForm.search_city = item.search_city
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
	margin-top: 20px;
	.main {
		width: 750px;
		.quill-editor {
			min-height: 400px;
			max-height: 400px;
			overflow-y: auto;
		}
		.send {
			a {
				color: #f90;
			}
		}
	}
	.aside {
		width: 200px;
		dl {
			border: 1px solid #ddd;
			padding: 10px 10px 20px 14px;
			dt {
				padding-bottom: 10px;
			}
			dd {
				border: 1px solid #ddd;
				padding: 8px 10px;
				line-height: 28px;
				margin-bottom: 8px;
				cursor: pointer;
				.content {
					display: flex;
					justify-content: space-between;
				}
			}
		}
	}
}
/deep/ .el-form-item {
	/deep/ .el-form-item__content {
		margin-left: 0;
	}
}
</style>
