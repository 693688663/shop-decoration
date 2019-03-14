<template>
   <div :ref="dataref" id="mk8" class="pr" @mouseover="hoverActive_fun(true)" @mouseout="hoverActive_fun(false)">
      <div class="CustomService">
         <h2 :style="title_bg">
            <span v-if="get_CustomData.selected5">{{get_CustomData.set_title}}</span>
         </h2>
         <ul>
            <li>
               <span>工作时间</span>
               <p v-show="get_CustomData.selected">
                  <em>{{get_CustomData.working_str_time}}</em>至
                  <em>{{get_CustomData.working_end_time}}</em>：
                  <font>
                     <em>{{get_CustomData.firdetail_start}}</em>-
                     <em>{{get_CustomData.firdetail_end}}</em>
                  </font>
               </p>
               <p v-if="get_CustomData.selected2">
                  <em>{{get_CustomData.weekend_str_time}}</em>至
                  <em>{{get_CustomData.weekend_end_time}}</em>：
                  <font>
                     <em>{{get_CustomData.secdetail_start}}</em>-
                     <em>{{get_CustomData.secdetail_end}}</em>
                  </font>
               </p>
            </li>
            <li>
               <span>联系方式</span>
               <p v-if="get_CustomData.selected3">
                  联系电话：
                  <font>{{get_CustomData.tel}}</font>
               </p>
               <p v-if="get_CustomData.selected4">
                  联系手机：
                  <font>{{get_CustomData.m_phone}}</font>
               </p>
            </li>
         </ul>
      </div>
      <mkbutton v-if="hoverActive==true" :datamk="datamk" :dataName="dataName" :dataLocation1="dataLocation1"
         :dataLocation2="dataLocation2" :dataLocation3="dataLocation3" :dataLocation4="dataLocation4" :datalength="datalength"></mkbutton>
   </div>
</template>
<script>
   import Mokuai from "../../assets/js/data.js";
   import mkbutton from "./mkbutton/mkbutton";
   import { mapState } from "vuex";
   import fun from "../../assets/js/function.js";
   export default {
      components: {
         mkbutton
      },
      props: {
         dataref: "", //ref值
         dataName: "", //模块名
         data: null, //
         datamk: null, //模块序列名
         dataLocation1: "", //布局位置（hd  ft  con）
         dataLocation2: "", //单元序列（0,1,2 ····）
         dataLocation3: "", //单元布局（w19,w75 w1920）
         dataLocation4: "", //模块序列(0,1,2 ····)
         datalength: "" //模块长度
      },
      data: function () {
         return {
            hoverActive: false,
            title_bg: {
               background: "#0079fe"
            },
            get_CustomData: {
               set_title: "客服中心"
            }
         };
      },
      computed: mapState({
         layout_data: state => state.layout_data //获取所在首页布局信息
      }),
      watch: {
         // 监听数据状态改变
         layout_data: {
            handler(newName, oldName) {
               var that = this;
               // 获取设置数据
               var data = that.get_datalist();
               that.get_CustomData = data;
            },
            deep: true
         }
      },
      mounted: function () {
         var that = this;
         //  获取状态仓库中的数据
         var data = that.get_datalist();
         // 当数据无意义时，说明组件从主页引入 ，此时执行获取数据的操作
         if (!that.data) {
            //  当数据有意义时赋值
            if (Object.keys(data).length > 0) {
               that.get_CustomData = data;
            }
            //  当数据无意义时，说明为首次添加模块，此时创建临时数据提供显示
            else {
               //当后台没有数据时,是指初始数据
               that.get_CustomData = {
                  working_str_time: "周一",
                  working_end_time: "周一",
                  firdetail_start: "00:00",
                  firdetail_end: "00:00",
                  secdetail_start: "00:00",
                  secdetail_end: "00:00",
                  weekend_str_time: "周五",
                  weekend_end_time: "周五",
                  tel: "",
                  m_phone: "",
                  set_title: "客服中心",
                  selected: true,
                  selected2: true,
                  selected3: true,
                  selected4: true,
                  selected5: true
               };
            }
         }
         // 当数据有意义时，说明组件从预览页引入，此时直接向组件赋值
         else {
            that.get_CustomData = that.data;
         }
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
         //数据同步到页面
         get_datalist: function () {
            var that = this;
            var dispatch = this.$store.dispatch;
            var site = {
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4
            };
            return fun.get_data(site, that.layout_data);
         }
      }
   };
</script>
<style scoped lang="less">
   #mk8 {
      width: 100%;
      max-width: 190px;
   }

   .CustomService {
      width: 190px;
      overflow: hidden;

      h2 {
         font-size: 14px;
         color: #fff;
         height: 30px;
         line-height: 30px;
         padding-left: 10px;
         font-style: normal;
      }

      ul {
         width: 99%;
         border-right: 1px solid #ddd;
         border-left: 1px solid #ddd;
         border-bottom: 1px solid #ddd;
         overflow: hidden;
         min-height: 40px;

         li {
            padding: 0 10px;
            font-size: 13px;

            span {
               padding-top: 8px;
               display: block;
               line-height: 25px;
               margin-bottom: 5px;
            }

            p {
               line-height: 22px;
            }

            p:last-child {
               margin-bottom: 10px;
            }

            font {
               color: #666;
               line-height: 22px;
            }

            em {
               font-style: normal;
            }
         }

         li:first-child {
            border-bottom: 1px solid #ddd;
         }
      }
   }
</style>