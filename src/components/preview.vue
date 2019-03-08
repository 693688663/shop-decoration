<template>
   <div id="preview">
      123123
   </div>
</template>

<script>
   // vuex存储
   import { mapState, mapActions } from 'vuex'
   export default {
      name: "preview",
      components: {},
      data: function () {
         return {
            layout_data: null,
         }
      },
      computed: mapState({
      }),
      mounted: function () {
         var that = this
         // 获取本地的布局信息
         var layout_data = JSON.parse(this.$route.query.layout_data)
         // 赋值给本地变量
         that.layout_data = layout_data
      },
   }
</script>
<style lang="less">
   #preview {}
</style>