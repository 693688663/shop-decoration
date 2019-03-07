<template>
   <div class="dialog">
        <div class="dialog-cont">
            <h2 :style="title_bg">
                <p>友情链接</p>
                <i @click="edit_mk_data_fun(false)">x</i>
            </h2>
            <!--tab-nav切换-->
            <div class="dialog-tab">
                <a :class="{actived:tabShow==true}" v-on:click="tabChange(true)">内容设置</a>
                <a :class="{actived:tabShow==false}" v-on:click="tabChange(false)">显示设置</a>
                <span>
                    <img src>使用帮助
                </span>
            </div>
            <!--tab-cont切换-->
            <div class="dialog-tab-cont" v-if="tabShow">
                <p>
                    链接类型:
                    <label>
                    <input type="radio" value="words" v-model="picked" name="radio" v-on:click="radioChange(true)">文字
                    </label>
                    <label>
                    <input type="radio" value="picture" v-model="picked" name="radio" v-on:click="radioChange(false)">图片
                    </label>
                </p>

                <!--文字-->
                <div class="link-words" v-if="radioShow==true">
                    <ul>
                    <li v-for="(item,index) in linkdata.linklist">
                        <span>
                            链接名称:
                            <input type="text" class="input1" v-model="item.name">
                            <div class="dialog-operation" @mouseleave="item.display=false">
                                <a @mouseenter="item.display=true" id="move">移动
                                <div class="move" v-show="item.display">
                                    <span @click="moveall(-1,index);item.display=false">上一排</span>
                                    <span @click="moveall(1,index);item.display=false">下一排</span>
                                    <span @click="moveall(0,index);item.display=false">置顶</span>
                                    <span @click="moveall(2,index);item.display=false">最底部</span>
                                </div>
                                </a>
                                <a @click="deletePerson(index)">删除</a>
                            </div>
                        </span>
                        <span>
                            链接地址:
                            <input type="text" class="input2" v-model="item.urlsite">
                        </span>
                        <span>
                            链接说明:
                            <input type="text" class="input2" v-model="item.descration">
                        </span>
                    </li>
                    
                    </ul>
                </div>

                <!--图片-->
                <div class="link-words" v-if="radioShow==false">
                    <ul>
                    <li>
                        <span>
                            链接名称:
                            <input type="text" class="input1">
                            <img src>
                            <font>仅支持180*30</font>
                            <div class="dialog-operation">
                                <a>移动</a>
                                <a>删除</a>
                            </div>
                        </span>
                        <span>
                            链接地址:
                            <input type="text" class="input2">
                        </span>
                        <span>
                            链接说明:
                            <input type="text" class="input2">
                        </span>
                    </li>
                    </ul>
                </div>
                <button type="button" class="addBtn" @click="addNewList()">添加</button>
            </div>

            <!--显示设置-->
            <div class="dialog-tab-cont" v-if="!tabShow">
                <div class="show-title">
                    <font>显示标题:</font>
                    <label>
                    <input type="radio" name="showTitle" v-model="show" value="hidden" v-on:click="settitle(false)">不显示
                    </label>
                    <label>
                    <input type="radio" name="showTitle" v-model="show" value="show" v-on:click="settitle(true)">显示
                    </label>
                    <div class="set-title" v-if="showtitle">
                    <input type="text" placeholder="设置标题" v-model="linkdata.set_title">
                    <span>最多15个汉字,30个字符</span>
                    </div>
                </div>
            </div>

            <div class="dialog-btn">
                <button type="button" class="save" @click="savedata();edit_mk_data_fun(false)">保存</button>
                <button type="button" class="cancel"  @click="edit_mk_data_fun(false)">取消</button>
            </div>
            </div>
   </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: function () {
    return {
      isShow: false,
      title_bg: {
        background: "#0079fe"
      },
      tabShow: true,
      radioShow: true,
      picked: "words", // v-model="picked",value="words" 单选显示文字选中
      show: "hidden",
      showtitle: false,
      seen: [],
      linkdata:{
        linklist: [
          {
            name: null,
            urlsite: null,
            descration: null,
            display: false
          },
        ],
        set_title:'友情链接'
      }
    };
  },
  computed: mapState({
    edit_mk_data: state => state.edit_mk_data,//获取当前编辑位置信息
    layout_data:state => state.layout_data, //获取所有模块的布局信息
  }),
  mounted:function(){
    var that = this;
    //回显
    that.re_selection();
  },
  methods: {
    //页面内容切换
    tabChange: function (t) {
      var that = this;
      this.tabShow = t;
    },
    radioChange: function (r) {
      var that = this;
      that.radioShow = r;
    },
    settitle: function (s) {
      var that = this;
      that.showtitle = s;
    },

    //添加li
    addNewList() {
      var that = this;
      //保存数据
      let data ={
          name: null,
          urlsite: null,
          descration: null,
          display: false
      }
      that.linkdata.linklist.push(data);

    },

    // 删除一列数据
    deletePerson(index) {
      // 删一个数组元素
      var that = this;
      let data ={   
          name: null,
          urlsite: null,
          descration: null,
          display: false
      }
      // 删除最后一条重新创建新数组
      if(that.linkdata.linklist.length<=1){
        that.linkdata.linklist.splice(0,1,data);
      }else{
        that.linkdata.linklist.splice(index,1);
      }
      console.log( that.linkdata);
    },
    // 保存函数
    savedata() {
      var that = this;
      var dispatch = this.$store.dispatch;
      dispatch({
        type: "link_data",
        data: that.linkdata
      });
      //console.log(that.linkdata);
    },

    // 移动序列
    moveall: function (num, index) {
      var that = this;
      // 取出数据
      var val = that.linkdata.linklist[index];
      // 删除数据
      that.linkdata.linklist.splice(index, 1);
      // 上移
      if (num == -1 || num == 1) {
        // 添加数据
       that.linkdata.linklist.splice(index + num, 0, val);
      }
      // 置顶
      if (num == 0) {
        that.linkdata.linklist.splice(0, 0, val);
      }
      // 置低
      if (num == 2) {
        that.linkdata.linklist.splice(that.linkdata.linklist.length, 0, val);
      }
    },
    // 隐藏编辑模块
    edit_mk_data_fun(val) {
      var that = this
      var dispatch = this.$store.dispatch
      dispatch({
        type: "mokuai_mask_ac",
        data: val
      });
      that.re_selection();

    },

    //回选
    re_selection:function(){
      var that = this;
      var newlinksdata={};
      var site = that.edit_mk_data
      //判断位置信息,把从仓库拿到的值赋给一个空数组
      if (site.location1 == "hd") {
        newlinksdata = JSON.parse(JSON.stringify(that.layout_data.hd[site.location4].data))
      }
      if (site.location1 == "ft") {
        newlinksdata = JSON.parse(JSON.stringify(that.layout_data.ft[site.location4].data))
        console.log(newlinksdata);
      }
      if (site.location1 == "con") {
        if (site.location3 == "w19") {
          newlinksdata = JSON.parse(JSON.stringify(that.layout_data.con[site.location2].w19[site.location4].data))
        }
        if (site.location3 == "w75") {
          newlinksdata = JSON.parse(JSON.stringify(that.layout_data.con[site.location2].w75[site.location4].data))
        }
        if (site.location3 == "center") {
          newlinksdata = JSON.parse(JSON.stringify(that.layout_data.con[site.location2].w1920[site.location4].data))
        }
      }
      if(newlinksdata.linklist){
        if (newlinksdata.linklist.length > 0) {        
          that.linkdata = newlinksdata
        }
      }
    }
  }
}
</script>
<style>
 .dialog {
      background: #000;
      position: relative;
   }

   .dialog-cont {
      width: 800px;
      height: 560px;
      background: #fff;
      position: fixed;
      z-index: 999;
      left: 30%;
      top: 20%;
   }

   .dialog-cont h2 {
      width: 100%;
      overflow: hidden;
      height: 30px;
      font-size: 14px;
      font-weight: normal;
      color: #fff;
   }

   .dialog-cont h2 p {
      float: left;
      line-height: 30px;
      padding-left: 10px;
   }

   .dialog-cont h2 i {
      float: right;
      padding-right: 10px;
      font-style: normal;
      font-size: 24px;
      color: #333;
      margin-top: -4px;
   }

   .dialog-tab {
      width: 100%;
      height: 30px;
      border-bottom: 1px solid #ccc;
      margin-top: 10px;
   }

   .dialog-tab a {
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

   .dialog-tab a:first-child {
      margin-left: 20px;
   }

   .dialog-tab a.actived {
      border-bottom: none;
      background: #fff;
      border-bottom: none;
      padding-top: 1px;
   }

   .dialog-tab span {
      float: right;
      font-size: 14px;
      line-height: 30px;
      color: #333;
      margin-right: 20px;
   }

   .dialog-tab-cont {
      width: 100%;
      overflow: hidden;
      margin: 15px auto 10px;
   }

   .dialog-tab-cont p {
      font-size: 14px;
      line-height: 30px;
      width: 90%;
      margin: 0 auto;
   }

   .dialog-tab-cont input[type="radio"] {
      margin-top: 2px;
   }

   .dialog-tab-cont .show-title {
      font-size: 14px;
      line-height: 30px;
      width: 90%;
      margin: 0 auto;
   }

   .dialog-tab-cont .show-title input[type="radio"] {
      margin-top: 2px;
   }

   .dialog-tab-cont .show-title label,
   .dialog-tab-cont .show-title font {
      float: left;
      margin-right: 10px;
   }

   .dialog-tab-cont .show-title .set-title {
      margin-left: 10px;
      float: left;
   }

   .dialog-tab-cont .show-title .set-title input {
      float: left;
      margin-top: 3px;
      width: 120px;
      border: 1px solid #ccc;
      height: 20px;
      font-size: 14px;
      padding: 0 5px;
      margin-right: 10px;
   }

   .dialog-tab-cont .show-title .set-title span {
      font-size: 14px;
      color: #999;
      line-height: 30px;
   }

   .link-words {
      width: 94%;
      overflow-y: scroll;
      height: 335px;
      margin: 5px auto;
   }

   .link-words::-webkit-scrollbar {
      display: none;
   }

   .link-words ul li {
      width: 100%;
      margin-bottom: 20px;
      background: #f1f1f1;
      padding: 10px 0;
   }

   .link-words ul li span {
      display: block;
      padding: 0 18px;
      font-size: 14px;
      line-height: 30px;
      margin-bottom: 10px;
   }

   .link-words ul li span:last-child {
      margin-bottom: 0;
   }

   .link-words ul li span font {
      font-size: 14px;
   }

   .link-words ul li span .dialog-operation {
      float: right;
   }

   .link-words ul li span .dialog-operation a {
      color: #0569ce;
      font-size: 14px;
      margin-right: 10px;
      position: relative;
   }

   /* .link-words ul li span .dialog-operation a#move {
   position: relative;
 } */
   .move {
      overflow: hidden;
      border: 1px solid #ddd;
      background: #fff;
      position: absolute;
      right: 11%;
      z-index: 999;
      -webkit-box-shadow: 1px 1px 10px #ccc;
      box-shadow: 1px 1px 10px #ccc;
      width: 80px;
      text-align: center;
   }

   .move span {
      padding: 0 10px !important;
      margin: 0 !important;
      display: block;
      font-size: 12px !important;
      line-height: 25px !important;
      cursor: pointer;
      color: #333;
   }

   .link-words ul li span input {
      height: 25px;
      border: 1px solid #ccc;
      line-height: 25px;
      padding: 0 5px;
   }

   .link-words ul li span input[type="text"].input1 {
      width: 200px;
   }

   .link-words ul li span input[type="text"].input2 {
      width: 500px;
   }

   .dialog-tab-cont button.addBtn {
      float: right;
      padding: 0px 20px;
      font-size: 14px;
      line-height: 25px;
      border: 1px solid #ddd;
      background: #fff;
      cursor: pointer;
      margin-right: 25px;
   }

   .dialog-cont .dialog-btn {
      overflow: hidden;
      margin: 10px 0 0;
      padding-left: 110px;
   }

   .dialog-cont .dialog-btn button {
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

   .dialog-cont .dialog-btn button.save {
      background: #333;
      color: #fff;
   }
</style>
