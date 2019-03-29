<template>
  <div :ref="dataref" id="mknav" class="pr" @mouseover="hoverActive_fun(true)" @mouseout="hoverActive_fun(false)">
    <div class="win">
      <div class="mknav">
        <div class="ul">
          <div class="li" v-for="(site,index) in url_list"><a :href="site.url">{{site.name}}</a></div>
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
  import { mapState, mapActions } from 'vuex'
  import Mokuai from '../../assets/js/data.js';
  import fun from '../../assets/js/function.js'
  import mkbutton from './mkbutton/mkbutton'//引入操作按钮
  export default {
    components: {
      mkbutton//引入操作按钮
    },
    // 接收父组件传值
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
        hoverActive: false,//按钮是否显示  
        get_url_list: {},
        url_list: [],
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
          //  获取连接数据
          that.get_url_list_fun()
        },
        deep: true,
      },
    },
    // 加载及执行
    mounted: function () {
      var that = this
      //  获取连接数据
      that.get_url_list_fun()
    },
    methods: {
      // 获取连接数据
      get_url_list_fun() {
        var that = this
        var site = {
          location1: that.dataLocation1,
          location2: that.dataLocation2,
          location3: that.dataLocation3,
          location4: that.dataLocation4,
        }
        var data = fun.get_data(site, that.layout_data)
        if (!that.data) {
          if (Object.keys(data).length == 0) {
            // 新建原始设置数据
            that.set_data_fun()
          }
          // 有设置数据时
          else {
            // 设置数据赋值
            that.get_url_list = data
          }
        }
        // 如果有测说明数据来源于预览页
        else {
          // 设置数据赋值
          that.get_url_list = that.data
        }
        that.url_list = []
        // 循环获取连接列表
        if (that.get_url_list.win) {
          for (var i = 0; i < that.get_url_list.win.length; i++) {
            if (that.get_url_list.win[i].show) {
              that.url_list.push(that.get_url_list.win[i])
            }
          }
        }
        if (that.get_url_list.baby) {
          for (var i = 0; i < that.get_url_list.baby.length; i++) {
            if (that.get_url_list.baby[i].show) {
              that.url_list.push(that.get_url_list.baby[i])
            }
          }
        }
        if (that.get_url_list.user) {
          for (var i = 0; i < that.get_url_list.user.length; i++) {
            if (that.get_url_list.user[i].show) {
              that.url_list.push(that.get_url_list.user[i])
            }
          }
        }
      },
      set_data_fun() {
        var that = this
        var dispatch = this.$store.dispatch
        var site = {
          location1: that.dataLocation1,
          location2: that.dataLocation2,
          location3: that.dataLocation3,
          location4: that.dataLocation4,
        }
        var set_data = {
          win: [],
          baby: [],
          user: []

        }
        // 将设置信息保存在本地状态仓库
        fun.first_save_data(dispatch, site, set_data)
      },
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
    },
  }


</script>
<style lang="less">
  #mknav {
    margin: 0 auto;
    width: 950px;

    .mknav {
      margin-bottom: 10px;

      .ul {
        height: 30px;
        background: #0079fe;

        .li {
          float: left;
          line-height: 30px;
          font-size: 12px;
          width: 64px;
          text-align: center;
          color: #fff;
          margin: 0 3px;
          cursor: pointer;
        }
      }
    }

  }
</style>