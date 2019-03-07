<template>
  <div :ref="dataref" id="mk8" class="pr" @mouseover="hoverActive=true" @mouseout="hoverActive=false">
    <div class="CustomService">
      <h2 :style="title_bg">客服中心</h2>
      <ul>
        <li>
          <span>工作时间</span>
          <p><em>周一</em>至<em>周五</em>：<font><em>9:00</em>-<em>21:00</em></font></p>
          <p><em>周六</em>至<em>周日</em>：<font><em>0:00</em>-<em>12:00</em></font></p>
        </li>
        <li>
          <span>联系方式</span>
          <p>联系电话：<font>261155</font></p>
          <p>联系手机：<font>15269536995</font></p>
        </li>
      </ul>
    </div>
    <mkbutton v-if="hoverActive==true" :datamk="datamk" :dataName="dataName" :dataLocation1="dataLocation1" :dataLocation2="dataLocation2" :dataLocation3="dataLocation3" 
    :dataLocation4="dataLocation4" :datalength="datalength"></mkbutton>
  </div>
</template>
<script>
import Mokuai from "../../assets/js/data.js";
import mkbutton from "./mkbutton/mkbutton";
export default {
  components: {
    mkbutton
  },
  props: {
    dataref: "", //ref值
    dataName: "", //模块名
    data: null, //
    datamk: null, //模块序列名
    dataLocation1: "", //布局位置（hd  ft  con）
    dataLocation2: "", //单元序列（0,1,2 ····）
    dataLocation3: "", //单元布局（w19,w75 w1920）
    dataLocation4: "", //模块序列(0,1,2 ····)
    datalength: "" //模块长度
  },
  data: function() {
    return {
      hoverActive: false,
      title_bg: {
        background: "#0079fe"
      },
      // CustomData:{
      //   working_str_time:null,
      //   working_end_time:null,
      //   weekend_str_time:null,
      //   weekend_end_time:null,
      //   tel:null,
      //   m_phone:null
      // }

    };
  }
};
</script>
<style lang="less">
#mk8 {
  width: 100%;
  max-width: 190px;
}
.CustomService {
  width: 190px;
  overflow: hidden;
  h2 {
    font-size: 14px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    font-style: normal
  }
  ul{
    width: 99%;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    min-height: 40px;
    li{
      padding: 0 10px;
      font-size: 14px;
      span{
        padding-top: 8px;
        display: block;
        line-height: 25px;
        margin-bottom:5px;
      }
      p{
        line-height: 22px;
      }
      p:last-child{
        margin-bottom: 10px;
      }
      font{
        color: #666;
        line-height: 22px;
      }
      em{
        font-style: normal
      }
    }
    li:first-child{
        border-bottom:1px solid #ddd
    }
  }
}
</style>
