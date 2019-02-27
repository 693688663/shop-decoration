<template>
   <div id="mk1_type">
      <div class="title pr">宝贝推荐 <span class="del cursor" @click="edit_mk_data_fun(false)"></span></div>
      <div class="tips">您可以通过系统自动推荐或者手动选择最多28个店铺内宝贝，通常可以用于畅销商品、最新上架的商品推荐等场景</div>
      <ul class="">
         <li class="fl" :class="{active:li_active==1}" @click="li_active=1">宝贝设置</li>
         <li class="fl" :class="{active:li_active==2}" @click="li_active=2">电脑端显示设置</li>
      </ul>
      <div class="con">
         <div class="Baby_set" v-show="li_active==1">
            <div class="li">
               <span class="type">推荐方式：</span>
               <span class="messagea">
                  <label><input name="Recommendation" type="radio" value="0" checked="checked" />自动推荐</label>
                  <!-- <label><input name="Recommendation" type="radio" value="1" />手工推荐</label> -->
               </span>
            </div>
            <div class="li">
               <span class="type">自动推荐排序：</span>
               <span class="messagea">
                  <select class="input-box" name="sort" v-model="data.recommend_sort_type">
                     <option value="1" selected="">人气指数</option>
                     <option value="2">热卖宝贝在前</option>
                     <option value="3">热门收藏在前</option>
                     <option value="4">最新发布在前</option>
                     <option value="5">价格最低在前</option>
                     <option value="6">价格最低在后</option>
                  </select>
               </span>
            </div>
            <div class="li">
               <span class="type">宝贝分类：</span>
               <span class="messagea">
                  <select class="input-box" name="sort" v-model="data.baby_classify">
                     <option value="1" selected="">所以宝贝</option>
                     <option value="2">热卖宝贝在前</option>
                     <option value="3">热门收藏在前</option>
                     <option value="4">最新发布在前</option>
                     <option value="5">价格最低在前</option>
                     <option value="6">价格最低在后</option>
                  </select>
               </span>
            </div>
            <div class="li">
               <span class="type">关键字：</span>
               <span class="messagea text">
                  <input type="text" v-model="data.keyword">
               </span>
            </div>
            <div class="li">
               <span class="type">价格范围：</span>
               <span class="messagea money">
                  <input type="text" v-model="data.money_min">&nbsp;-&nbsp;<input type="text" v-model="data.money_max">&nbsp;元
               </span>
            </div>
            <div class="li">
               <span class="type">宝贝数量：</span>
               <span class="messagea num">
                  <select class="input-box" name="sort" v-model="data.baby_type" @change="sort_fun()">
                     <option value="3" selected="">3</option>
                     <option value="4">4</option>
                     <option value="6">6</option>
                     <option value="8">8</option>
                     <option value="10">10</option>
                     <option value="12">12</option>
                     <option value="16">16</option>
                     <option value="0">自定义</option>
                  </select>
                  <input type="text" v-model="data.baby_number" v-show="data.baby_type=='0'">
               </span>
            </div>
         </div>
         <!-- 显示设置 -->
         <div class="display_set" v-if="li_active==2">
            <div class="li">
               <span class="type">显示设置：</span>
               <span class="messagea">
                  <label><input name="display_set" type="radio" value="0" />不显示</label>
                  <label><input name="display_set" type="radio" value="1" checked="checked" />显示</label>
               </span>
               <!-- <input type="text" v-model=""> -->
            </div>
            <div class="li">
               <span class="type">展示方式：</span>
               <span class="message">

               </span>
            </div>
            <div class="li">
               <span class="type">是否显示：</span>
               <span class="message">

               </span>
            </div>
         </div>
         <p class="operation">
            <span class="save" @click="save_fun()">保存</span>
            <span @click="edit_mk_data_fun(false)">取消</span>
         </p>
      </div>
   </div>
