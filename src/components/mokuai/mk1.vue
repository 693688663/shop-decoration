<template>
   <div :ref="dataref" id="mk1" class="pr" @mouseover="hoverActive_fun(true)" @mouseout="hoverActive_fun(false)">
      <div class="win">
         <div class="mk1">
            <!-- title -->
            <div class="title"><span v-if="list_data.show_name==2">{{list_data.name}}</span></div>
            <!-- content -->
            <div class="content  ofh" :class="{content_w19:dataLocation3=='w19',content_w75:dataLocation3=='w75',content_w95:dataLocation3=='center',
            w95:dataLocation3==''}"
               v-if="Object.keys(list_data).length>0">
               <div class="li fl" v-for="(site,index) in message">
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
      <!-- 操作按钮 -->
      <mkbutton v-if="hoverActive==true" :datamk="datamk" :dataName="dataName" :dataLocation1="dataLocation1"
         :dataLocation2="dataLocation2" :dataLocation3="dataLocation3" :dataLocation4="dataLocation4" :datalength="datalength">
      </mkbutton>
   </div>
</template>
<script>
   import { mapState, mapActions } from 'vuex'
   import Mokuai from '../../assets/js/data.js';
   import fun from '../../assets/js/function.js'
   import mkbutton from './mkbutton/mkbutton'//引入操作按钮
   export default {
      components: {
         mkbutton//引入操作按钮
      },
      // 接收父组件传值
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
      // 创建初始变量
      data: function () {
         return {
            // 临时数据对象
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
               show_type: 1,// 展示列数
               yes_show: [],// 是否显示
            },
            // 获取的后台数据对象
            message: [],
            // 功能对象
            hoverActive: false,//按钮是否显示         
         }
      },
      // 获取vuex的传值
      computed: mapState({
         layout_data: state => state.layout_data,//所有模块的布局信息
      }),
      // 监听对象改变
      watch: {
         // 所有模块数据
         layout_data: {
            handler(newName, oldName) {
               var that = this
               // 获取设置数据
               that.list_data = that.get_type()
               // 获取后台数据
               that.get_message()
            },
            deep: true,
         },
      },
      // 加载及执行
      mounted: function () {
         var that = this
         // 判断数据来源 如果为index
         if (!that.data) {
            // 获取设置数据
            var data = that.get_type()
            // 如果没有设置数据时 ，说明为首次添加模块还为设置数据
            if (Object.keys(data).length == 0) {
               // 新建原始设置数据
               that.set_data()
            }
            // 有设置数据时
            else {
               // 设置数据赋值
               that.list_data = data
            }
         }
         // 如果有测说明数据来源于预览页
         else {
            // 设置数据赋值
            that.list_data = that.data
         }
         // 获取数据
         that.get_message()
      },
      methods: {
         // 编辑按钮显示
         hoverActive_fun(value) {
            var that = this
            // 如果data有意义说明数据来源于浏览页
            if (that.data) {
               // 此时编辑按钮始终不显示
               that.hoverActive = false
            }
            // 否则鼠标可控制编辑按钮是否显示
            else {
               that.hoverActive = value

            }
         },
         // 获取后台数据
         get_message() {
            var that = this
            // 创建初始数据为空
            that.message = []
            // 循环模拟请求的数据
            for (var i = 0; i < that.list_data.baby_number; i++) {
               let data = {
                  title_name: "宝贝推荐",
                  shop_name: "商品名称",
                  money: "5.00",
                  duigou: "10000",
                  shoucang: "10000",
               }
               // 数据添加到对象
               that.message[i] = data
            }
         },
         // 获取设置数据
         get_type() {
            var that = this
            var dispatch = this.$store.dispatch
            // 模块位置信息
            var site = {
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4,
            }
            // 根据位置信息及布局数据获取模块的设置数据
            return fun.get_data(site, that.layout_data)
         },
         // 无设置数据时添加设置数据
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
            // 当位置3无意义是说明在头部或尾部此时，可显示4列初始产品数量为4及一排
            if (!that.dataLocation3) {
               set_data.baby_type = 4
               set_data.baby_number = 4
               set_data.show_type = 4
            }
            // 当位置在w19中时只能显示一列初始产品数量为3
            if (that.dataLocation3 == "w19") {
               set_data.baby_type = 3
               set_data.baby_number = 3
               set_data.show_type = 1

            }
            // 当位置w75中时说明只能显示3列初始产品数量为3
            if (that.dataLocation3 == "w75") {
               set_data.baby_type = 3
               set_data.baby_number = 3
               set_data.show_type = 3
            }
            // 当位置center中时说明只能显示3列初始产品数量为3
            if (that.dataLocation3 == "center") {
               set_data.baby_type = 4
               set_data.baby_number = 4
               set_data.show_type = 4
            }
            // 位置信息
            var site = {
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4,
            }
            // 将设置信息保存在本地状态仓库
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