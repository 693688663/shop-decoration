<template>
  <div id="mknav_type">
    <!-- title -->
    <div class="title pr">导航 <span class="del cursor" @click="edit_mk_data_fun(false)"></span></div>
    <!-- 提示 -->
    <div class="tips">提示：导航建议不超过7个，并且最多不超过12个。当前导航数量为{{win_name_list.length+baby_name_list.length}}</div>
    <!-- content -->
    <div class="con">
      <div class="baby_list" v-show="li_active==1">
        <div>
          <p>页面链接</p>
          <el-checkbox-group class="ofh" v-model="win_name_list" @change="change_win_list()">
            <div class="ml20 ofh" v-if="win_list.length>0" v-for="(list,index) in win_list">
              <el-checkbox v-if="list.name==win_list[0].name" :label="list.name" :key="index" disabled></el-checkbox>
              <el-checkbox v-else-if="list.name!=win_list[0].name" :label="list.name" :key="index"></el-checkbox>
            </div>
          </el-checkbox-group>
          <p>宝贝分类</p>
          <el-checkbox-group class="ofh" v-model="baby_name_list" @change="change_baby_list()">
            <div class="ml20 ofh" v-show="baby_list.length>0" v-for="(list,index) in baby_list">
              <el-checkbox :label="list.name" :key="index"></el-checkbox>
            </div>
          </el-checkbox-group>
          <p>自定义链接</p>
          <el-checkbox-group class="ofh" v-model="user_name_list" @change="change_baby_list()">
            <div class="ml20 ofh" v-if="Object.keys(user_list).length>0" v-for="(list,index) in user_list">
              <el-checkbox class="user_btn" :label="list.name" :key="index"></el-checkbox>
              <el-button class="user_del" size="12px" icon="el-icon-close" @click="user_del(index)" circle></el-button>
            </div>
          </el-checkbox-group>
          <!-- 添加自定义链接 -->
          <div class="user">
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
        // 宝贝列表
        baby_list: [],
        baby_name_list: [],
        // 页面链接
        win_list: [],
        win_name_list: [],
        // 自定义链接
        user_name: '',
        user_url: '',
        user_list: {},
        user_name_list: [],
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
      // 获取页面列表
      that.get_win_list()
      // 获取宝贝列表
      that.get_baby_list()
      // 获取自定义链接
      that.get_user_url()
    },
    methods: {
      // 获取自定义链接
      get_user_url() {
        var that = this
        var dispatch = this.$store.dispatch
        // 获取状态数据
        var data = fun.get_data(that.edit_mk_data, that.layout_data)
        that.user_list = {}
        if (Object.keys(data).length > 0) {
          that.user_list = data
        }
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

      // 获取页面
      get_win_list() {
        var that = this
        let list_data = [];
        for (var i = 0; i < 10; i++) {
          if (i == 0) {
            var data = {
              name: "页面" + i,
              url: "https://www.baidu.com/?tn=62095104_7_oem_dg",
              show: true
            }
          } else {
            var data = {
              name: "页面" + i,
              url: "https://www.baidu.com/?tn=62095104_7_oem_dg",
              show: false
            }
          }
          list_data.push(data)
        }
        that.win_list = list_data
        that.win_name_list[0] = that.win_list[0].name 
      },
      change_win_list() {
        var that = this
      },
      // 获取宝贝分类
      get_baby_list() {
        var that = this
        let list_data = [];
        for (var i = 0; i < 3; i++) {
          let data = {
            name: "宝贝" + i,
            url: "https://www.baidu.com/?tn=62095104_7_oem_dg",
            show: false
          }
          list_data.push(data)
        }
        that.baby_list = list_data
      },
      change_baby_list() {
        var that = this
      },
      // 删除自定义导航
      user_del(val) {
        var that = this
        var dispatch = this.$store.dispatch
        // 删除自定义导航
        dispatch({
          type: "del_url_ac",
          data: val
        })
        // 获取自定义链接
        that.get_user_url()
      },
      // 添加链接
      again_url() {
        var that = this
        var dispatch = this.$store.dispatch
        // 获取名称
        if (!that.user_name) {
          this.$message({
            message: '链接名不能为空',
            type: 'warning',
            duration: 2000,
          });
          return
        }
        // 获取连接
        else if (!that.user_url) {
          this.$message({
            message: '链接地址不能为空',
            type: 'warning',
            duration: 1000
          });
          return
        }
        // 发送信息
        var data = {
          name: that.user_name,
          url: that.user_url,
          show: false
        }
        that.user_name = ""
        that.user_url = ""
        // 发送数据
        fun.again_data(dispatch, data)
        // 获取自定义链接
        that.get_user_url()
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