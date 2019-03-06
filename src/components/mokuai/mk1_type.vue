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
                  <label><input name="recommend_ways" type="radio" value="1" v-model="data.recommend_ways" />自动推荐</label>
                  <!-- <label><input name="recommend_ways" type="radio" value="2" v-model="data.recommend_ways" />手工推荐</label> -->
               </span>
            </div>
            <div class="li">
               <span class="type">自动推荐排序：</span>
               <span class="messagea">
                  <select class="input-box" name="sort" v-model="data.recommend_sort_type">
                     <option value="1" selected>人气指数</option>
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
                     <option value="1" selected>所以宝贝</option>
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
                  <input type="number" v-model="data.money_min">&nbsp;-&nbsp;<input type="number" v-model="data.money_max">&nbsp;元
               </span>
            </div>
            <div class="li">
               <span class="type">宝贝数量：</span>
               <span class="messagea num">
                  <select class="input-box" v-model="data.baby_type" name="sort" @change="baby_type_fun($event)">
                     <option value="3" v-if="site3=='w75'||site3=='w19'" selected>3</option>
                     <option value="4" v-if="!site3||site3=='center'||site3=='w19'">4</option>
                     <option value="5" v-if="site3=='center'||site3=='w19'">5</option>
                     <option value="6" v-if="site3=='w75'||site3=='w19'">6</option>
                     <option value="7" v-if="site3=='center'||site3=='w19'">7</option>
                     <option value="8" v-if="!site3 ||site3=='center'||site3=='w19'">8</option>
                     <option value="9" v-if="site3=='w75'||site3=='w19'">9</option>
                     <option value="10" v-if="site3=='center'||site3=='w19'">10</option>
                     <option value="12" v-if="!site3||site3=='w75'||site3=='w19'">12</option>
                     <option value="14" v-if="site3=='center'||site3=='w19'">14</option>
                     <option value="0">自定义</option>
                  </select>
                  <input class="baby_number" type="text" v-model="data.baby_number" v-show='data.baby_type==0'>
               </span>
            </div>
         </div>
         <!-- 显示设置 -->
         <div class="display_set" v-show="li_active==2">
            <div class="li display_setup">
               <span class="type">显示设置：</span>
               <span class="messagea">
                  <label><input name="show_name" type="radio" value="1" v-model="data.show_name" />不显示</label>
                  <label><input name="show_name" type="radio" value="2" v-model="data.show_name" />显示</label>
               </span>
               <input class="mk1_type_name" type="text" v-show="data.show_name==2" v-model="data.name">
            </div>
            <div class="li show_way">
               <span class="type">展示方式：</span>
               <span class="message">
                  <div class="show_way_list show_way_list_1" v-show="edit_mk_data.location3=='w19'" @click="data.show_type=1">
                     <div class="dom" :class="{active:data.show_type==1}" @click="data.show_type=1">
                        <div class="border">
                           <div class="dom_con">
                              <div></div>
                              <div></div>
                              <div></div>
                           </div>
                        </div>
                     </div>
                     <p>一行展示一个宝贝</p>
                  </div>
                  <div class="show_way_list show_way_list_3" v-show="edit_mk_data.location3=='w75'" v-model="data.show_type">
                     <div class="dom" :class="{active:data.show_type==3}">
                        <div class="border" @click="data.show_type=3">
                           <div class="dom_con">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                           </div>
                        </div>
                     </div>
                     <p>一行展示三个宝贝</p>
                  </div>
                  <div class="show_way_list show_way_list_4" v-show="edit_mk_data.location3=='center'||edit_mk_data.location3==''"
                     v-model="data.show_type">
                     <div class="dom" :class="{active:data.show_type==4}">
                        <div class="border" @click="data.show_type=4">
                           <div class="dom_con">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                           </div>
                        </div>
                     </div>
                     <p>一行展示四个宝贝</p>
                  </div>
                  <!-- <div class="show_way_list show_way_list_5" v-show="edit_mk_data.location3=='center'||edit_mk_data.location3==''"
                     v-model="data.show_type">
                     <div class="dom" :class="{active:data.show_type==5}">
                        <div class="border" @click="data.show_type=5">
                           <div class="dom_con">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                           </div>
                        </div>
                     </div>
                     <p>一行展示五个宝贝</p>
                  </div>
                  <div class="show_way_list show_way_list_7" v-if="edit_mk_data.location3=='center'||edit_mk_data.location3==''"
                     v-model="data.show_type">
                     <div class="dom" :class="{active:data.show_type==7}">
                        <div class="border" @click="data.show_type=7">
                           <div class="dom_con">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                           </div>
                        </div>
                     </div>
                     <p>一行展示七个宝贝</p>
                  </div> -->
               </span>
            </div>
            <div class="li is_show">
               <span class="type">是否显示：</span>
               <span class="message">
                  <label><input name="yes_show" type="checkbox" value="1" v-model="data.yes_show" />折扣价 </label>
                  <label><input name="yes_show" type="checkbox" value="2" v-model="data.yes_show" />最近30天销售数据</label>
                  <label><input name="yes_show" type="checkbox" value="3" v-model="data.yes_show" />累计评价数 </label>
                  <label><input name="yes_show" type="checkbox" value="4" v-model="data.yes_show" />评论</label>
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
   import fun from '../../assets/js/function.js'
   export default {
      components: {
      },
      data: function () {
         return {
            li_active: 1,//显示切换
            //基本设置信息
            data: {
               name: "",// 模块名
               recommend_ways: "1",// 推荐方式
               recommend_sort_type: '1',//自动推荐排序
               baby_classify: "1",//宝贝分类
               keyword: "",// 关键字
               money_min: "",//最小金额
               money_max: "",// 最大金额
               baby_type: "3",//宝贝数量下标
               baby_number: 3,// 宝贝数量
               show_name: "2",// 显示设置
               show_type: 1,// 展示方式
               yes_show: [],// 是否显示
            },
         }
      },
      computed: mapState({
         edit_mk_data: state => state.edit_mk_data,//当前编辑模块的位置信息
         layout_data: state => state.layout_data,//所有模块的布局信息
         site3: state => state.edit_mk_data.location3,//模块单元位置
      }),
      mounted: function () {
         var that = this
         // 获取数据
         that.get_data()
      },
      methods: {
         // 获取设置数据
         get_data() {
            var that = this
            var data = fun.get_data(that.edit_mk_data, that.layout_data)
            var dataLocation3 = that.edit_mk_data.location3
            var list_data = {};
            // 当数据有意义时
            if (Object.keys(data).length > 0) {
               // 同步到页面
               list_data = data
            }
            // 首次添加模块时设置数据
            else {
               // 设置模块名
               list_data.name = that.edit_mk_data.name
            }
            // 当站全宽时
            if (dataLocation3 == "" || dataLocation3 == "center") {
               if (!list_data.show_type || list_data.show_type < 4) {
                  list_data.show_type = 4
               }
            }
            // 当为190时
            if (dataLocation3 == "w19") {
               // 显示一列
               list_data.show_type = "1"
            }
            // 当为750时
            if (dataLocation3 == "w75") {
               // 显示3列
               list_data.show_type = "3"
            }
            // 循环添加修改的数据
            for (var i = 0; i < Object.keys(list_data).length; i++) {
               that.data[Object.keys(list_data)[i]] = list_data[Object.keys(list_data)[i]]
            }

         },
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
         // 宝贝数量改变
         baby_type_fun(event) {
            var that = this
            // 当为选择数量时
            if (event.target.value != 0) {
               // 设置选择的数量
               that.data.baby_number = event.target.value
            }
         },
         // 保存按钮
         save_fun() {
            var that = this
            var dispatch = this.$store.dispatch
            // 向后台发送请求获取首次显示数据
            var message = []
            console.log(that.data)
            for (var i = 0; i < that.data.baby_number; i++) {
               let data = {
                  title_name: "宝贝推荐",
                  shop_name: "商品名称",
                  money: "5.00",
                  duigou: "10000",
                  shoucang: "10000",
               }
               message[i] = data
            }
            that.data.message = message
            // 保存数据
            fun.save_data(dispatch, that.data)
            // 隐藏弹窗
            that.edit_mk_data_fun(false)
         },


      }
   }
