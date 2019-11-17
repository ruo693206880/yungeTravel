<template>
	<el-row class="container">
		<el-col>
			<LeftContent @setCity='setCity'/>
		</el-col>
		<el-col>
			<RightContent  :city='city'/>
		</el-col>
	</el-row>
</template>

<script>
import LeftContent from '@/components/strategy/leftContent'
import RightContent from '@/components/strategy/rightContent'

export default {
  data() {
    return {
      city: ''
    }
  },
	components: {
		LeftContent,
		RightContent
  },
  methods: {
    setCity(city) {
      this.city = city
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
	width: 1000px;
	margin: 0 auto;
	position: relative;
	margin-top: 20px;
}
</style>
