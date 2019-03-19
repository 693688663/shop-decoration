<template>
  <div
    :ref="dataref"
    id="mk7"
    class="pr"
    @mouseover="hoverActive_fun(true)"
    @mouseout="hoverActive_fun(false)"
  >
    <div
      :class="{content_w19:dataLocation3=='w19',content_w95:dataLocation3=='center',content_ft_w95:dataLocation3==''}"
    >
      <p :style="title_bg">{{get_links_data.set_title}}</p>
      <ul>
        <li v-if="get_links_data.linklist.length>0" v-for="item in get_links_data.linklist">
          <a :href="item.urlsite">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <mkbutton
      v-if="hoverActive==true"
      :datamk="datamk"
      :dataName="dataName"
      :dataLocation1="dataLocation1"
      :dataLocation2="dataLocation2"
      :dataLocation3="dataLocation3"
      :dataLocation4="dataLocation4"
      :datalength="datalength"
    ></mkbutton>
  </div>
</template>
<script>
import Mokuai from "../../assets/js/data.js";
import mkbutton from "./mkbutton/mkbutton";
import { mapState } from "vuex";
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
  data: function() {
    return {
      hoverActive: false,
      title_bg: {
        background: "#0079fe"
      },
      get_links_data: {}
    };
  },
  computed: mapState({
    layout_data: state => state.layout_data //获取所有模块的布局信息
  }),

  //监听数据改变状态
  watch: {
    // 所有模块数据
    layout_data: {
      handler(newName, oldName) {
        var that = this;
        that.re_selection();
      },
      deep: true
    }
  },
  mounted: function() {
    var that = this;
    //that.re_selection();
    // console.log(that.get_links_data);
    // that.linktitle();
    var linkdataNew = that.re_selection();
    console.log(linkdataNew);
    console.log(that.data);
    //判断data有无意义,当data无意义不存在时,当前页为主页
    if (!that.data) {
      //判断仓库返回来的值有没有数据
      //若仓库linkdataNew有数据,则页面get_links_data显示从仓库拿来的数据
      if (Object.keys(linkdataNew).length > 0) {
        //  console.log(1);
        that.get_links_data = linkdataNew
      } else {
        //  console.log(12);
        //若仓库没有数据,,则显示初始化数据
          that.get_links_data=that.linktitle();
      }
    } else {
      //  console.log(13);
      //当data 有意义时,当前页面为预览页,data为浏览页从仓库拿过来的值,
       that.get_links_data = that.data;
    }
    //console.log(that.get_links_data);
  },

  methods: {
    //返回值显示在页面上
    re_selection: function() {
      var that = this;
      //判断位置信息,把从仓库拿到的值赋给一个空数组
      if (that.dataLocation1 == "hd") {
        return that.layout_data.hd[that.dataLocation4].data;
      }
      if (that.dataLocation1 == "ft") {
        return that.layout_data.ft[that.dataLocation4].data;
        console.log(that.get_links_data);
      }
      if (that.dataLocation1 == "con") {
        if (that.dataLocation3 == "w19") {
          return that.layout_data.con[that.dataLocation2].w19[
            that.dataLocation4
          ].data;
        }
        if (that.dataLocation3 == "w75") {
          return that.layout_data.con[that.dataLocation2].w75[
            that.dataLocation4
          ].data;
        }
        if (that.dataLocation3 == "center") {
          return that.layout_data.con[that.dataLocation2].w1920[
            that.dataLocation4
          ].data;
        }
      }
      //console.log(that.dataLocation1)
      //console.log(that.dataLocation3);
    },

    //友情链接设置初始化信息
    linktitle: function() {
      var that = this;
      console.log(that.get_links_data);
      var dispatch = this.$store.dispatch;

      //组件位置信息
      var site = {
        location1: that.dataLocation1,
        location2: that.dataLocation2,
        location3: that.dataLocation3,
        location4: that.dataLocation4
      };

      //当对象长度为0时,判断对象有没有数据
      if (Object.keys(that.get_links_data).length == 0) {
        var data = {
          linkdata: {
            linklist: [
              {
                name: null,
                urlsite: null,
                descration: null,
                display: false
              }
            ],
            set_title: "友情链接"
          },
          site: site
        };
        // return data.linkdata;
        dispatch({
          type: "set_csh_info",
          data: data
        });
      }
    },
    //判断编辑按钮在主页还是预览页显示的状态
    hoverActive_fun(value) {
      var that = this;
      if (that.data) {
        //data存在,预览页
        that.hoverActive = false;
      } else {
        that.hoverActive = value;
      }
    },

    //获取后台数据
    get_data:function(){
      var that = this;
      var getLinkData = []

      for(var i=0;i<get_links_data.length;i++){
        var links_data={
           linklist: [
              {
                descration:"sfsd",
                display:false,
                name:"dasd",
                urlsite:"sdfsd" ,
              }
           ],
           set_title:'友情链接'
        };
        that.getLinkData[i]=links_data;

      }

    }

  }
};
</script>
<style scoped lang="less">
#mk7 {
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
}

.content_w95,
.content_ft_w95 {
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
    li {
      width: 20%;
      float: left;
      line-height: 40px;
      background: #fff;
      font-size: 20px;
      color: #666;
      a {
        font-size: 14px;
        color: #333;
        padding-left: 20px;
        display: block;
      }
    }
  }
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
    li {
      width: 50%;
      float: left;
      line-height: 40px;
      background: #fff;
      font-size: 20px;
      color: #666;
      a {
        font-size: 14px;
        color: #333;
        padding-left: 20px;
        display: block;
      }
    }
  }
}
</style>