<template>
      <div :ref="dataref" id="mk3"  class="pr"  @mouseover="hoverActive=true" @mouseout="hoverActive=false" >
          <div class="qwe">
              MK3
          </div>
          <mkbutton v-if="hoverActive==true" :dataName="dataName" :dataLocation1="dataLocation1" :dataLocation2="dataLocation2"
         :dataLocation3="dataLocation3" :dataLocation4="dataLocation4" :datalength="datalength"> </mkbutton>
      </div>
  </template>
  <script>
      import Mokuai from '../../assets/js/data.js';
   import mkbutton from './mkbutton/mkbutton'
   export default {
      components: {
         mkbutton
      },
      props: {
         dataref: "",//ref值
         dataName: "",//模块名
         dataLocation1: "",//布局位置（hd  ft  con）
         dataLocation2: "",//单元序列（0,1,2 ····）
         dataLocation3: "",//单元布局（w19,w75 w1920）
         dataLocation4: "",//模块序列(0,1,2 ····)
         datalength: "",//模块长度
      },
      data: function () {
         return {
            hoverActive: false,
         }
      },
      mounted: function () {
         var that = this
        
      },
      methods: {
      }
   }
  </script>
  <style>
  #mk2{
      width: 100%;
      margin: 0 auto
  }
  </style>