</template>
<script>
   // vuex存储
   import { mapState, mapActions, dispatch } from 'vuex'
   export default {
      data: function () {
         return {
            li_active: 1,//显示切换
            //基本设置信息
            data: {
               name: "",// 模块名
               recommend_ways: "1",// 推荐方式
               recommend_sort_type: "1",//自动推荐排序
               baby_classify: "1",//宝贝分类
               keyword: "",// 关键字
               money_min: "",//最小金额
               money_max: "",// 最大金额
               baby_type: "3",//宝贝数量下标
               baby_number: "3",// 宝贝数量
            },
         }
      },
      computed: mapState({
         edit_mk_data: state => state.edit_mk_data,//当前编辑模块的位置信息
         layout_data: state => state.layout_data,//所有模块的布局信息
      }),
      mounted: function () {
         var that = this
         that.get_data()
      },
      methods: {
         // 隐藏模块编辑弹窗
         edit_mk_data_fun(val) {
            var that = this
            var dispatch = this.$store.dispatch
            // 隐藏模块
            dispatch({
               type: "mokuai_mask_ac",
               data: val
            })
         },
         // 保存按钮
         save_fun() {
            var that = this
            var dispatch = this.$store.dispatch
            // 保存数据
            dispatch({
               type: "baby_set_data_ac",
               data: that.data
            })
            // 隐藏模块编辑弹窗
            that.edit_mk_data_fun(false)

         },
         // 宝贝数量切换
         sort_fun() {
            var that = this
            var dispatch = this.$store.dispatch
            // 宝贝数量切换判断是否显示手动输入数量
            if (that.baby_type != "0") {
               that.data.baby_number = that.baby_type
            }
         },
         // 获取数据
         get_data() {
            var that = this
            var site = that.edit_mk_data
            // 创建空对象
            var data_list = {};
            // 根据位置获取模块设置数据
            if (site.location1 == "hd") {
               data_list = that.layout_data.hd[site.location4].data
            }
            if (site.location1 == "ft") {
               data_list = that.layout_data.ft[site.location4].data
            }
            if (site.location1 == "con") {
               if (site.location3 == "w19") {
                  data_list = that.layout_data.con[site.location2].w19[site.location4].data
               }
               if (site.location3 == "w75") {
                  data_list = that.layout_data.con[site.location2].w75[site.location4].data
               }
               if (site.location3 == "center") {
                  data_list = that.layout_data.con[site.location2].w1920[site.location4].data
               }
            }
            // 当模块内部数据有意义则更新当前数据
            if (data_list.baby_type) {
               that.data = data_list
            }
            // 还原空对象
            data_list = {};
         },
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
   }

   #mk1_type .title .del {
      width: 28px;
      height: 28px;
      background: url(../../../static/img/del_mk_f.png) no-repeat center
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
      height: 23px;
      line-height: 23px;
      border: 1px solid #d4d4d4;
      background: #fff;
      background: #ededed;
      color: #666;
      padding: 0 10px;
      font-size: 14px;
      margin-right: 5px;
      cursor: pointer;

   }

   #mk1_type ul li.active {
      height: 24px;
      line-height: 24px;
      color: #000;
      background: #fff;
      border-bottom: none;
   }

   #mk1_type .con {
      overflow: scroll;
      height: 520px;
      padding: 30px 0 0;
   }

   #mk1_type .con .Baby_set .li {
      height: 26px;
      line-height: 26px;
      margin-bottom: 10px;
      font-size: 12px;
   }

   #mk1_type .con .Baby_set .li span {
      line-height: 26px;
      display: inline-block
   }

   #mk1_type .con .Baby_set .li span.type {
      text-align: right;
      width: 100px;
   }

   #mk1_type .con .Baby_set .li .messagea {
      padding-left: 10px
   }

   #mk1_type .con .Baby_set .li .messagea label {
      display: inline-block;
      line-height: 26px;
      margin-right: 10px;
   }

   #mk1_type .con .Baby_set .li .messagea label input {
      height: 26px;
      line-height: 26px;
      display: inline-block;
      margin: 0 5px 0 0;
      vertical-align: middle;
   }

   #mk1_type .con .Baby_set .li .messagea select {
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background: url(../../../static/img/FXX.png) no-repeat right center;
      background-size: 15px 18px;
      width: 150px;
      font-size: 12px;
      height: 24px;
      line-height: 24px;
      padding: 0 5px
   }

   #mk1_type .con .Baby_set .li .text input {
      width: 138px;
      height: 23px;
      padding: 0 5px;
      border: 1px solid #a9a9a9
   }

   #mk1_type .con .Baby_set .li .money input {
      width: 48px;
      height: 23px;
      padding: 0 5px;
      border: 1px solid #a9a9a9
   }

   #mk1_type .con .Baby_set .li .num input {
      width: 138px;
      height: 23px;
      padding: 0 5px;
      border: 1px solid #a9a9a9
   }

   #mk1_type .con .display_set {
      margin-bottom: 10px;
      font-size: 12px;


   }

   #mk1_type .con .display_set .li {
      line-height: 26px;
   }

   #mk1_type .con .display_set .li span {
      display: inline-block;
   }

   #mk1_type .con .display_set .li span.type {
      text-align: right;
      width: 100px;
   }

   #mk1_type .con .operation {
      margin: 30px 0 20px;
      text-align: center;
   }

   #mk1_type .con .operation span {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      font-size: 14px;
      width: 50px;
      margin: 0 10px;
      border-radius: 3px;
      cursor: pointer;
   }

   #mk1_type .con .operation span.save {
      background: #2d2d2d;
      color: #fff;
   }
</style>