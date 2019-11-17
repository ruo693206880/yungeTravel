<template>
	<div class="comment-container">
		<h2>点评</h2>
		<div class="content">
			<div class="left">
				<span>4.4</span>
				<i>挺好哒</i>
			</div>
			<div class="right">
        <div class="title">
          <span>设施<i>4.4</i></span>
          <span>服务<i>4.5</i></span>
          <span>卫生<i>4.6</i></span>
          <span>位置<i>4.5</i></span>
          <span>性价比<i>4.3</i></span>
        </div>
        <div class="bottom">
          <i>不限</i>
          <span>离西站近66</span>
          <span>离西站近</span>
          <span>离西站近</span>
          <span>离西站近</span>
          <span>离西站近</span>
          <span>离西站近</span>
          <span>离西站近</span>
          <span>离西站近</span>
          <span>离西站近</span>
          <span>离西站近</span>
          <span>离西站近</span>
          <span>离西站近</span>
        </div>
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.comment-container {
	h2 {
		border-left: 4px solid #666;
	}
	.content {
    display: flex;
    flex-direction: row;
    // justify-content: center;
    height: 110px;
    border: 1px solid #ddd;
    padding: 30px 0;
    margin-top: 20px;
		.left {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 110px;
      margin-left: 48px;
      border-right: 1px solid #ddd;

      span{
        font-size: 46px;
        font-weight: 700;
        color: #4499ff;
      }
      i{
        // display: block;
        // width: 100px;
        font-size: 22px;
        color: #4499ff;
        // margin-right: 30px;
        // text-align: center;
      }
		}
		.right {
      margin-left: 20px;
      width: 642px;
      .title{
        span{
          font-size: 20px;
          color: #888888;
          padding-right: 20px;
          i{
            color: #555555;
          }
        }
      }
      .bottom{
        margin-top: 20px;
        line-height: 38px;
        i{
          background-color: #4499ff;
          color: white;
          padding: 5px 10px;
          font-size: 14px;
          border-radius: 5px;
          cursor: pointer;
        }
        span{
          padding: 5px 10px;
          background: #eff7ff;
          font-size: 14px;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 5px;
          &:hover{
            background-color: #4499ff;
            color: white;
          }
        }
      }
		}
	}
}
</style>
