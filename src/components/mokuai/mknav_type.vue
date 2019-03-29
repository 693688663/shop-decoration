<template>
  <div id="mknav_type">
    <!-- title -->
    <div class="title pr">导航 <span class="del cursor" @click="edit_mk_data_fun(false)"></span></div>
    <!-- 提示 -->
    <div class="tips">提示：导航建议不超过7个，并且最多不超过12个。当前导航数量为{{win_name_list.length+baby_name_list.length+user_name_list.length}}</div>
    <!-- content -->
    <div class="con">
      <div class="baby_list" v-show="li_active==1">
        <div>
          <p>页面链接</p>
          <el-checkbox-group class="ofh win" v-model="win_name_list">
            <div class="ml20 ofh" v-if="state_list.win.length>0" v-for="(list,index) in state_list.win">
              {{list.selected}}
              <el-checkbox v-if="list.selected==true" :label="list.name" :key="index" disabled></el-checkbox>
              <el-checkbox v-else :label="list.name" :value="index" :key="index" @change="change_data_list('win',index)"></el-checkbox>
            </div>
          </el-checkbox-group>
          <p>宝贝分类</p>
          <el-checkbox-group class="ofh baby" v-model="baby_name_list">
            <div class="ml20 ofh" v-show="state_list.baby.length>0" v-for="(list,index) in state_list.baby">
              <el-checkbox v-if="list.selected==true" :label="list.name" :key="index" disabled></el-checkbox>
              <el-checkbox v-else :label="list.name" :value="index" :key="index" @change="change_data_list('baby',index)"></el-checkbox>
            </div>
          </el-checkbox-group>
          <p>自定义链接</p>
          <el-checkbox-group class="ofh user" v-model="user_name_list">
            <div class="ml20 ofh" v-if="state_list.user.length>0" v-for="(list,index) in state_list.user">
              <el-checkbox v-if="list.selected==true" :label="list.name" :key="index" disabled></el-checkbox>
              <el-checkbox v-else :label="list.name" :value="index" :key="index" @change="change_data_list('user',index)"></el-checkbox>
              <el-button class="user_del" size="12px" icon="el-icon-close" @click="del_user_url(index)" circle></el-button>
            </div>
          </el-checkbox-group>
          <!-- 添加自定义链接 -->
          <div class="user_edit">
            <div class="name"><span class="tltle_name fl">名称：</span>
              <!-- 输入框 -->
              <span class="fl">
                <el-input class="user_name " placeholder="请输入名称" v-model="user_name" maxlength="6" clearable></el-input>
              </span>
              <span class="url_name fl">链接：</span>
              <!-- 链接输入框架内 -->
              <span class="user_url">
                <el-input placeholder="请输入链接" v-model="user_url" clearable>
                  <template slot="prepend">Http://</template>
                </el-input>
              </span>
              <el-button class="again" @click="again_url()">添加</el-button>
            </div>
          </div>
        </div>
      </div>
      <p class="operation">
        <span class="save" @click="save_fun()">保存</span>
        <span @click="edit_mk_data_fun(false)">取消</span></p>
    </div>
  </div>
