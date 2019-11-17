<template>
	<div class="container">
		<floor v-if="floorItem.parent" :floorItem='floorItem.parent' @reply='reply' />
		<div @mouseenter.prevent="enter" @mouseleave.prevent="leave" class="parentComent">
			<div class="title">
				<div class="author">
					<img :src="$axios.defaults.baseURL + floorItem.account.defaultAvatar" alt="">
					<span>{{floorItem.account.nickname}}</span>
					<i>2019-11-08 10:56</i>
				</div>
				<span>1</span>
			</div>
			<p class="text-content">{{floorItem.content}}</p>
			<div v-if="floorItem.pics.length" class="imgs-box">
				<div class="img-content">
					<img src="http://157.122.54.189:9095/uploads/cbcf595571f546249cbdac26684ba9bd.jpg" alt="">
				</div>
				<div class="img-content">
					<img src="http://157.122.54.189:9095/uploads/cbcf595571f546249cbdac26684ba9bd.jpg" alt="">
				</div>
			</div>
			<a v-show="isShow" @click="reply" class="reply" href="javascript:;">回复</a>
		</div>
	</div>
</template>

<script>
export default {
	name: 'floor',
	data() {
		return {
			isShow: false
		}
	},
	props: {
		floorItem: {
			type: Object,
			default: () => { }
		}
	},
	mounted() {
		console.log(this.floorItem);
	},
	methods: {
		enter() {
			this.isShow = true
		},
		leave() {
			this.isShow = false
		},
		reply(data) {
			if (data.id) {
				this.$emit('reply', data)
			} else {
				this.$emit('reply', this.floorItem.id)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.parentComent {
	position: relative;
	border: 1px solid #ddd;
	border-bottom: 1px dashed #ddd;
	padding: 10px;
	background-color: #f9f9f9;
	&:last-child {
		border-bottom: none;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.author {
			img {
				width: 18px;
			}
		}
	}
	.text-content {
		margin: 20px 0;
	}
	.imgs-box {
		display: flex;
		flex-direction: row;
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
</style>
