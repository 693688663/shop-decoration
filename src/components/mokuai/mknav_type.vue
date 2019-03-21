<template>
   <div id="mknav_type">
      <!-- title -->
      <div class="title pr">导航 <span class="del cursor" @click="edit_mk_data_fun(false)"></span></div>
      <!-- 设置按钮切换 -->
      <ul class="">
         <li class="fl" :class="{active:li_active==1}" @click="li_active=1">宝贝设置</li>
         <!-- <li class="fl" :class="{active:li_active==2}" @click="li_active=2">电脑端显示设置</li> -->
      </ul>
      <!-- 导航设置 -->
      <div class="con">
         <div class="navset">
            
         </div>
      </div>
   </div>
</template>
<script>
   // vuex存储
   import { mapState, mapActions, dispatch } from 'vuex'
   import fun from '../../assets/js/function.js'
   export default {
      components: {
      },
      data: function () {
         return {
            // 功能对象
            li_active: 1,//显示切换
            //临时数据对象
            data: {
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
            },
         }
      },
      // 宝贝分类  页面  自定义链接
      // 获取状态仓库数据
      computed: mapState({
      }),
      mounted: function () {
         // 
      },
      methods: {
         // 隐藏模块编辑弹窗
         edit_mk_data_fun(val) {
            var that = this
            var dispatch = this.$store.dispatch
            // 隐藏模块
            dispatch({
               type: "mokuai_mask_ac",
               data: val
            })
         },
         // 请求宝贝分类列表
         get_baby_list() {
            return [
               {
                  name: "帽子",
                  url: "https://www.baidu.com"
               },

            ]
         },
         // 请求页面列表
         get_win_list() {
            return [
               {
                  name: "百度",
                  url: "https://www.baidu.com"
               },

            ]
         },
         // 自定义添加链接
      }
   }
</script>
<style lang="less">
   #mknav_type {
      margin: 100px auto 0;
      width: 800px;
      background: #fff;

      .title {
         background-color: #2D2D2D;
         color: #fff;
         font-size: 12px;
         height: 28px;
         line-height: 28px;
         padding-left: 12px;
         z-index: 10000388;

         .del {
            width: 28px;
            height: 28px;
            background: url(../../../static/img/del_mk_f.png) no-repeat center
         }
      }
   }
</style>