<template>
   <div :ref="dataref" id="mk1" class="pr" @mouseover="hoverActive=true" @mouseout="hoverActive=false">
      <div class="win">
         <div class="mk1">
            <div class="title"><span v-if="list_data.show_name==2">{{list_data.name}}</span></div>
            <div class="content  ofh" :class="{content_w19:dataLocation3=='w19',content_w75:dataLocation3=='w75',content_w95:dataLocation3=='center',
            w95:dataLocation3==''}"
               v-if="Object.keys(list_data).length>0">
               <div class="li fl" v-for="(site,index) in list_data.message">
                  <div class="img">
                     <img src="../../assets/img/img.jpg" alt="123124">
                  </div>
                  <p class="shop_name">{{site.shop_name}}</p>
                  <p class="money">¥&nbsp;<span>{{site.money}}</span></p>
                  <p class="duigou">
                     {{site.duigou}}
                  </p>
                  <p class="shoucang">
                     {{site.shoucang}}
                  </p>
               </div>
            </div>
         </div>
      </div>

      <mkbutton v-if="hoverActive==true" :datamk="datamk" :dataName="dataName" :dataLocation1="dataLocation1"
         :dataLocation2="dataLocation2" :dataLocation3="dataLocation3" :dataLocation4="dataLocation4" :datalength="datalength">
      </mkbutton>
   </div>
</template>
<script>
   import { mapState, mapActions } from 'vuex'
   import Mokuai from '../../assets/js/data.js';
   import fun from '../../assets/js/function.js'
   import mkbutton from './mkbutton/mkbutton'
   export default {
      components: {
         mkbutton
      },
      props: {
         dataref: "",//ref值
         dataName: "",//模块名
         data: null,
         datamk: null,
         dataLocation1: "",//布局位置（hd  ft  con）
         dataLocation2: "",//单元序列（0,1,2 ····）
         dataLocation3: "",//单元布局（w19,w75 w1920）
         dataLocation4: "",//模块序列(0,1,2 ····)
         datalength: "",//模块长度
      },
      data: function () {
         return {
            // 数据对象
            list_data: {
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
               message: [
                  {
                     title_name: "宝贝推荐",
                     shop_name: "商品名称",
                     money: "5.00",
                     duigou: "10000",
                     shoucang: "10000",
                  }
               ],
            },//基础设置数据
            // 功能对象
            hoverActive: false,//按钮是否显示
            // 临时数据对象
            title_name: "宝贝推荐",
            shop_name: "商品名称",
            money: "5.00",
            duigou: "10000",
            shoucang: "10000",
         }
      },
      computed: mapState({
         layout_data: state => state.layout_data,//所有模块的布局信息
      }),
      watch: {
         // 所有模块数据
         layout_data: {
            handler(newName, oldName) {
               var that = this
               that.list_data = that.get_type()
            },
            deep: true,
         },
      },
      mounted: function () {
         var that = this
         // 获取基础设置
         var data = that.get_type()
         // 无基本设置时
         if (Object.keys(data).length == 0) {
            // 无基本设置时设置基本设置
            that.set_data()
         }
         else {
            that.list_data = data
            console.log(data)
         }
      },
      methods: {
         // 获取基本设置
         get_type() {
            var that = this
            var dispatch = this.$store.dispatch
            // 保存位置数据
            var site = {
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4,
            }
            // 获取设置数据
            return fun.get_data(site, that.layout_data)
         },
         // 无基本设置时设置基本设置
         set_data() {
            var that = this
            var dispatch = this.$store.dispatch
            // 发送基础设置数据
            var set_data = {
               name: that.dataName,// 模块名
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
            }
            if (!that.dataLocation3) {
               set_data.baby_type = 4
               set_data.baby_number = 4
               set_data.show_type = 4
            }
            if (that.dataLocation3 == "w19") {
               set_data.baby_type = 3
               set_data.baby_number = 3
               set_data.show_type = 1

            }
            if (that.dataLocation3 == "w75") {
               set_data.baby_type = 3
               set_data.baby_number = 3
               set_data.show_type = 3
            }
            if (that.dataLocation3 == "center") {
               set_data.baby_type = 4
               set_data.baby_number = 4
               set_data.show_type = 4
            }
            var site = {
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4,
            }
            // 向后台发送请求获取首次显示数据
            var message = []
            for (var i = 0; i < set_data.show_type; i++) {
               let data = {
                  title_name: "宝贝推荐",
                  shop_name: "商品名称",
                  money: "5.00",
                  duigou: "10000",
                  shoucang: "10000",
               }
               message[i] = data
            }
            set_data.message = message
            // 保存数据
            fun.first_save_data(dispatch, site, set_data)

         },

      }
   }
</script>
<style lang="less">
   #mk1 {
      width: 100%;
      max-width: 950px;
      margin: 0 auto;

      .mk1 {
         .title {
            font-size: 14px;
            padding: 0 8px;
            height: 30px;
            line-height: 30px;
            color: #ffffff;
            background: #0079fe;
         }

         .content {
            display: -webkit-flex;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .li {
               margin: 10px 0 0;
               width: 188px;
               border: 1px solid #eee;

               .img {
                  width: 180px;
                  height: 180px;
                  margin: 0;
                  padding: 0;
               }

               p {
                  font-size: 14px;
                  padding: 0 10px;
                  height: 25px;
                  line-height: 25px;
               }

               p.money {
                  color: #999999;

                  span {
                     color: #0079fe;
                  }
               }

               p.duigou,
               p.shoucang {
                  height: 14px;
                  padding-left: 20px;
                  margin-left: 10px;
                  height: 25px;
                  line-height: 25px;
                  color: #999999;

                  span {
                     color: #999999;
                  }
               }

               p.duigou {
                  background: url(../../assets/img/duigou.jpg) no-repeat left center;
                  background-size: 14px 14px;
               }

               p.shoucang {
                  background: url(../../assets/img/shoucang.jpg) no-repeat left center;
                  background-size: 14px 14px;
               }
            }
         }

         .content_w75 {
            div.li {
               margin: 10px 0 0;
               width: 240px;
               border: 1px solid #eee;

               div.img {
                  width: 240px;
                  height: 240px;

                  img {
                     width: 240px;
                     height: 240px;
                  }
               }
            }
         }

         .w95,
         .content_w95 {
            div.li {
               margin: 10px 0 0;
               width: 223px;
               border: 1px solid #eee;

               div.img {
                  width: 223px;
                  height: 223px;

                  img {
                     width: 223px;
                     height: 223px;
                  }
               }
            }
         }

      }
   }
</style>