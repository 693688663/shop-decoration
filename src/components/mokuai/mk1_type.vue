<template>
   <div id="mk1_type">
      <div class="title">宝贝推荐 </div>
      <div class="tips">您可以通过系统自动推荐或者手动选择最多28个店铺内宝贝，通常可以用于畅销商品、最新上架的商品推荐等场景</div>
      <ul class="">
         <li class="fl" :class="{active:li_active==1}" @click="li_active=1">宝贝设置</li>
         <li class="fl" :class="{active:li_active==2}" @click="li_active=2">电脑端显示设置</li>
      </ul>
      <div class="con">

      </div>
   </div>
</template>
<script>
   export default {
      data: function () {
         return {
            li_active: 1
         }
      }
   }
</script>
<style>
   #mk1_type {
      margin: 100px auto 0;
      width: 750px;
      background: #fff;

   }

   #mk1_type .title {
      background-color: #2D2D2D;
      color: #fff;
      font-size: 12px;
      height: 28px;
      line-height: 28px;
      padding-left: 12px;
      z-index: 10000388;
      cursor: move;
   }

   #mk1_type .tips {
      background: #eee;
      padding: 10px 15px;
      margin-bottom: 10px;
      font-size: 12px;
   }

   #mk1_type ul {
      height: 24px;
      padding: 0 10px;
      border-bottom: 1px solid #E0E0E0;
   }

   #mk1_type ul li {
      height: 24px;
      line-height: 24px;
      border: 1px solid #d4d4d4;
      border-bottom: none;
      background: #fff;
      background: #ededed;
      color: #666;
      padding: 0 10px;
      font-size: 14px;
      margin-right: 5px;
      cursor: pointer;
   }

   #mk1_type ul li.active {
      color: #000;
      background: #fff;
   }

   #mk1_type .con {
      overflow: scroll;
      height: 520px;
      padding: 30px 0 0;
   }
</style>