<template>
	<div class="container">
		<el-autocomplete class="auto1" v-model="input" :fetch-suggestions="querySearchAsync" placeholder="请输入城市中文或拼音" @select="handleSelect" />
		<el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
		</el-date-picker>
		<el-autocomplete class="auto2" popper-class="my-autocomplete" v-model="state" :fetch-suggestions="querySearch" placeholder="人数未定" @select="handleSelect">
			<i class="el-icon-user-solid el-input__icon" slot="suffix">
			</i>
		</el-autocomplete>
    <el-button type="primary">查看价格</el-button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: '',
			input: '',
			state: ''
		}
	},
	methods: {
		querySearchAsync() {

		},
		handleSelect(item) {
			console.log(item.value);
		},
		querySearch() {

		}
	}
}
</script>

<style lang="less" scoped>
.auto1{
  margin-right: 10px;
}
.auto2{
  margin-left: 10px;
}
</style>
