<!-- 页面编辑页的功能按钮 -->
<template>
   <div class="all pa">
      <div class="mkname">{{dataName}}</div>
      <div class="top" :class="{cursortop:dataLocation4!=0}" @click="top()"></div>
      <div class="bottom  " :class="{cursorbtm:dataLocation4!=datalength}" @click="bottom()"></div>
      <div class="edit cursor" @click="edit_mk"></div>
      <div class="del " :class="{cursordel:dataName!='导航'}" @click="del_mk"></div>
   </div>
</template>
<script>
   export default {

      props: {
         dataName: "",//模块名
         datamk: "",
         dataLocation1: "",//布局位置（hd  ft  con）
         dataLocation2: "",//单元序列（0,1,2 ····）
         dataLocation3: "",//单元布局（w19,w75 w1920）
         dataLocation4: "",//模块序列(0,1,2 ····)
         datalength: "",
      },
      mounted: function () {
         var that = this
         // console.log(that.dataName)

      },
      methods: {
         // 删除模块操作
         del_mk() {
            var that = this
            var dispatch = this.$store.dispatch
            var data = {
               name: that.dataName,
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4,
               datalength: that.datalength,

            }
            if (that.dataName != "导航") {
               dispatch({
                  type: "del_mk_ac",
                  data: data,
               })
            }
         },
         // 模块上移
         top() {
            var that = this
            var dispatch = this.$store.dispatch
            if (that.dataLocation4 == 0) { return }
            var data = {
               name: that.dataName,
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4,
               nowsite: that.dataLocation4 - 1,
            }
            dispatch({
               type: "move_edit_mk_ac",
               data: data,
            })
         },
         // 模块下移
         bottom() {
            var that = this
            var dispatch = this.$store.dispatch
            if (that.dataLocation4 == that.datalength) { return }
            var data = {
               name: that.dataName,
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4,
               nowsite: that.dataLocation4 + 1,
            }
            dispatch({
               type: "move_edit_mk_ac",
               data: data,
            })
         },
         // 编辑模块按钮
         edit_mk() {
            var that = this
            var dispatch = this.$store.dispatch
            var data = {
               type: true,
               name: that.dataName,
               datamk: that.datamk,
               location1: that.dataLocation1,
               location2: that.dataLocation2,
               location3: that.dataLocation3,
               location4: that.dataLocation4,
               datalength: that.datalength,

            }
            dispatch({
               type: "edit_mk_ac",
               data: data,
            })
         },
      }
   }
</script>
<style>
   .not_cursor {
      /* cursor: not-allowed !important; */
   }

   .cursor {
      cursor: pointer !important;
   }

   .cursortop {
      cursor: pointer !important;
      background: url(/static/img/top_mk.png) center center no-repeat rgb(236, 236, 236) !important;
   }

   .cursorbtm {
      cursor: pointer !important;
      background: url(/static/img/bottom_mk.png) center center no-repeat rgb(236, 236, 236) !important;
   }

   .cursordel {
      cursor: pointer !important;
      background: url(/static/img/del_mk.png) center center no-repeat rgb(236, 236, 236) !important;
   }

   .all {
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(10, 100, 200, 0.4)
   }

   .mkname {
      height: 20px;
      line-height: 20px;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 12px;
      background: #FF9831;
      color: #fff;
   }

   .top {
      width: 20px;
      text-align: center;
      height: 20px;
      position: absolute;
      right: 90px;
      top: 0px;
      background: url(/static/img/top_mkf.png) center center no-repeat rgb(236, 236, 236);
      cursor: not-allowed;
   }

   .bottom {
      width: 20px;
      text-align: center;
      height: 20px;
      position: absolute;
      right: 60px;
      top: 0px;
      background: url(/static/img/bottom_mkf.png) center center no-repeat rgb(236, 236, 236);
      cursor: not-allowed;
   }

   .edit {
      width: 20px;
      text-align: center;
      height: 20px;
      position: absolute;
      right: 30px;
      top: 0;
      background: url(/static/img/edit_mk.png)no-repeat center #ECECEC;
   }

   .del {
      width: 20px;
      text-align: center;
      height: 20px;
      position: absolute;
      right: 0;
      top: 0;
      background: url(/static/img/del_mkf.png)no-repeat center #ECECEC;
      cursor: not-allowed;
   }
</style>