</template>
<script>
  // vuex存储
  import { mapState, mapActions, dispatch } from 'vuex'
  import fun from '../../assets/js/function.js'
  export default {
    components: {
    },
    data: function () {
      return {
        // 功能对象
        // 获取后台数据
        get_data: {
          win: [],
          baby: [],
          user: []
        },
        // 获取后台列表
        get_data_list: {
          win: [],
          baby: [],
          user: []
        },
        // 对比后的链接列表
        contrast_data: {
          win: [],
          baby: [],
          user: []
        },
        // 获取仓库数据
        state_list: {
          win: [],
          baby: [],
          user: []
        },
        // 本地数据
        bendi_data: {
          win: [],
          baby: [],
          user: []
        },
        // 选中的页面链接列表
        win_name_list: [],
        // 选中的宝贝链接列表
        baby_name_list: [],
        // 选中的用户链接列表
        user_name_list: [],
        user_name: "",
        user_url: "",
        //显示切换
        li_active: 1,
        // checkList: ['首页'],
        //临时数据对象
        data: {
          name: "",// 模块名
          recommend_ways: "1",// 推荐方式
          recommend_sort_type: '1',//自动推荐排序
          baby_classify: "1",//宝贝分类
          keyword: "",// 关键字
          money_min: "",//最小金额
          money_max: "",// 最大金额
          baby_type: "3",//宝贝数量下标
          baby_number: 3,// 宝贝数量
          show_name: "2",// 显示设置
          show_type: 1,// 展示方式
          yes_show: [],// 是否显示
        },
      }
    },
    // 获取状态仓库数据
    computed: mapState({
      edit_mk_data: state => state.edit_mk_data,//当前编辑模块的位置信息
      layout_data: state => state.layout_data,//所有模块的布局信息
    }),
    mounted: function () {
      var that = this
      // 获取仓库数据
      that.get_state_data_fun()
    },
    methods: {
      // 获取仓库数据
      get_state_data_fun() {
        var that = this
        // 获取仓库数据
        var data = fun.get_data(that.edit_mk_data, that.layout_data)

        // 如果没有仓库数据
        if (Object.keys(data.win).length == 0) {
          // 没有仓库数据
          console.log("没有仓库数据")
          // 获取后台数据
          that.get_data_fun()
        }
        // 有仓库数据时获取数据列表
        else {
          console.log("有仓库数据")
          that.get_data = data
          // 获取数据列表
          that.get_data_list_fun()
        }
      },
      // 获取后台数据
      get_data_fun() {
        var that = this
        var data = {
          win: [
            { "id": 0, "name": "页面0", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": true, "selected": true },
            { "id": 1, "name": "页面1", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": true, "selected": true },
            { "id": 2, "name": "页面2", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": false, "selected": false },
          ],
          baby: [
            { "id": 0, "name": "宝贝0", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": true, "selected": false },
            { "id": 0, "name": "宝贝1", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": true, "selected": false },
            { "id": 0, "name": "宝贝2", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": false, "selected": false }
          ],
          user: [
            { "id": 3, "name": "用户0", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": false, "selected": false },
            { "id": 4, "name": "用户1", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": true, "selected": false },
            { "id": 5, "name": "用户2", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": false, "selected": false },
            { "id": 6, "name": "用户3", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": false, "selected": false },
            { "id": 7, "name": "用户4", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": false, "selected": false },
            { "id": 8, "name": "用户5", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": false, "selected": false },
            { "id": 9, "name": "用户6", "url": "https://www.baidu.com/?tn=62095104_7_oem_dg", "show": false, "selected": false }
          ]
        }
        that.get_data = data
        // 获取数据列表
        that.get_data_list_fun()

      },
      // 获取后台列表数据
      get_data_list_fun() {

        var that = this
        var dispatch = this.$store.dispatch
        var list = {
          win: [],
          baby: [],
          user: []
        },
          win_list = [],
          baby_list = [],
          user_list = [];
        // 获取页面链接
        for (var i = 0; i < 5; i++) {
          var data = {
            id: i,
            name: "页面" + i,
            url: "https://www.baidu.com/?tn=62095104_7_oem_dg",
            show: false,
            selected: false
          }
          win_list.push(data)
        }
        list.win = win_list
        // 获取宝贝链接
        for (var i = 0; i < 5; i++) {

          var data = {
            id: i,
            name: "宝贝" + i,
            url: "https://www.baidu.com/?tn=62095104_7_oem_dg",
            show: false,
            selected: false
          }
          baby_list.push(data)
        }
        list.baby = baby_list

        that.get_data_list = JSON.parse(JSON.stringify(list))
        // 对比数据
        that.contrast_data_fun()

      },
      // 对比数据
      contrast_data_fun() {
        var that = this
        var dispatch = this.$store.dispatch
        // 保存现在的数据
        var win_list = []
        var baby_list = []
        var user_list = []
        // 对比页面链接
        win_list = that.get_data_list.win
        for (var i = 0; i < that.get_data_list.win.length; i++) {
          for (var o = 0; o < that.get_data.win.length; o++) {
            if (that.get_data_list.win[i].name == that.get_data.win[o].name) {
              win_list[i] = that.get_data.win[o]
            }
          }
        }
        console.log("哪里错了")
        // 对比宝贝链接
        baby_list = that.get_data_list.baby
        for (var i = 0; i < that.get_data_list.baby.length; i++) {
          for (var o = 0; o < that.get_data.baby.length; o++) {
            if (that.get_data_list.baby[i].name == that.get_data.baby[o].name) {
              baby_list[i] = that.get_data.baby[o]
            }
          }
        }
        user_list = that.get_data.user
        // 保存筛选过的窗口数据
        that.contrast_data.win = win_list
        // 保存筛选过的宝贝数据
        that.contrast_data.baby = baby_list
        // 保存筛选过的用户数据
        that.contrast_data.user = user_list
        console.log(that.contrast_data)
        // 保存数据
        fun.save_data(dispatch, that.contrast_data)
        // 设置选定的数据
        for (var i = 0; i < that.contrast_data.win.length; i++) {
          if (that.contrast_data.win[i].show == true) {
            that.win_name_list.push(that.contrast_data.win[i].name)
          }
        }
        for (var i = 0; i < that.contrast_data.baby.length; i++) {
          if (that.contrast_data.baby[i].show == true) {
            that.baby_name_list.push(that.contrast_data.baby[i].name)
          }
        }
        for (var i = 0; i < that.contrast_data.user.length; i++) {
          if (that.contrast_data.user[i].show == true) {
            that.user_name_list.push(that.contrast_data.user[i].name)
          }
        }
        // 获取数据
        that.state_list = fun.get_data(that.edit_mk_data, that.layout_data)
        that.bendi_data = fun.get_data(that.edit_mk_data, that.layout_data)
      },
      // 切换显示
      change_data_list(name, num) {
        var that = this
        var dispatch = that.$store.dispatch
        var data = {
          name: name,
          num: num
        }
        if (that.win_name_list.length + that.baby_name_list.length + that.user_name_list.length <= 12) {
          // 保存到本地
          that.bendi_data[name][num].show = !that.bendi_data[name][num].show
        }
        // 设置选定的数据
        that.win_name_list = []
        that.baby_name_list = []
        that.user_name_list = []
        for (var i = 0; i < that.bendi_data.win.length; i++) {
          if (that.bendi_data.win[i].show == true) {
            that.win_name_list.push(that.bendi_data.win[i].name)
          }
        }
        for (var i = 0; i < that.bendi_data.baby.length; i++) {
          if (that.bendi_data.baby[i].show == true) {
            that.baby_name_list.push(that.bendi_data.baby[i].name)
          }
        }
        for (var i = 0; i < that.bendi_data.user.length; i++) {
          if (that.bendi_data.user[i].show == true) {
            that.user_name_list.push(that.bendi_data.user[i].name)
          }
        }
      },
      // 添加用户链接数据
      again_url() {
        var that = this
        var dispatch = that.$store.dispatch
        // 验证链接名
        if (!that.user_name) {
          this.$message({
            showClose: true,
            message: '链接名不能为空',
            type: 'warning'
          });
          return
        }
        // 验证链接
        if (!that.user_url) {
          this.$message({
            showClose: true,
            message: '链接不能为空',
            type: 'warning'
          });
          return
        }
        // 添加用户链接
        dispatch({
          type: "add_user_url_ac",
          data: {
            name: that.user_name,
            url: that.user_url,
            show: false,
            selected: false
          }
        })
        // 获取设置
        that.state_list = fun.get_data(that.edit_mk_data, that.layout_data)
      },
      // 删除用户链接
      del_user_url(num) {
        var that = this
        var dispatch = that.$store.dispatch
        // 删除用户链接
        dispatch({
          type: "del_user_url_ac",
          data: num
        })
        // 获取设置
        that.state_list = fun.get_data(that.edit_mk_data, that.layout_data)
      },
      // 保存数据
      save_fun() {
        var that = this
        var dispatch = that.$store.dispatch
        // 保存数据
        fun.save_data(dispatch, that.bendi_data)
        // 关闭弹窗
        that.edit_mk_data_fun(false)
      },
      // 隐藏模块编辑弹窗
      edit_mk_data_fun(val) {
        var that = this
        var dispatch = this.$store.dispatch
        // 隐藏模块
        dispatch({
          type: "mokuai_mask_ac",
          data: val
        })
      },

    }
  }
</script>
<style lang="less">
  #mknav_type {
    margin: 100px auto 0;
    width: 800px;
    background: #fff;

    .title {
      background-color: #2D2D2D;
      color: #fff;
      font-size: 12px;
      height: 28px;
      line-height: 28px;
      padding-left: 12px;
      z-index: 10000388;

      .del {
        width: 28px;
        height: 28px;
        background: url(../../../static/img/del_mk_f.png) no-repeat center
      }
    }

    ul {
      margin-top: 20px;
      height: 24px;
      padding: 0 10px;
      border-bottom: 1px solid #E0E0E0;

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

    .tips {
      background: #eee;
      padding: 10px 15px;
      /* margin-bottom: 10px; */
      font-size: 12px;
    }

    .con {
      overflow: scroll;
      height: 520px;
      padding: 30px 0 0;
      line-height: 36px;

      p {
        padding-left: 20px;
        font-size: 14px;
      }

      .baby_list {
        .ml20 {
          margin-left: 20px;
          float: left;
          height: 36px;
          line-height: 36px;
        }

        .user {
          .el-checkbox {
            margin-right: 10px;
          }
        }

        .user_edit {
          .name {
            line-height: 36px;
            padding-left: 20px;

            .tltle_name {
              font-size: 14px;
            }

            .user_name {
              width: 150px;

              .el-input__inner {
                height: 34px;
              }
            }

            .url_name {
              margin-left: 10px;
            }

            .user_url {
              float: left;
              width: 400px;

              .el-input {
                height: 30px !important;

                .el-input__inner {
                  height: 34px;
                }
              }
            }

            .again {
              display: inline-block;
              font-size: 14px;
              margin: 0 10px;
              padding: 0 10px;
              border: 1px solid #dddddd;
              border-radius: 5px;
              height: 34px;
              line-height: 34px;
            }
          }
        }

        .user_btn {
          margin-right: 10px;
        }

        .user_del {
          margin: 0;
          padding: 0;
        }
      }

      .operation {
        margin: 30px 0 20px;
        text-align: center;

        span {
          display: inline-block;
          height: 26px;
          line-height: 26px;
          font-size: 14px;
          width: 50px;
          margin: 0 10px;
          border-radius: 3px;
          cursor: pointer;
        }

        span.save {
          background: #2d2d2d;
          color: #fff;
        }
      }
    }
  }
</style>