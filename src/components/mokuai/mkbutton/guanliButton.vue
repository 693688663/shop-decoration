<!-- 模块拖动到布局管理页功能组件 -->
<template>
   <div>
      <div class="moduleDom" v-if="dataName=='mk'">
         {{datamkname}}
      </div>
      <div v-else class="module" :ref="dataref">
         <p>
            <span>{{datamkname}}</span>
            <span class="fr modulebd" v-if="datamkname!='导航'" @click="del_mk(dataName,dataLocation1,dataLocation2,dataLocation3,dataLocation4,datalength)"></span>
            <span class="fr module_move" @mousedown="bjmkmousedown($event)"></span>
         </p>
      </div>
   </div>
</template>
<script>
   import { mapState, mapActions } from 'vuex'
   export default {

      props: {
         dataref: '',//ref名
         datamkname: "",//模块名
         dataName: "",//模块序列名
         dataLocation1: "",//布局位置（hd  ft  con）
         dataLocation2: "",//单元序列（0,1,2 ····）
         dataLocation3: "",//单元布局（w19,w75 w1920）
         dataLocation4: "",//模块序列(0,1,2 ····)
         datalength: "",
      },
      computed: mapState({
         layout_data: state => state.layout_data,//模块数据
         html_xy: state => state.html_xy,//页面编辑页坐标
         layout_xy: state => state.layout_xy,//布局管理页模块坐标
      }),
      methods: {
         // 删除模块
         del_mk() {
            var that = this
            var dispatch = this.$store.dispatch
            var data = {
               name: arguments[0],
               location1: arguments[1],
               location2: arguments[2],
               location3: arguments[3],
               location4: arguments[4],
               datalength: arguments[5],

            }
            dispatch({
               type: "del_mk_ac",
               data: data,
            })
         },
         // 模块移动鼠标按下
         bjmkmousedown(event) {
            var that = this
            var dispatch = this.$store.dispatch
            // 获取当前鼠标位置x
            var startx = event.clientX;
            // 获取当前鼠标位置y
            var starty = event.clientY;
            var data = {
               mkname: that.datamkname,
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4,
            }
            // 获取模块信息
            dispatch({
               type: 'setmove_mk_ac',
               data: data
            })
            var data1 = {
               x: event.clientX,
               y: event.clientY,
               display: true,
            }
            // 保存初始点击坐标位置信息
            // 第一次获取坐标
            dispatch({
               type: 'eventmove_mk_ac',
               data: data1
            })
            console.log(that.layout_data)
            // 获取布局管理中模块坐标信息
            document.onmousemove = function (ev) {
               var event = ev || window.event;
               var data2 = {
                  x: event.clientX,
                  y: event.clientY,
                  display: true,
               }
               // 保存初始点击位置信息
               // 移动对比位置
               dispatch({
                  type: 'eventmove_mk_move_ac',
                  data: data2
               })
            }
         },
      }
   }
</script>
<style>

</style>