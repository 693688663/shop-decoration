<template>
    <div :ref="dataref" id="mk22" class="pr" @mouseover="hoverActive_fun(true)" @mouseout="hoverActive_fun(false)">
        <div class="shopsigns">
            <img src="">
            <p>店铺招牌</p>
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

      }
    },
    computed:mapState({

    }),

    //监听数据状态改变
    watch:{

    },

    //数据初始化渲染
    mounted:function(){

    },
    methods:{

    }
   



  }
</script>
<style>
#mk22{
    width: 950px;
    margin: 0 auto
}
.shopsigns{
  width: 950px;
  height: 400px;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
  }
}

</style>