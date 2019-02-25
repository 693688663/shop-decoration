<template>
   <div :ref="dataref" id="mk7" class="pr" @mouseover="hoverActive=true" @mouseout="hoverActive=false">
      <div class="link">
         <p class="title" :style="title_bg">友情链接</p>
         <ul id="links">
            <li v-if="links.length>0" v-for="item in links">
               <a :href="item.urlsite">{{item.name}}</a>
            </li>
         </ul>
         <!-- <div class="edit" @click="isShow=true">编辑</div> -->


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
   export default {
      components: {
         mkbutton
      },
      props: {
         dataref: "", //ref值
         dataName: "", //模块名
         data: null,
         datamk: null,
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
            links: [{}],
         };
      },
      mounted: function () {
         var that = this;
      },
      watch: {
         linklist: []

      },
      methods: {
          
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
      line-height: 30px;
      height: 30px;
      padding-left: 20px;
      display: block;
   }

  
</style>