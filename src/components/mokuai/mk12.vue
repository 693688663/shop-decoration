<template>
  <div :ref="dataref" id="mk12" class="pr" @mouseover="hoverActive_fun(true)" @mouseout="hoverActive_fun(false)">
    <div :class="{content_w19:dataLocation3=='w19',content_w95:dataLocation3=='center',content_w75:dataLocation3=='w75'}">
      <p :style="title_bg" v-if="get_search.show==2">
        <span>{{get_search.set_title}}</span>
      </p>
      <ul :class="{ul_w95:get_search.show==1,ul_w75:get_search.show==1}">
        <li>
          <label>关键字:</label>
          <input type="text" class="keyword" :placeholder="get_search.keyword">
        </li>
        <li v-if="get_search.selected" class="secLi">
          <label>价格:</label>
          <div class="search_price">
            <font>¥</font>
            <input type="text" class="price">
          </div>
          <div class="search_price">
            <font>¥</font>
            <input type="text" class="price">
          </div>
        </li>
        <li>
          <button type="button" @click="search()">搜索</button>
        </li>
        <div class="kw">
          <span>{{get_search.re_keyword1}}</span>
          <span>{{get_search.re_keyword2}}</span>
          <span>{{get_search.re_keyword3}}</span>
        </div>
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
        show_searchtitle: true,
        get_search: {
          set_title: "本店搜索"
        }
      };
    },
    computed: mapState({
      layout_data: state => state.layout_data //拿到状态仓库布局信息
    }),
    //监听数据改变状态
    watch: {
      // 所有模块数据
      layout_data: {
        handler(newName, oldName) {
          var that = this;
          that.get_searchlist();
        },
        deep: true
      }
    },
    //初始化
    mounted: function () {
      var that = this;
      that.get_searchlist();
    },
    methods: {
      //回显,数据同步到页面上
      get_searchdata: function () {
        var that = this;
        var dispatch = this.$store.dispatch;
        var site = {
          location1: that.dataLocation1,
          location2: that.dataLocation2,
          location3: that.dataLocation3,
          location4: that.dataLocation4
        };
        //console.log(site,that.layout_data);
        return fun.get_data(site, that.layout_data);
      },
      //判断编辑按钮在主页和预览页状态
      hoverActive_fun: function (value) {
        var that = this;
        //console.log(value);
        if (that.data) {
          //data有意义,预览页
          that.hoverActive = false;
        } else {
          that.hoverActive = value;
        }
      },
      //数据同步到页面上
      get_searchlist: function () {
        var that = this;

        //从仓库拿到得值
        var storedata = that.get_searchdata();

        //判断data有无意义
        //若data无意义,则为首页
        if (!that.data) {
          // 如果仓库数据有值
          if (Object.keys(storedata).length > 0) {
            that.get_search = storedata;
          } else {
            //没有数据时,,显示初始化设置信息
            that.set_data();
          }
        } else {
          //若data有意义,则为预览页
          that.get_search = that.data;
          console.log(that.get_search);
        }
      },
      //搜索判断预设关键字是否为空
      search: function () {
        var that = this;
        console.log(that.get_search.keyword);
        var keyword = that.get_search.keyword;
        if (keyword) {
          this.$router.push({ path: "" });
        } else {
          this.$message({
            message: "请输入要搜索的关键字",
            type: "warning"
          });
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
        //发送基础设置数据
        var get_search = {
          show: 2,
          set_title: "本店搜索",
          keyword: null,
          re_keyword1: null,
          re_keyword2: null,
          re_keyword3: null,
          selected: false
        };
        //将数据保存到仓库
        fun.first_save_data(dispatch, site, get_search);
      }
    }
  };
