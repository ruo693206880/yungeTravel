<template>
	<div class="main">
		<div class="air-column">
			<h2>剩机人</h2>
			<el-form class="member-info">
				<div class="member-info-item" v-for="(item, index) in form.users" :key="index">

					<el-form-item label="乘机人类型">
						<el-input placeholder="姓名" class="input-with-select" v-model="item.username">
							<el-select slot="prepend" value="1" placeholder="请选择">
								<el-option label="成人" value="1"></el-option>
							</el-select>
						</el-input>
					</el-form-item>

					<el-form-item label="证件类型">
						<el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
							<el-select slot="prepend" value="1" placeholder="请选择">
								<el-option label="身份证" value="1" :checked="true"></el-option>
							</el-select>
						</el-input>
					</el-form-item>

					<span class="delete-user" @click="handleDeleteUser(index)">-</span>
				</div>
			</el-form>

			<el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
		</div>

		<div class="air-column">
			<h2>保险</h2>
			<div>
				<div class="insurance-item" v-for="(item, index) in airInfo.insurances" :key="index">
					<el-checkbox @change="handleInsurance(item.id)" :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" border>
					</el-checkbox>
				</div>
			</div>
		</div>

		<div class="air-column">
			<h2>联系人</h2>
			<div class="contact">
				<el-form label-width="60px">
					<el-form-item label="姓名">
						<el-input v-model="form.contactName"></el-input>
					</el-form-item>

					<el-form-item label="手机">
						<el-input placeholder="请输入内容" v-model="form.contactPhone">
							<template slot="append">
								<el-button @click="handleSendCaptcha">发送验证码</el-button>
							</template>
						</el-input>
					</el-form-item>

					<el-form-item label="验证码">
						<el-input v-model="form.captcha"></el-input>
					</el-form-item>
				</el-form>
				<el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
			</div>
		</div>
		<span v-show="false">{{allPrice}}</span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				users: [
					{
						username: '',
						id: ''
					}
				],
				insurances: [],
				contactName: '',
				contactPhone: '',
				captcha: '',
				invoice: true
			},
			airInfo: {}
		}
	},
	mounted() {
		this.getInsuranceData()
	},
	computed: {
		allPrice() {
      if(!this.airInfo.seat_infos) return
			let price = 0
			price += this.airInfo.seat_infos.org_settle_price
			price += this.airInfo.airport_tax_audlet
			this.form.insurances.forEach(item => {
				price += this.airInfo.insurances[item - 1].price
      })
      price *= this.form.users.length

      this.$store.commit('pticket/setAllPrice', price)

			return ''
		}
	},
	methods: {
		// 添加乘机人
		handleAddUsers() {
			this.form.users.push({
				username: '',
				id: ''
			})
		},
		handleInsurance(id) {
			let index = this.form.insurances.indexOf(id)
			if (index > -1) {
				this.form.insurances.splice(index, 1)
			} else {
				this.form.insurances.push(id)
			}
		},
		// 移除乘机人
		handleDeleteUser(index) {
			this.form.users.splice(index, 1)
		},

		// 发送手机验证码
		async handleSendCaptcha() {
			let code = await this.$store.dispatch('user/sendCaptcha', this.form.contactPhone)
			this.$message.success('您的模拟手机验证为: ' + code)
		},

		// 提交订单
		handleSubmit() {
			let rules = [
				{
					value: this.form.users[0].username,
					message: '乘机人不能为空'
				},
				{
					value: this.form.users[0].id,
					message: '证件不能为空'
				},
				{
					value: this.form.contactName,
					message: '联系人不能为空'
				},
				{
					value: this.form.contactPhone,
					message: '联系电话不能为空'
				},
				{
					value: this.form.captcha,
					message: '手机验证码不能为空'
				}
			]
			let flag = true
			rules.forEach(item => {
				if (!flag) {
					return
				}
				if (!item.value) {
					this.$alert(item.message, '提示', {
						type: 'warning'
					})
					flag = false
				}
			})
			if (!flag) return
			let { id: air, seat_xid } = this.$route.query
			this.form = {
				...this.form,
				air,
				seat_xid
			}
			this.$axios({

				url: '/airorders',
				method: 'post',
				headers: {
					Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
				},
				data: this.form
			}).then(res => {
        console.log(res)
        this.$message.success('订单已生成,正在跳往结算页')
        this.$router.push({
          path: '/pticket/pay',
          query: {
            id: res.data.data.id
          }
        })
			})
		},
		getInsuranceData() {
			let { id, seat_xid } = this.$route.query
			this.$axios({
				url: `/airs/${id}`,
				params: {
					seat_xid
				}
			}).then(res => {
				console.log(res.data)
				this.airInfo = res.data
				this.$store.commit('pticket/setAirInfo', res.data)
			})
		}
	}
}
</script>

<style scoped lang="less">
.air-column {
	border-bottom: 1px #ddd dashed;
	padding-bottom: 20px;
	margin-bottom: 20px;
}

.air-column h2 {
	margin-bottom: 20px;
	font-size: 22px;
	font-weight: normal;
}

/deep/ .el-select .el-input {
	width: 130px;
}

.input-with-select {
	width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
	background-color: #fff;
}
.member-info /deep/ .el-form-item {
	margin-bottom: 0;
}

.member-info-item {
	border-bottom: 1px #eee dashed;
	padding-bottom: 20px;
	position: relative;

	&:first-child {
		.delete-user {
			display: none;
		}
	}
}

.add-member {
	margin-top: 20px;
}

.delete-user {
	display: block;
	background: #ddd;
	width: 16px;
	height: 16px;
	font-size: 14px;
	text-align: center;
	line-height: 16px;
	color: #fff;
	cursor: pointer;
	border-radius: 50px;
	position: absolute;
	right: -30px;
	top: 50%;
}

.insurance {
	> div {
		margin-top: 10px;
	}
}

.insurance-item {
	margin-bottom: 20px;
}

.contact {
	/deep/ .el-input {
		width: 50%;
	}
}

.submit {
	margin: 50px auto;
	display: block;
	width: 250px;
	height: 50px;
}
</style>
