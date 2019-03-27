<template>
  <div class="dialog">
    <div class="dialog-cont">
      <h2 :style="title_bg">
        <p>本店搜索</p> 
        <i @click="edit_mk_data_fun(false)">x</i>
      </h2>

      <!--tab-nav切换-->
      <div class="dialog-tab">
          <a href="">显示设置</a>
      </div>
     <!--显示设置-->
      <div class="dialog-tab-cont">

      </div>

      <div class="dialog-btn">
        <button type="button" class="save" @click="savedata();edit_mk_data_fun(false)">保存</button>
        <button type="button" class="cancel" @click="edit_mk_data_fun(false)">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import fun from "../../assets/js/function.js"
export default {
  data: function() {
    return {
      title_bg:{
        background:"#0079fe"
      },
      searchdata:{
        show:2,
        set_title:"本店搜索",
        keyword:null,
        re_keyword1:null,
        re_keyword2:null,
        re_keyword3:null,
        selected:false
      }
    };
  },
  computed:mapState({
    edit_mk_data:state => state.edit_mk_data, //拿到状态仓库位置数据信息
    layout_data:state => state.layout_data //拿到状态仓库里模块布局的数据信息
  }),
  mounted: function() {
    var that = this;
    that.get_data();
  },
  methods: {
    //保存
    savedata:function(){
      var that = this;
      console.log(that.searchdata);
      var dispatch = this.$store.dispatch;
      fun.save_data(dispatch, that.searchdata)
    },
    //获取仓库存储的数据,内容同步到弹窗上
    get_data:function(){
      var that = this;
      var data = fun.get_data(that.edit_mk_data,that.layout_data);
      console.log(data);
      //若仓库有值
      if(Object.keys(data).length>0){
        that.searchdata = data
      }
    },

    // 隐藏编辑模块
    edit_mk_data_fun(val) {
      var that = this;
      var dispatch = this.$store.dispatch;
      dispatch({
        type: "mokuai_mask_ac",
        data: val
      });
    }

  }
};
</script>
<style scoped lang="less">
.dialog {
  background: #000;
  position: relative;
  .dialog-cont {
    width: 550px;
    height: 380px;
    background: #fff;
    position: fixed;
    z-index: 999;
    left: 30%;
    top: 20%;
    h2 {
      width: 100%;
      overflow: hidden;
      height: 30px;
      font-size: 14px;
      font-weight: normal;
      color: #fff;
      p {
        float: left;
        line-height: 30px;
        padding-left: 10px;
      }
      i {
        float: right;
        padding-right: 10px;
        font-style: normal;
        font-size: 24px;
        color: #333;
        margin-top: -4px;
      }
    }
    .dialog-tab{
      width: 100%;
      height: 30px;
      border-bottom: 1px solid #ccc;
      margin-top: 10px;
      a {
        font-size: 14px;
        float: left;
        line-height: 30px;
        width: 80px;
        text-align: center;
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        color: #666;
        margin-right: 5px;
        margin-top: -1px;
        margin-left: 20px;
        border-bottom: none;
        background: #fff;
        border-bottom: none;
        padding-top: 1px;
      }
      
    }
    .dialog-tab-cont {
      width: 100%;
      overflow: hidden;
      margin: 15px auto 10px;


    }
    .dialog-btn {
      overflow: hidden;
      margin: 10px 0 0;
      padding-left: 125px;
      button {
        float: left;
        padding: 0px 20px;
        font-size: 14px;
        line-height: 25px;
        border: 1px solid #ddd;
        background: #fff;
        margin-top: 20px;
        cursor: pointer;
        margin-right: 10px;
      }
      button.save {
        background: #333;
        color: #fff;
      }
    }
  }
}

</style>
