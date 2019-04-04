<template>
  <div :ref="dataref" id="mk2" class="pr" @mouseover="hoverActive_fun(true)" @mouseout="hoverActive_fun(false)">
    <div class="win">
      <div class="mk2">
        <div class="title">
          <span v-if="list_data.show_name==2">
            {{list_data.name}}
          </span>
        </div>
        <div class="con">
          <ul class="">
            <li class="fl" :class="{active:li_active==1}" @click="li_active=1">销售量</li>
            <li class="fl" :class="{active:li_active==2}" @click="li_active=2">收藏数</li>
          </ul>
          <div class="content ofh">
            <div class="li fl" v-for="(site,index) in message">
              <!-- <div class="li fl" v-for="(site,index) in 3"> -->
              <div class="img">
                <img src="../../assets/img/img.jpg" alt="123124">
              </div>
              <!-- <p class="shop_name">{{site.shop_name}}</p>
              <p class="money">¥&nbsp;<span>{{site.money}}</span></p>
              <p class="duigou"> {{site.duigou}} </p>
              <p class="shoucang"> {{site.shoucang}} </p> -->
            </div>
            <div class="more">
              <p>查看更多宝贝</p>
            </div>
          </div>
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
  // 静态资源
  import { mapState, mapActions, dispatch } from 'vuex'
  import Mokuai from '../../assets/js/data.js';
  import mkbutton from './mkbutton/mkbutton';
  import fun from '../../assets/js/function.js'
  export default {
    components: {
      mkbutton
    },
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
        li_active: 1,//显示切换
        hoverActive: false,
        // 设置数据
        list_data: {
          show_name: 1,//标题显示设置
          name: "宝贝排行榜",//标题
          baby_classify: 1,//宝贝分类
          money_min: "1",//最小金额
          money_max: "",//最大金额
          keys: "",//关键字
          baby_type: 3,//宝贝数量
          show_type: 1,//显示数量
          yes_show: true//显示设置
        },
        message: [],
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
          that.get_type_data()
          // 获取后台数据
          // that.get_message()
        },
        deep: true,
      },
    },
    mounted: function () {
      var that = this
      // 获取设置数据
      that.get_type_data()
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
      // 获取设置数据
      get_type_data() {
        var that = this
        var dispatch = that.$store.dispatch
        console.log(123)
        console.log(that.data)
        // 模块位置信息
        var site = {
          location1: that.dataLocation1,
          location2: that.dataLocation2,
          location3: that.dataLocation3,
          location4: that.dataLocation4,
        }
        //  如果传值data无意义时说明从index中引入
        if (!that.data) {
          // 获取仓库设置数据
          var data = fun.get_data(site, that.layout_data)
          // 当数据为空时
          if (Object.keys(data).length == 0) {
            // 设置基础设置
            that.set_data()
          }
          // 有设置数据时
          else {
            that.list_data = data
          }
        } else {
          // 设置数据赋值
          that.list_data = that.data
        }
        // 获取数据
        console.log(that.list_data)
        that.get_message()
      },
      // 获取后台数据
      get_message() {
        var that = this
        // 创建初始数据为空
        that.message = []
        // 循环模拟请求的数据
        for (var i = 0; i < parseInt(that.list_data.baby_type); i++) {
          let data = {
            title_name: "宝贝推荐",
            shop_name: "商品名称",
            money: "5.00",
            duigou: "10000",
            shoucang: "10000",
          }
          // 数据添加到对象
          that.message[i] = data
        }
        console.log(that.message)
      },
      // 设置初始值
      set_data() {
        var that = this
        var dispatch = this.$store.dispatch
        // 发送基础设置数据
        var set_data = {
          show_name: 1,//标题显示设置
          name: "宝贝排行榜",//标题
          baby_classify: 1,//宝贝分类
          money_min: "1",//最小金额
          money_max: "",//最大金额
          keys: "",//关键字
          baby_type: 3,//宝贝数量
          show_type: 1,//显示数量
          yes_show: true//显示设置
        }
        // 位置信息
        var site = {
          location1: that.dataLocation1,
          location2: that.dataLocation2,
          location3: that.dataLocation3,
          location4: that.dataLocation4,
        }
        // 将设置信息保存在本地状态仓库
        fun.first_save_data(dispatch, site, set_data)
      },
    }

  }
</script>
<style lang="less">
  #mk2 {
    width: 100%;
    margin: 0 auto;

    .mk2 {
      margin-bottom: 10px;

      .title {
        font-size: 14px;
        padding: 0 8px;
        height: 30px;
        line-height: 30px;
        color: #ffffff;
        background: #0079fe;

      }

      .con {
        padding: 5px 0 0;
        border: 1px solid #ddd;
        border-top: none;

        ul {
          height: 24px;
          padding: 0 10px;
          border-bottom: 1px solid #ddd;
          /* margin-top: 5px; */

          li {
            height: 23px;
            line-height: 23px;
            border: 1px solid #d4d4d4;
            background: #fff;
            background: #ededed;
            color: #666;
            padding: 0 10px;
            font-size: 14px;
            margin-right: 5px;
            border-bottom: none;
            cursor: pointer;
          }

          li.active {
            height: 24px;
            line-height: 24px;
            color: #000;
            background: #fff;
            border-bottom: none;
          }
        }

        .content {
          .more p {
            text-align: center;
            font-size: 12px;
            line-height: 26px;
          }
        }
      }

    }

  }
</style>