</script>
<style lang="less">
   #mk1_type {
      margin: 100px auto 0;
      width: 800px;
      background: #fff;

      .title {
         background-color: #2D2D2D;
         color: #fff;
         font-size: 12px;
         height: 28px;
         line-height: 28px;
         padding-left: 12px;
         z-index: 10000388;

         .del {
            width: 28px;
            height: 28px;
            background: url(../../../static/img/del_mk_f.png) no-repeat center
         }
      }

      .tips {
         background: #eee;
         padding: 10px 15px;
         margin-bottom: 10px;
         font-size: 12px;
      }

      ul {
         height: 24px;
         padding: 0 10px;
         border-bottom: 1px solid #E0E0E0;

         li {
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

         li.active {
            height: 24px;
            line-height: 24px;
            color: #000;
            background: #fff;
            border-bottom: none;
         }
      }

      .con {
         overflow: scroll;
         height: 520px;
         padding: 30px 0 0;

         .Baby_set .li {
            height: 26px;
            line-height: 26px;
            margin-bottom: 10px;
            font-size: 12px;

            span {
               line-height: 26px;
               display: inline-block
            }

            span.type {
               text-align: right;
               width: 100px;
            }

            .messagea {
               padding-left: 10px;

               label {
                  display: inline-block;
                  line-height: 26px;
                  margin-right: 10px;

                  input {
                     height: 26px;
                     line-height: 26px;
                     display: inline-block;
                     margin: 0 5px 0 0;
                     vertical-align: middle;
                  }
               }

               select {
                  appearance: none;
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  background: url(../../../static/img/FXX.png) no-repeat right center;
                  background-size: 15px 18px;
                  width: 150px;
                  font-size: 12px;
                  height: 24px;
                  line-height: 24px;
                  padding: 0 5px;
               }
            }

            .text input {
               width: 138px;
               height: 23px;
               padding: 0 5px;
               border: 1px solid #a9a9a9
            }

            .money input {
               width: 48px;
               height: 23px;
               padding: 0 5px;
               border: 1px solid #a9a9a9
            }

            .num input {
               width: 138px;
               height: 23px;
               padding: 0 5px;
               border: 1px solid #a9a9a9
            }

         }

         .display_set {
            margin-bottom: 10px;
            font-size: 12px;

            .li {
               line-height: 26px;

               span {
                  display: inline-block;
               }

               span.type {
                  text-align: right;
                  width: 100px;
               }
            }

            .show_way {
               .type {
                  vertical-align: top;
               }



               .message {
                  height: auto;
                  width: 670px;

                  .show_way_list {
                     margin: 10px;
                     float: left;
                     text-align: center;

                     .dom {
                        border: 5px solid #fff;

                        .border {
                           border: 1px solid #ddd;

                           div {
                              div {
                                 background: #ccc;
                              }
                           }
                        }
                     }

                     .dom:hover {
                        border: 5px solid #fefecc;
                     }

                     .active {
                        border: 5px solid #fefecc;
                     }
                  }

                  .show_way_list_1 {

                     .dom {

                        .border {
                           height: 138px;

                           .dom_con {
                              div {
                                 width: 40px;
                                 height: 40px;
                                 margin: 5px auto;
                              }
                           }
                        }
                     }

                  }

                  .show_way_list_3 {
                     width: 200px;

                     .dom {

                        .border {
                           height: 138px;

                           .dom_con {
                              width: 158px;
                              margin: 20px auto;

                              div {
                                 display: inline-block;
                                 width: 45px;
                                 height: 45px;
                              }
                           }
                        }
                     }

                  }

                  .show_way_list_4 {
                     width: 200px;

                     .dom {

                        .border {
                           height: 138px;

                           .dom_con {
                              margin: 25px auto;

                              div {
                                 display: inline-block;
                                 width: 35px;
                                 height: 35px;
                              }
                           }
                        }
                     }

                  }

                  .show_way_list_5 {
                     width: 200px;

                     .dom {

                        .border {
                           height: 138px;

                           .dom_con {
                              margin: 35px auto;

                              div {
                                 display: inline-block;
                                 width: 30px;
                                 height: 30px;
                              }
                           }
                        }
                     }

                  }

                  .show_way_list_7 {
                     width: 200px;

                     .dom {
                        .border {
                           height: 138px;

                           .dom_con {
                              margin: 40px auto;

                              div {
                                 display: inline-block;
                                 width: 23px;
                                 height: 23px;
                              }
                           }
                        }
                     }

                  }
               }
            }

            .is_show {
               .message {
                  line-height: 26px;

                  label {
                     height: 26px;
                     line-height: 26px;
                     margin: 0 5px;
                  }
               }
            }
         }

         .operation {
            margin: 30px 0 20px;
            text-align: center;

            span {
               display: inline-block;
               height: 26px;
               line-height: 26px;
               font-size: 14px;
               width: 50px;
               margin: 0 10px;
               border-radius: 3px;
               cursor: pointer;
            }

            span.save {
               background: #2d2d2d;
               color: #fff;
            }
         }
      }
   }
</style>