<template>
    <div :ref="dataref" id="mk22" class="pr" @mouseover="hoverActive_fun(true)" @mouseout="hoverActive_fun(false)">
        <div class="shopsigns">
            <img src="../../../static/img/default.png">
            <p v-if="getSignData.showName">店铺招牌</p>
        </div>
        <mkbutton v-if="hoverActive==true" :datamk="datamk" :dataName="dataName" :dataLocation1="dataLocation1" :dataLocation2="dataLocation2" 
        :dataLocation3="dataLocation3" :dataLocation4="dataLocation4" :datalength="datalength"></mkbutton> 
    </div>
</template>
<script>
import Mokuai from "../../assets/js/data.js";
import mkbutton from "./mkbutton/mkbutton";
import { mapState } from "vuex";
import fun from "../../assets/js/function.js";
  export default{
    components: {
      mkbutton
    },
    props: {
      dataref: "", //ref值
      dataName: "", //模块名
      data: null, //判断编辑按钮显示在预览页还是主页,从预览页拿到的数据分发到组件上
      datamk: null, //模块序列名
      dataLocation1: "", //布局位置（hd  ft  con）
      dataLocation2: "", //单元序列（0,1,2 ····）
      dataLocation3: "", //单元布局（w19,w75 w1920）
      dataLocation4: "", //模块序列(0,1,2 ····)
      datalength: "" //模块长度
    },
    data:function(){
      return{
        hoverActive:false,
        getSignData:{}

      }
    },
    computed:mapState({
      layout_data: state => state.layout_data //拿到状态仓库布局信息
    }),


    methods:{
      //从仓库返回过来的值
      get_shipsigndat(){
        var that = this;
        var dispatch = this.$store.dispatch;

        //位置信息
        var site = {
          location1: that.dataLocation1,
          location2: that.dataLocation2,
          location3: that.dataLocation3,
          location4: that.dataLocation4
        };        
        return fun.get_data(site, that.layout_data);
      },
      
      //判断编辑按钮在主页还是预览页显示的状态
      hoverActive_fun(value){
        var that = this;
        if(that.data){
          that.hoverActive = false;
        }else{
          that.hoverActive = value;
        }
      },
      
    }
  }
</script>
<style lang="less" scoped>

#mk22{
    width: 950px;
    margin: 0 auto
}
.shopsigns{
  width: 950px;
  max-height: 120px;
  height: 120px;
  overflow: hidden;
  background: #eee;
  img{
    width: 100%;
    height: 100%;
    position: relative;
    max-height: 120px
  }
  p{
    color: #fff;
    font-size: 20px;
    line-height: 30px;
    position: absolute;
    z-index: 999;
    top: 35%;
    font-weight: 600;
    left: 20px;
  }

}

</style>
