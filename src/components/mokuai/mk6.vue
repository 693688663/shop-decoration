<template>
  <div :ref="dataref" id="mk6" class="pr" @mouseover="hoverActive_fun(true)" @mouseout="hoverActive_fun(false)">
    <div class="banner">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <mkbutton v-if="hoverActive==true" :datamk="datamk" :dataName="dataName" :dataLocation1="dataLocation1"
      :dataLocation2="dataLocation2" :dataLocation3="dataLocation3" :dataLocation4="dataLocation4" :datalength="datalength"></mkbutton>
  </div>
</template>
<script>
  import Mokuai from "../../assets/js/data.js";
  import mkbutton from "./mkbutton/mkbutton";
  import { mapState } from "vuex";
  import fun from "../../assets/js/function.js";
  export default {
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
    data() {
      return {
        hoverActive: false,
        getSignData: {}
      }
    },
    computed: mapState({
      layout_data: state => state.layout_data //拿到状态仓库布局信息
    }),
    methods: {
      //判断编辑按钮在主页还是预览页显示的状态
      hoverActive_fun(value) {
        var that = this;
        if (that.data) {
          that.hoverActive = false;
        } else {
          that.hoverActive = value;
        }
      },
    },
  }
</script>
<style lang="less" scoped>
  #mk6 {
    max-width: 950px;
    margin: 0 auto;

    .el-carousel__item h3 {
      color: #475669;
      font-size: 18px;
      opacity: 0.75;
      line-height: 300px;
      text-align: center;
      width: 100%;
      margin: 0;
    }

    .el-carousel {
      z-index: 0;
      .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
      }

      .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
      }
    }
  }
</style>