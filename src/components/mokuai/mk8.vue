<template>
  <div :ref="dataref" id="mk8" class="pr" @mouseover="hoverActive_fun(true)" @mouseout="hoverActive_fun(false)">
    <div class="CustomService">
      <h2 :style="title_bg">
        <span v-if="get_CustomData.selected5">{{get_CustomData.set_title}}</span>
      </h2>
      <ul>
        <li>
          <span>工作时间</span>
          <p v-show="get_CustomData.selected">
            <em>{{get_CustomData.working_str_time}}</em>至
            <em>{{get_CustomData.working_end_time}}</em>：
            <font>
              <em>{{get_CustomData.firdetail_start}}</em>-
              <em>{{get_CustomData.firdetail_end}}</em>
            </font>
          </p>
          <p v-if="get_CustomData.selected2">
            <em>{{get_CustomData.weekend_str_time}}</em>至
            <em>{{get_CustomData.weekend_end_time}}</em>：
            <font>
              <em>{{get_CustomData.secdetail_start}}</em>-
              <em>{{get_CustomData.secdetail_end}}</em>
            </font>
          </p>
        </li>
        <li>
          <span>联系方式</span>
          <p v-if="get_CustomData.selected3">
            联系电话：
            <font>{{get_CustomData.tel}}</font>
          </p>
          <p v-if="get_CustomData.selected4">
            联系手机：
            <font>{{get_CustomData.m_phone}}</font>
          </p>
        </li>
      </ul>
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
    data: function () {
      return {
        hoverActive: false,
        title_bg: {
          background: "#0079fe"
        },
        get_CustomData: {
          set_title: "客服中心"
        }
      };
    },
    computed: mapState({
      layout_data: state => state.layout_data //获取所在首页布局信息
    }),
    watch: {
      // 监听数据状态改变
      layout_data: {
        handler(newName, oldName) {
          var that = this;
          // 获取设置数据
          var customdata = that.get_datalist();
          //console.log(customdata);
          that.get_CustomData = customdata;
          that.set_time();
        },
        deep: true
      }
    },
    mounted: function () {
      var that = this;
      that.set_time();
    },
    methods: {
      //数据同步到页面
      get_datalist: function () {
        var that = this;
        var dispatch = this.$store.dispatch;
        var site = {
          location1: that.dataLocation1,
          location2: that.dataLocation2,
          location3: that.dataLocation3,
          location4: that.dataLocation4
        };
        return fun.get_data(site, that.layout_data);
      },
      //预览时判断编辑按钮的显示状态
      hoverActive_fun(value) {
        var that = this;
        if (that.data) {
          that.hoverActive = false;
        } else {
          that.hoverActive = value;
        }
      },
      //数据同步到页面上,并设定初始化状态
      set_time: function () {
        var that = this;
        //console.log(that.data);
        //从仓库拿到的值
        var customdata = that.get_datalist();
        //console.log(customdata);

        //当customdata未被定义undefined时,程序结束return;被定义时,判断后台是否存在数据;如果存在把值赋给一个空数组,如果不存在初始化数据
        //判断data有无意义,数据从哪个页面拿到得值
        if (!that.data) {  //当data无意义时,当前页为主页

          //当后台存在数据时,主页显示后台数据
          if (Object.keys(customdata).length > 0) {

            that.get_CustomData = customdata;
          } else {
            //当后台没有数据时,客服中心模块显示初始数据
            that.set_data();
          }
        } else {
          //有意义时的时候,当前页为浏览页..data是浏览页从状态仓库拿到的值,赋值给get_CustomData,数据同步在预览页上
          that.get_CustomData = that.data;
        }
      },
      //无数据时设定初始化数据
      set_data: function () {
        var that = this;
        var dispatch = this.$store.dispatch;
        //位置信息
        var site = {
          location1: that.dataLocation1,
          location2: that.dataLocation2,
          location3: that.dataLocation3,
          location4: that.dataLocation4
        }
        //发送初始化信息
        var get_CustomData = {
          working_str_time: "周一",
          working_end_time: "周一",
          firdetail_start: "00:00",
          firdetail_end: "00:00",
          secdetail_start: "00:00",
          secdetail_end: "00:00",
          weekend_str_time: "周五",
          weekend_end_time: "周五",
          tel: "",
          m_phone: "",
          set_title: "客服中心",
          selected: true,
          selected2: true,
          selected3: true,
          selected4: true,
          selected5: true
        };
        //初始设置信息保存到仓库
        fun.first_save_data(dispatch, site, get_CustomData);
      }
    }

  };
</script>
<style scoped lang="less">
  #mk8 {
    width: 100%;
    max-width: 190px;
    padding-bottom: 10px;
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
      font-style: normal;
    }

    ul {
      width: 99%;
      border-right: 1px solid #ddd;
      border-left: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      min-height: 40px;

      li {
        padding: 0 10px;
        font-size: 13px;

        span {
          padding-top: 8px;
          display: block;
          line-height: 25px;
          margin-bottom: 5px;
        }

        p {
          line-height: 22px;
        }

        p:last-child {
          margin-bottom: 10px;
        }

        font {
          color: #666;
          line-height: 22px;
        }

        em {
          font-style: normal;
        }
      }

      li:first-child {
        border-bottom: 1px solid #ddd;
      }
    }
  }
</style>