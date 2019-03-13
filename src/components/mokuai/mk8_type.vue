<template>
  <div class="dialog">
    <div class="dialog-cont">
      <h2 :style="title_bg">
        <p>{{CustomData.set_title}}</p>
        <i @click="edit_mk_data_fun(false)">x</i>
      </h2>

      <!--tab-nav切换-->
      <div class="dialog-tab">
        <a :class="{actived:tabShow==true}" v-on:click="tabChange(true)">内容设置</a>
        <a :class="{actived:tabShow==false}" v-on:click="tabChange(false)">显示设置</a>
        <span>
          <img src="../../../static/img/help.png">查看制作教程
        </span>
      </div>
      <!--tab-cont切换-->
      <div class="dialog-tab-cont" v-if="tabShow">
        <div class="customser_info">
          <ul>
            <li>
              <span>工作时间</span>
              <table>
                <tbody>
                  <tr>
                    <th>时间</th>
                    <th>日期</th>
                    <th>显示</th>
                  </tr>
                  <tr>
                    <td>
                      <select v-model="CustomData.working_str_time">
                        <option v-for="item in timeList" :value="item.name">{{item.name}}</option>
                      </select>
                      <font>至</font>
                      <select v-model="CustomData.working_end_time">
                        <option v-for="item in timeList" :value="item.name">{{item.name}}</option>
                      </select>
                      <font>:</font>
                    </td>
                    <td>
                      <select v-model="CustomData.firdetail_start">
                        <option v-for="item in detailtimeList" :value="item.name">{{item.name}}</option>
                      </select>
                      <font>-</font>
                      <select v-model="CustomData.firdetail_end">
                        <option v-for="item in detailtimeList" :value="item.name">{{item.name}}</option>
                      </select>
                    </td>
                    <td>
                      <input type="checkbox" v-model="CustomData.selected">
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <select v-model="CustomData.weekend_str_time">
                        <option v-for="item in timeList" :value="item.name">{{item.name}}</option>
                      </select>
                      <font>至</font>
                      <select v-model="CustomData.weekend_end_time">
                        <option v-for="item in timeList" :value="item.name">{{item.name}}</option>
                      </select>
                      <font>:</font>
                    </td>
                    <td>
                      <select v-model="CustomData.secdetail_start">
                        <option v-for="item in detailtimeList" :value="item.name">{{item.name}}</option>
                      </select>
                      <font>-</font>
                      <select v-model="CustomData.secdetail_end">
                        <option v-for="item in detailtimeList" :value="item.name">{{item.name}}</option>
                      </select>
                    </td>
                    <td>
                      <input type="checkbox" v-model="CustomData.selected2">
                    </td>
                  </tr>
                </tbody>
              </table>
            </li>
            <li>
              <span>联系方式</span>
              <p>联系电话：
                <input type="text" v-model="CustomData.tel">
                <input type="checkbox" v-model="CustomData.selected3">
              </p>
              <p>联系手机：
                <input type="text" v-model="CustomData.m_phone">
                <input type="checkbox" v-model="CustomData.selected4">
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="dialog-tab-cont" v-if="!tabShow">
        <div class="show-title">
          <font>模块标题:</font>
          <div class="set-title">
            <input type="text" placeholder="设置标题" v-model="CustomData.set_title">
            <input type="checkbox" name="showTitle" v-model="CustomData.selected5">显示标题栏
            <span>30个字符以内,支持中英文数字和符号</span>
          </div>
        </div>
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
import fun from "../../assets/js/function.js";
export default {
  data: function() {
    return {
      title_bg: {
        background: "#0079fe" //标题背景颜色
      },
      tabShow: true,
      timeList: [
        { name: "周一" },
        { name: "周二" },
        { name: "周三" },
        { name: "周四" },
        { name: "周五" },
        { name: "周六" },
        { name: "周日" }
      ],
      detailtimeList: [
        { name: "00:00" },
        { name: "01:00" },
        { name: "02:00" },
        { name: "03:00" },
        { name: "04:00" },
        { name: "05:00" },
        { name: "06:00" },
        { name: "07:00" },
        { name: "08:00" },
        { name: "09:00" },
        { name: "10:00" },
        { name: "11:00" },
        { name: "12:00" },
        { name: "13:00" },
        { name: "14:00" },
        { name: "15:00" },
        { name: "16:00" },
        { name: "17:00" },
        { name: "18:00" }
      ],
      CustomData: {
        working_str_time: "周一", //工作日工作时间
        working_end_time: "周一", //工作日下班时间
        firdetail_start: "00:00", //详细开始时间
        firdetail_end: "00:00", //详细结束时间
        secdetail_start: "00:00", //详细开始时间
        secdetail_end: "00:00", //详细结束时间
        weekend_str_time: "周五", //休息日工作时间
        weekend_end_time: "周五", //休息日下班时间
        tel: null, //联系电话
        m_phone: null, //联系手机
        set_title: "客服中心", //客服标题
        selected: true,
        selected2: true,
        selected3: true,
        selected4: true,
        selected5: true
      }
    };
  },
  computed: mapState({
    edit_mk_data: state => state.edit_mk_data, //拿到当前客服中心编辑模块的位置信息
    layout_data: state => state.layout_data //拿到获取模块的布局信息
  }),
  mounted: function() {
    var that = this;
    that.get_data();
  },
  methods: {
    //tab切换改变状态
    tabChange: function(status) {
      var that = this;
      that.tabShow = status;
    },
    //保存客服中心数据
    savedata: function() {
      var that = this;
      var dispatch = this.$store.dispatch;
      console.log(that.CustomData);
      //数据发送给仓库存储
      fun.save_data(dispatch, that.CustomData);
    },

    //获取本地存储的数据
    get_data() {
      var that = this;
      var data = fun.get_data(that.edit_mk_data, that.layout_data); //将本地存储的数据赋值给data
      //console.log(data);
      //判断对象的长度
      if (Object.keys(data).length > 0) {
        //回显,数据同步到弹窗页面上
        that.CustomData = data;
        console.log(that.CustomData);
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
    width: 500px;
    height: 450px;
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
    .dialog-tab {
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
        background: #eee;
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        border-top: 1px solid #ccc;
        color: #666;
        margin-right: 5px;
        margin-top: -1px;
      }
      a:first-child {
        margin-left: 20px;
      }
      a.actived {
        border-bottom: none;
        background: #fff;
        border-bottom: none;
        padding-top: 1px;
      }
      span {
        float: right;
        font-size: 14px;
        line-height: 30px;
        color: #333;
        margin-right: 20px;
        img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }

    .dialog-tab-cont {
      width: 100%;
      overflow: hidden;
      margin: 15px auto 10px;
      .customser_info {
        width: 90%;
        margin: 5px auto 40px;
        overflow: hidden;
        ul li {
          margin-bottom: 20px;
          span {
            font-size: 14px;
            display: block;
            line-height: 25px;
            margin-bottom: 5px;
            font-weight: bold;
          }
          table {
            width: 100%;
            line-height: 25px;
            th {
              font-weight: normal;
              font-size: 14px;
              color: #36c;
            }
            td {
              select {
                width: 85px;
                height: 22px;
                line-height: 22px;
                font-size: 12px;
                border: 1px solid #ccc;
                padding: 0 5px;
              }
              font {
                margin: 0 0 0 5px;
                font-size: 12px;
              }
            }
          }
          p {
            font-size: 14px;
            line-height: 25px;
            width: 48.5%;
            float: left;
            input[type="text"] {
              width: 98px;
              height: 18px;
              line-height: 18px;
              font-size: 12px;
              border: 1px solid #ccc;
              padding: 0 5px;
            }
          }
          p:last-child {
            text-align: right;
            margin-right: 10px;
          }
        }
      }

      //设置标题
      .show-title {
        font-size: 14px;
        line-height: 30px;
        width: 90%;
        margin: 0 auto;
        overflow: hidden;
        font {
          float: left;
          margin-right: 10px;
          display: block;
        }
      }
      .set-title {
        margin-left: 10px;
        float: left;
        width: 82%;
        input[type="text"] {
          float: left;
          margin-top: 3px;
          width: 120px;
          border: 1px solid #ccc;
          height: 20px;
          font-size: 14px;
          padding: 0 5px;
          margin-right: 5px;
        }
        input[type="checkbox"] {
          margin-right: 10px;
          margin-top: 3px;
        }
        span {
          font-size: 14px;
          color: #999;
          line-height: 30px;
        }
      }
    }

    .dialog-btn {
      overflow: hidden;
      margin: 10px 0 0;
      padding-left: 28px;
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