</script>
<style lang="less" scoped>
  #mk12 {
    width: 100%;
    max-width: 950px;
    margin: 0 auto;
    padding-bottom: 10px;
  }

  .content_w19 {
    width: 190px;
    overflow: hidden;

    p {
      font-size: 14px;
      color: #fff;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }

    ul {
      width: 99%;
      border-right: 1px solid #ddd;
      border-left: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      min-height: 40px;
      padding-top: 5px;

      li {
        line-height: 40px;
        font-size: 14px;
        color: #666;
        width: 90%;
        margin: 0 auto;
        overflow: hidden;

        label {
          float: left;
          color: #333;
          font-size: 14px;
          width: 27%;
          text-align: right;
        }

        input.keyword {
          width: 64%;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          border: 1px solid #ccc;
          padding: 0 5px;
        }

        .search_price {
          width: 30%;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          border: 1px solid #ccc;
          float: left;
          margin-top: 8px;
          background: #fff;

          font {
            float: left;
            padding-left: 5px;
          }

          input {
            width: 75%;
            float: left;
            border: none;
            height: 18px;
            line-height: 18px;
            font-size: 14px;
          }
        }

        .search_price:last-child {
          float: right;
          margin-right: 5px;
        }

        button {
          background: #0079fe;
          border: none;
          padding: 3px 10px;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          margin-left: 45px;
        }
      }

      .kw {
        overflow: hidden;
        margin: 2px 0 8px;
        padding: 0 12px;

        span {
          width: 33.3%;
          float: left;
          font-size: 14px;
          line-height: 25px;
        }
      }
    }
  }

  .content_w95 {
    width: 950px;
    overflow: hidden;

    p {
      font-size: 14px;
      color: #fff;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }

    ul {
      width: 99.8%;
      border-right: 1px solid #ddd;
      border-left: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      min-height: 40px;
      padding-top: 5px;

      li {
        line-height: 40px;
        font-size: 14px;
        color: #666;
        float: left;
        overflow: hidden;

        label {
          float: left;
          color: #333;
          font-size: 14px;
          text-align: left;
        }

        input.keyword {
          width: 75%;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          border: 1px solid #ccc;
          padding: 0 5px;
        }

        .search_price {
          width: 30%;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          border: 1px solid #ccc;
          float: left;
          margin-top: 8px;
          background: #fff;

          font {
            float: left;
            padding-left: 5px;
          }

          input {
            width: 75%;
            float: left;
            border: none;
            height: 18px;
            line-height: 18px;
            font-size: 14px;
          }
        }

        .search_price:last-child {
          float: right;
          margin-right: 30px;
        }

        button {
          background: #0079fe;
          border: none;
          padding: 3px 10px;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
        }
      }

      li:first-child {
        width: 30%;
        margin-left: 40px;
      }

      li.secLi {
        width: 20%;
      }

      .kw {
        overflow: hidden;
        padding: 0 12px;

        span {
          margin-right: 10px;
          float: left;
          font-size: 14px;
          line-height: 40px;
          display: block;
        }
      }
    }

    ul.ul_w95 {
      border-top: 1px solid #ddd;
      background: #eee;
    }
  }

  .content_w75 {
    width: 750px;
    overflow: hidden;

    p {
      font-size: 14px;
      color: #fff;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }

    ul {
      width: 99.7%;
      border-right: 1px solid #ddd;
      border-left: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      min-height: 40px;
      padding-top: 5px;

      li {
        line-height: 40px;
        font-size: 14px;
        color: #666;
        float: left;
        overflow: hidden;

        label {
          float: left;
          color: #333;
          font-size: 14px;
          text-align: left;
        }

        input.keyword {
          width: 75%;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          border: 1px solid #ccc;
          padding: 0 5px;
        }

        .search_price {
          width: 30%;
          height: 22px;
          line-height: 22px;
          font-size: 12px;
          border: 1px solid #ccc;
          float: left;
          margin-top: 8px;
          background: #fff;

          font {
            float: left;
            padding-left: 5px;
          }

          input {
            width: 75%;
            float: left;
            border: none;
            height: 18px;
            line-height: 18px;
            font-size: 14px;
          }
        }

        .search_price:last-child {
          float: right;
          margin-right: 30px;
        }

        button {
          background: #0079fe;
          border: none;
          padding: 3px 10px;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
        }
      }

      li:first-child {
        width: 32%;
        margin-left: 20px;
        margin-right: 10px;
      }

      li.secLi {
        width: 25%;
      }

      .kw {
        overflow: hidden;
        padding: 0 12px;

        span {
          margin-right: 10px;
          float: left;
          font-size: 14px;
          line-height: 40px;
          display: block;
        }
      }
    }

    ul.ul_w75 {
      border-top: 1px solid #ddd;
      background: #eee;
    }
  }
</style>