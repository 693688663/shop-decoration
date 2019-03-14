<template>
   <div :ref="dataref" id="mknav" class="pr" @mouseover="hoverActive_fun(true)" @mouseout="hoverActive_fun(false)">
      <div class="win">
         <div class="mknav">
            <div class="ul">
               <div class="li">首页</div>
               <div class="li">首页</div>
               <div class="li">首页</div>
               <div class="li">首页</div>
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
      data: function () {
         return {
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
               // that.list_data = that.get_type()
               // 获取后台数据
               // that.get_message()
            },
            deep: true,
         },
      },
      // 加载及执行
      mounted: function () {
         var that = this
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
      },
   }


</script>
<style lang="less">
   #mknav {
      margin: 0 auto;
      width: 950px;

      .mknav {
         margin-bottom: 10px;

         .ul {
            height: 30px;
            background: #0079fe;

            .li {
               float: left;
               line-height: 30px;
               font-size: 12px;
               width: 64px;
               text-align: center;
               color: #fff;
               margin: 0 3px;
               cursor: pointer;
            }
         }
      }

   }
</style>