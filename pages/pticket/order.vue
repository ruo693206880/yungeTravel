<template>
	<div class="container">
		<el-row type="flex" justify="space-between">
			<!-- 订单表单 -->
			<OrderForm />

			<!-- 侧边栏 -->
			<OrderAside :data='$store.state.pticket.airInfo'/>
		</el-row>
	</div>
</template>

<script>
import OrderForm from '@/components/pticket/orderForm'
import OrderAside from '@/components/pticket/orderAside'

export default {
	components: {
		OrderForm,
		OrderAside
	}
}
</script>

<style lang="less" scoped>
.container {
	width: 1000px;
	margin: 20px auto;
}

/*aside*/
.aside {
	width: 350px;
	height: fit-content;
	border: 1px #ddd solid;
}
</style>
