<template>
   <div :ref="dataref" id="mk7" class="pr" @mouseover="hoverActive=true" @mouseout="hoverActive=false">
      <div class="link">
         <p class="title" :style="title_bg">友情链接</p>
         <ul id="links">
            <li v-if="get_links_data.length>0" v-for="item in get_links_data">
               <a :href="item.urlsite">{{item.name}}</a>
            </li>
         </ul>

      </div>
      <mkbutton
       v-if="hoverActive==true"
       :datamk="datamk"
       :dataName="dataName"
       :dataLocation1="dataLocation1"
       :dataLocation2="dataLocation2"
       :dataLocation3="dataLocation3"
       :dataLocation4="dataLocation4"
       :datalength="datalength"
     ></mkbutton>
   </div>
</template>
<script>
   import Mokuai from "../../assets/js/data.js";
   import mkbutton from "./mkbutton/mkbutton";  
   import {mapState} from 'vuex'
   export default {
      components: {
         mkbutton
      },
      props: {
         dataref: "", //ref值
         dataName: "", //模块名
         data: null,//
         datamk: null,//模块序列名
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
            get_links_data:[{}]
         };
      },
       computed: mapState({
         layout_data:state => state.layout_data, //获取所有模块的布局信息
       }),

      mounted: function () {
         var that = this;
         that.re_selection();
      },
   
      methods: {
        //回选
         re_selection:function(){
            var that = this;
            //判断位置信息,把从仓库拿到的值赋给一个空数组
            if (that.dataLocation1 == "hd") {
               that.get_links_data = that.layout_data.hd[that.dataLocation4].data 
            }
            if (that.dataLocation1 == "ft") {
                 that.get_links_data = that.layout_data.ft[that.dataLocation4].data
            }
            if (that.dataLocation1 == "con") {
                if (that.dataLocation3 == "w19") {
                 that.get_links_data = that.layout_data.con[that.dataLocation2].w19[that.dataLocation4].data
                }
                if (that.dataLocation3 == "w75") {
                 that.get_links_data = that.layout_data.con[that.dataLocation2].w75[that.dataLocation4].data
                }
                if (that.dataLocation3 == "center") {
                 that.get_links_data = that.layout_data.con[that.dataLocation2].w1920[that.dataLocation4].data
                }
            }

         }
      }
   };
</script>
<style>
   #mk7 {
      width: 950px;
      margin: 0 auto;
   }

   .link {
      width: 950px;
      margin: 0 auto;
      overflow: hidden;
   }

   .link p.title {
      font-size: 14px;
      color: #fff;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
   }
   .link ul#links{
        width: 99.8%;
        height: 50px;
        border-right:1px solid #ddd;
        border-left:1px solid #ddd;
        border-bottom:1px solid #ddd;       
    }
   .link ul#links li {
      width: 25%;
      float: left;
      line-height: 30px;
      height: 30px;
      background: #fff;
      font-size: 20px;
      color: #666;
      height: 50px;
   }

   .link ul#links li a {
      font-size: 14px;
      color: #333;
      line-height: 50px;
      height: 50px;
      padding-left: 20px;
      display: block;
   }

  
</style>