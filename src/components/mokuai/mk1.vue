<template>
   <div :ref="dataref" id="mk1" class="pr" @mouseover="hoverActive=true" @mouseout="hoverActive=false">
      <div class="win">
         <div class="mk1">
            <div class="title">{{title_name}}</div>
            <div class=" content  ofh" :class="{content_w19:dataLocation3=='w19',content_w75:dataLocation3=='w75',content_w95:dataLocation3=='center',
            content_w95:dataLocation3==''}">
               <div class="li fl" v-if="data_type" v-for="site in parseInt(list_data.baby_number)">
                  <div class="img">
                     <img src="../../assets/img/img.jpg" alt="123124">
                  </div>
                  <p class="shop_name">{{shop_name}}</p>
                  <p class="money">¥&nbsp;<span>{{money}}</span></p>
                  <p class="duigou">
                     {{duigou}}
                  </p>
                  <p class="shoucang">
                     {{shoucang}}
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
            hoverActive: false,//按钮是否显示
            title_name: "宝贝推荐",
            shop_name: "商品名称",
            money: "5.00",
            duigou: "10000",
            shoucang: "10000",
            list_data: {
               baby_number: 3,
            },//设置数据
            data_type: 0,// 是否有设置数据
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
               that.get_type()
            },
            deep: true,
         },
      },
      mounted: function () {
         var that = this
         // 获取基础设置
         that.get_type()
      },
      methods: {
         // 获取基本设置
         get_type() {
            var that = this
            var site = {
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4,
            }
            var data = fun.get_data(site, that.layout_data)
            that.data_type = Object.keys(data).length
            if (that.data_type > 0) {
               that.list_data = data
               console.log(that.list_data)
            }
            else {
               that.data_type = 1
               that.list_data = { "baby_number": 1, }
            }
            console.log(that.list_data)
         },
      }
   }
</script>
<style lang="less">
   #mk1 {
      width: 100%;
      max-width: 950px;
      margin: 0 auto
   }

   #mk1 {
      .mk1 .title {
         font-size: 14px;
         padding: 0 8px;
         height: 30px;
         line-height: 30px;
         color: #ffffff;
         background: #0079fe;
      }

      .img {
         width: 180px;
         height: 180px;
         margin: 0;
         padding: 0;
      }

      .content {
         display: -webkit-flex;
         display: flex;
         flex-wrap: wrap;
         justify-content: space-between;

         div.li {
            margin: 10px 0 0;
            width: 188px;
            border: 1px solid #eee;

            div.img {
               width: 188px;
               height: 188px;

               img {
                  width: 188px;
                  height: 188px;
               }
            }

            p {
               font-size: 14px;
               padding: 0 10px;
               height: 25px;
               line-height: 25px;
            }

            .money {
               color: #999999;
            }

            .money span {
               color: #0079fe;
            }

            .duigou {
               background: url(../../assets/img/duigou.jpg) no-repeat left center;
               background-size: 14px 14px;
            }

            .shoucang {
               background: url(../../assets/img/shoucang.jpg) no-repeat left center;
               background-size: 14px 14px;
            }

            .duigou,
            .shoucang {
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
</style>