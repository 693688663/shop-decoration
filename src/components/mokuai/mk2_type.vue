<template>
  <div id="mk2_type">
    <div class="title pr">宝贝排行榜<span class="del cursor" @click="edit_mk_data_fun(false)"></span></div>
    <div class="con">
      <div class="li display_setup">
        <span class="type">显示设置：</span>
        <span class="messagea">
          <label><input name="show_name" type="radio" value="1" v-model="data.show_name" />不显示</label>
          <label><input name="show_name" type="radio" value="2" v-model="data.show_name" />显示</label>
        </span>
        <input class="mk1_type_name" type="text" v-show="data.show_name==2" v-model="data.name">
      </div>
      <div class="li">
        <span class="type">宝贝分类：</span>
        <span class="messagea">
          <select class="input-box" name="sort" v-model="data.baby_classify">
            <option value="1" selected>所以分类</option>
            <option value="2">热卖宝贝在前</option>
            <option value="3">热门收藏在前</option>
            <option value="4">最新发布在前</option>
            <option value="5">价格最低在前</option>
            <option value="6">价格最低在后</option>
          </select>
        </span>
      </div>
      <div class="li keys">
        <span class="type">关键字：</span>
        <input class="mk1_type_name" type="text" v-model="data.keys">
      </div>
      <div class="li">
        <span class="type">价格范围：</span>
        <span class="messagea money">
          <input type="number" v-model="data.money_min">&nbsp;-&nbsp;<input type="number" v-model="data.money_max">&nbsp;元
        </span>
      </div>
      <div class="li">
        <span class="type">宝贝数量：</span>
        <span class="messagea num">
          <select class="input-box" v-model="data.baby_type" name="sort">
            <option value="3" selected>3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="8">8</option>
            <option value="10">10</option>
          </select>

        </span>
      </div>
      <div class="li display_setup">
        <span class="type">显示设置：</span>
        <span class="messagea">
          <label><input name="show_type" type="radio" value="1" v-model="data.show_type" />本月热销排行</label>
          <label><input name="show_type" type="radio" value="2" v-model="data.show_type" />热门收藏排行</label>
        </span>
      </div>
      <div class="li is_show">
        <span class="type"></span>
        <span class="message">
          <label><input name="yes_show" type="checkbox" value="2" v-model="data.yes_show" />最近30天销售数据</label>

        </span>
      </div>
      <p class="operation">
        <span class="save" @click="save_fun()">保存</span>
        <span @click="edit_mk_data_fun(false)">取消</span>
      </p>
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
        data: {
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
      }

    },
    // 获取状态仓库数据
    computed: mapState({
      edit_mk_data: state => state.edit_mk_data,//当前编辑模块的位置信息
      layout_data: state => state.layout_data,//所有模块的布局信息
      site3: state => state.edit_mk_data.location3,//模块单元位置
    }),
    mounted: function () {
      var that = this
      // 获取设置数据
      that.get_data()
    },
    methods: {
      // 获取设置数据
      get_data() {
        var that = this
        // 获取仓库设置数据
        that.data = fun.get_data(that.edit_mk_data, that.layout_data)

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
      // 保存
      save_fun() {
        var that = this
        var dispatch = this.$store.dispatch
        console.log(that.data)
        // 保存数据
        fun.save_data(dispatch, that.data)
        // 隐藏弹窗
        that.edit_mk_data_fun(false)
      },
    },
  }
</script>
<style lang="less">
  #mk2_type {
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

    .con {
      overflow: scroll;
      height: 520px;
      padding: 30px 0 0;

      .li {
        height: 26px;
        line-height: 26px;
        margin-bottom: 10px;
        font-size: 12px;

        span {
          line-height: 26px;
          display: inline-block
        }

        span.type {
          text-align: right;
          width: 100px;
        }

        .messagea {
          padding-left: 10px;

          label {
            display: inline-block;
            line-height: 26px;
            margin-right: 10px;

            input {
              height: 26px;
              line-height: 26px;
              display: inline-block;
              margin: 0 5px 0 0;
              vertical-align: middle;
            }
          }

          select {
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            background: url(../../../static/img/FXX.png) no-repeat right center;
            background-size: 15px 18px;
            width: 150px;
            font-size: 12px;
            height: 24px;
            line-height: 24px;
            padding: 0 5px;
          }
        }

        .money input {
          width: 48px;
          height: 23px;
          padding: 0 5px;
          border: 1px solid #a9a9a9
        }

        .num input {
          width: 138px;
          height: 23px;
          padding: 0 5px;
          border: 1px solid #a9a9a9
        }
      }

      .keys {
        .mk1_type_name {
          width: 136px;
          height: 20px;
          margin-left: 10px;
          padding: 0 5px;
        }
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
</style>