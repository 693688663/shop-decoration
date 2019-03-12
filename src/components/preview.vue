<template>
   <div id="preview">
      <div class="hd" v-if="layout_data.hd.length>0">
         <div class="li" v-for="site in layout_data.hd">
            <component :is="site.name" :data="site.data" dataLocation3=""></component>
         </div>
      </div>
      <div class="con" v-if="layout_data.con.length>0">
         <div class="dy" v-for="(site,index) in layout_data.con">
            <div class="left ofh" v-if="site.name=='left'">
               <div class="w19 fl">
                  <div class="li" v-for="(site1,index1) in layout_data.con[index].w19">
                     <component :is="site1.name" :data="site1.data" dataLocation3="w19"></component>
                  </div>
               </div>
               <div class="w75 fr">
                  <div class="li" v-for="(site1,index1) in layout_data.con[index].w75">
                     <component :is="site1.name" :data="site1.data" dataLocation3="w75"></component>
                  </div>
               </div>
            </div>
            <div class="right ofh" v-if="site.name=='right'">
               <div class="w75 fl">
                  <div class="li" v-for="(site1,index1) in layout_data.con[index].w75">
                     <component :is="site1.name" :data="site1.data" dataLocation3="w75"></component>
                  </div>
               </div>
               <div class="w19 fr">
                  <div class="li" v-for="(site1,index1) in layout_data.con[index].w19">
                     <component :is="site1.name" :data="site1.data" dataLocation3="w19"></component>
                  </div>
               </div>
            </div>
            <div class="center ofh" v-if="site.name=='center'">
               <div class="li" v-for="(site1,index1) in layout_data.con[index].w1920
               ">
                  <component :is="site1.name" :data="site1.data" dataLocation3="center"></component>
               </div>
            </div>
         </div>
      </div>
      <div class="ft" v-if="layout_data.ft.length>0">
         <div class="li" v-for="site in layout_data.ft">
            <component :is="site.name" :data="site.data" dataLocation3=""></component>
         </div>
      </div>
   </div>
</template>

<script>
   // vuex存储
   import { mapState, mapActions } from 'vuex'
   import mknav from './mokuai/mknav'//功能模块
   import mk1 from './mokuai/mk1'//功能模块
   import mk2 from './mokuai/mk2'//功能模块
   import mk3 from './mokuai/mk3'//功能模块
   import mk4 from './mokuai/mk4'//功能模块
   import mk5 from './mokuai/mk5'//功能模块
   import mk6 from './mokuai/mk6'//功能模块
   import mk7 from './mokuai/mk7'//功能模块
   import mk8 from './mokuai/mk8'//功能模块
   import mk9 from './mokuai/mk9'//功能模块
   import mk10 from './mokuai/mk10'//功能模块
   import mk11 from './mokuai/mk11'//功能模块
   import mk12 from './mokuai/mk12'//功能模块
   import mk13 from './mokuai/mk13'//功能模块
   import mk14 from './mokuai/mk14'//功能模块
   import mk15 from './mokuai/mk15'//功能模块
   import mk16 from './mokuai/mk16'//功能模块
   import mk17 from './mokuai/mk17'//功能模块
   import mk18 from './mokuai/mk18'//功能模块


   export default {
      name: "preview",
      components: {
         mknav,
         mk1,
         mk2,
         mk3,
         mk4,
         mk5,
         mk6,
         mk7,
         mk8,
         mk9,
         mk10,
         mk11,
         mk12,
         mk13,
         mk14,
         mk15,
         mk16,
         mk17,
         mk18,
      },
      data: function () {
         return {
            layout_data: {
               hd: [],
               con: [],
               ft: []
            },
         }
      },
      computed: mapState({
      }),
      mounted: function () {
         var that = this
         that.layout_data = JSON.parse(localStorage.layoutData)
         console.log( JSON.parse(localStorage.layoutData))
      },
   }
</script>
<style lang="less">
   #preview {

      .con {
         .dy {

            .left,
            .right {
               width: 950px;
               margin: 0 auto;

               .w19 {
                  width: 190px;
               }

               .w75 {
                  width: 750px;
               }
            }
         }
      }
   }
</style>