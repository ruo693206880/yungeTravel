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
					<div class="quill-editor" :content="postForm.content" @change="onEditorChange($event)" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @ready="onEditorReady($event)" v-quill:myQuillEditor="editorOption">
					</div>
				</el-form-item>
				<el-form-item>
					<span>选择城市&nbsp;&nbsp;</span>
					<el-autocomplete v-model="postForm.search_city" :fetch-suggestions="querySearchAsync" placeholder="请搜索游玩城市" @select="handleSelect"></el-autocomplete>
				</el-form-item>
				<el-form-item class="send">
					<el-button @click="onSubmit" type="primary">发布</el-button>
					<span>或者</span>
					<a href="#">保存到草稿</a>
				</el-form-item>
			</el-form>
		</div>
		<div class="aside">
			<dl>
				<dt>草稿箱(<i>0</i>)</dt>
				<dd></dd>
			</dl>
		</div>
	</div>
</template>

<script>
import _ from 'lodash'

export default {
	data() {
		return {
			postForm: {
				input: '',
				content: '',
				search_city: ''
			},
			editorOption: {
				modules: {
					toolbar: [
						['bold', 'italic', 'underline', 'strike'],
						[{ 'header': 1 }, { 'header': 2 }],
						['image', 'video']
					]
				}
			},
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
	mounted() {
		console.log('this is current quill instance object', this.myQuillEditor)
	},
	methods: {
		onEditorChange(editor) {
		},
		onEditorBlur(editor) {
			console.log(editor);
			this.postForm.content = editor.container.innerText
		},
		onEditorReady(editor) {

		},
		onEditorFocus(editor) {

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
			padding: 10px 0 20px 14px;
		}
	}
}
</style>
