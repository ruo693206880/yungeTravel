<template>
	<el-form :model="form" ref="form" :rules="rules" class="form">
		<el-form-item class="form-item" prop="phone">
			<el-input v-model="form.phone" placeholder="用户名手机">
			</el-input>
		</el-form-item>

		<el-form-item class="form-item" prop="code">
			<el-input v-model="form.code" placeholder="验证码">
				<template slot="append">
					<el-button @click="handleSendCaptcha">
						发送验证码
					</el-button>
				</template>
			</el-input>
		</el-form-item>

		<el-form-item class="form-item" prop="username">
			<el-input v-model="form.username" placeholder="你的名字">
			</el-input>
		</el-form-item>

		<el-form-item class="form-item" prop="password">
			<el-input v-model="form.password" placeholder="密码" type="password"></el-input>
		</el-form-item>

		<el-form-item class="form-item" prop="cpassword">
			<el-input v-model="form.cpassword" placeholder="确认密码" type="password">
			</el-input>
		</el-form-item>

		<el-button class="submit" type="primary" @click="handleRegSubmit">
			注册
		</el-button>
	</el-form>
</template>

<script>
export default {
	data() {
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.form.password) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		}
		return {
			// 表单数据
			form: {
				phone: '',
				code: '',
				username: '',
				password: '',
				cpassword: ''
			},
			// 表单规则
			rules: {
				phone: [
					{ required: true, message: '请输入手机号', trigger: 'blur' }
				],
				code: [
					{ required: true, message: '请输入验证码', trigger: 'blur' }
				],
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
				],
				cpassword: [
					{ validator: validatePass2, trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		// 发送验证码
		async handleSendCaptcha() {
			if (!this.form.phone) {
				this.$message.error('你输入的手机号不正确!')
				return
			}
			const code = await this.$store.dispatch('user/sendCaptcha', this.form.phone)
			this.$message.success('模拟验证码:' + code)

		},

		// 注册
		handleRegSubmit() {
			this.$refs.form.validate(async valid => {
				if (valid) {
					try {
						const { code } = await this.$store.dispatch('user/register', {
							username: this.form.phone,
							nickname: this.form.username,
							password: this.form.password,
							captcha: this.form.code
						})
						if (code === 0) {
							this.$message({
								type: 'success',
								showClose: true,
								message: '注册成功,可以登录了'
							})
						}
					} catch (error) {
            console.log(error);
					}
				}
			})
		}
	}
}
</script>

<style scoped lang="less">
.form {
	padding: 25px;
}

.form-item {
	margin-bottom: 20px;
}

.form-text {
	font-size: 12px;
	color: #409eff;
	text-align: right;
	line-height: 1;
}

.submit {
	width: 100%;
	margin-top: 10px;
}
</style>
