<template>
	<el-row class="container">
		<el-col :span='5'>
			<el-autocomplete class="auto1" v-model="city" :fetch-suggestions="querySearchAsync" placeholder="请输入城市中文或拼音" @select="handleSelect" />
		</el-col>
		<el-col :span='8'>
			<el-date-picker v-model="data" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
			</el-date-picker>
		</el-col>
		<el-col class="user" :span='6'>
			<el-input readonly placeholder="人数未定" suffix-icon="el-icon-user" v-model="person" @focus="isShow = true" @blur="isShow = false">
			</el-input>
			<div v-show="isShow" class="select-box" @mousedown.prevent="isShow = true">
				<el-row class="title">
					<el-col class="everyHome" :span='4'>每间</el-col>
					<el-col :span='10'>
						<el-select @visible-change='isShow = true' size='mini' v-model="personForm.valuePerson" placeholder="请选择">
							<el-option v-for="item in personForm.optionsPeron" :key="item" :label="item + '成人'" :value="item">
							</el-option>
						</el-select>
					</el-col>
					<el-col :span='10'>
						<el-select @visible-change='isShow = true' size='mini' v-model="personForm.valueChildren" placeholder="请选择">
							<el-option v-for="item in personForm.optionsChildren" :key="item" :label="item + '儿童'" :value="item">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<el-button size='mini' @click="handleSure" class="sureBtn" type="primary">确定</el-button>
			</div>
		</el-col>
		<el-col :span='3'>
			<el-button type="primary">查看价格</el-button>
		</el-col>
	</el-row>
</template>

<script>
import _ from 'lodash'

export default {
	data() {
		return {
			data: '',
			person: '',
			city: '',
			personForm: {
				optionsPeron: [1, 2, 3, 4, 5, 6, 7],
				optionsChildren: [0, 1, 2, 3, 4],
				valuePerson: '',
				valueChildren: '',
			},
			isShow: false,
			cities: []
		}
	},
	methods: {
		// querySearchAsync: _.debounce(async function (query, callback) {
		// 	if (this.cities.length) {
		// 		callback(this.cities.filter(item => item.value.indexOf(query) > -1))
		// 	} else {
		//     let res = await this.$axios.get('http://cp-tools.cn/geo/province')
		//     console.log(res)
		//     this.cities = res.data.province.map(item => {
		//       return {
		//         value: item.name,
		//         id: item.id
		//       }
		//     })
		//     callback(this.cities.filter(item => item.value.indexOf(query) > -1))
		// 	}
		// }),
		querySearchAsync(query, callback) {
			if (!query.trim()) {
				callback([])
			} else {
				this.$axios({
					url: '/airs/city',
					params: {
						name: query
					}
				}).then(res => {
          console.log(res)
          this.cities = res.data.data.map(item => {
            return {
              value: item.name,
              id: item.id
            }
          })

          callback(this.cities)
				})
			}
		},
		handleSelect(item) {
			console.log(item)
			this.$emit('getCityId', item.id)
		},
		querySearch() {

		},
		handleSure() {
			this.isShow = false;
			console.log(this.personForm)
			this.person = `${this.personForm.valuePerson} 成人 ${this.personForm.valueChildren} 儿童`
		}
	}
}
</script>

<style lang="less" scoped>
.auto1 {
	margin-right: 10px;
}
.auto2 {
	margin-left: 10px;
}
.user {
	position: relative;
	margin-right: 12px;
	margin-left: 28px;
}
.select-box {
	position: absolute;
	background-color: white;
	padding: 10px;
	z-index: 99;
	margin-top: 8px;
	// border: 1px solid #ddd;
	box-shadow: 2px 2px 2px #f3f3f3, 2px -2px 2px #f3f3f3, -2px 2px 2px #f3f3f3,
		-2px -2px 2px #f3f3f3;
	.title {
		margin-bottom: 40px;
		border-bottom: 1px solid #ccc;
		padding-bottom: 20px;
		.everyHome {
			font-size: 14px;
			color: #666;
			margin-top: 3px;
		}
	}

	.sureBtn {
		margin-top: 20px;
		position: absolute;
		right: 10px;
		bottom: 10px;
	}
}
</style>
