<template>
  <div class="dialog">
    <div class="dialog-cont">
      <h2 :style="title_bg">
        <p>店铺招牌</p>
        <i @click="edit_mk_data_fun(false)">x</i>
      </h2>

      <!--tab-nav切换-->
      <div class="dialog-tab">
        <a href="">招牌内容</a>
        <span>
          <img src="../../../static/img/help.png">使用帮助
        </span>
      </div>
      <!--显示设置-->
      <div class="dialog-tab-cont">
        <div class="show-title">
          <font>招牌类型:</font>
          <label>
            <input type="radio" v-model="shopsign.shopSignType" value="1">默认招牌
          </label>
          <label>
            <input type="radio" v-model="shopsign.shopSignType" value="2">自定义招牌
          </label>
        </div>
        <!--默认招牌-->
        <div class="default" v-if="shopsign.shopSignType==1">
          <ul>
            <li>
              <font>店铺名称:</font>
              <input class="shop_name" type="text" v-model="shopsign.name">
              <label>
                是否显示店铺名称
                <input type="checkbox" v-model="shopsign.showName">
              </label>
            </li>
            <li>
              <font>背景图:</font>
              <div class="upload">
                <el-upload style="display: initial;float:left" action="https://jsonplaceholder.typicode.com/posts/">
                  <el-button type="primay">选择文件</el-button>
                </el-upload>
                <a>使用默认图片</a>
                <img :src="shopsign.defaultImg">

              </div>
            </li>
            <li>
              <font>高度:</font>
              <p><input type="text" class="shipsign_h" v-model="shopsign.ImgHeight">px <i>宽度为950像素,高度建议不超过120像素,否则澳航显示可能异常</i></p>
            </li>
          </ul>
        </div>

        <!--自定义招牌-->
        <div class="custom" v-if="shopsign.shopSignType==2">
          <ul>
            <li>
              <font>自定义内容:</font>
              <!-- <img src="../../../static/img/Ueditor.png"> -->
              <vue-editor v-model="content"></vue-editor>
            </li>
            <li>
              <font>高度:</font>
              <p><input type="text" class="shipsign_h">px <i>宽度为950像素,高度建议不超过120像素,否则澳航显示可能异常</i></p>
            </li>
          </ul>
        </div>
      </div>

      <div class="dialog-btn">
        <button type="button" class="save" @click="savedata()">保存</button>
        <button type="button" class="cancel" @click="edit_mk_data_fun(false)">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  import { mapState } from "vuex";
  import fun from "../../assets/js/function.js"
  export default {
    components: {
      VueEditor
    },
    data: function () {
      return {
        content: '<h1>Some initial content</h1>',
        title_bg: {
          background: "#0079fe"
        },
        shopsign: {
          shopSignType: 1,
          showName: true,
          ImgHeight: 120,
          name: "sdsddf",
          defaultImg: "../../../static/img/default.png",
          definedImg: null,
        }
      };
    },
    computed: mapState({
      edit_mk_data: state => state.edit_mk_data, //拿到状态仓库位置数据信息
      layout_data: state => state.layout_data //拿到状态仓库里模块布局的数据信息
    }),
    mounted: function () {
      var that = this;
      that.qwe()
    },
    methods: {
      qwe() {
        var that = this
        this.$axios({
          method: 'get',
          url: 'http://localhost:3000',
          data: this.qs.stringify({    //这里是发送给后台的数据
            userId: 123,
            token: 123,
          })
        }).then((response) => {          //这里使用了ES6的语法
          console.log(response.data)       //请求成功返回的数据
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      //保存数据,并把数据发送到仓库
      savedata: function () {
        var that = this;
        console.log(that.content);
        // var dispatch = this.$store.dispatch;
        // fun.save_data(dispatch, that.shopsign);
      },


      //从仓库拿数据,保存到页面上
      get_sign: function () {
        var that = this;
        //从仓库拿回返回的值
        var data = fun.get_data(that.edit_mk_data, that.layout_data);
        if (Object.keys(data).length > 0) {
          that.shopsign = data;
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
      width: 820px;
      /* height: 420px; */
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
          border-right: 1px solid #ccc;
          border-left: 1px solid #ccc;
          border-top: 1px solid #ccc;
          color: #666;
          margin-right: 5px;
          margin-top: -1px;
          margin-left: 40px;
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

        .show-title {
          font-size: 14px;
          line-height: 30px;
          width: 90%;
          margin: 0 auto 5px;
          overflow: hidden;

          font {
            float: left;
            margin-right: 10px;
            width: 80px;
            text-align: right;
          }

          input[type="radio"] {
            margin-top: 2px;
          }

          label {
            float: left;
            margin-right: 10px;
          }
        }

        .default {
          font-size: 14px;
          line-height: 30px;
          width: 90%;
          margin: 0 auto 5px;
          overflow: hidden;

          ul {
            li {
              width: 100%;
              overflow: hidden;
              margin-bottom: 5px;

              .shop_name {
                border: 1px solid #ddd;
                width: 90px;
                padding: 0 3px;
                height: 24px;
                border-radius: 3px;
              }

              font {
                float: left;
                margin-right: 10px;
                width: 80px;
                text-align: right;
              }

              a.changename {
                color: blue;
                margin: 0 20px 0 5px;
                cursor: pointer;
              }

              a.changename:hover {
                text-decoration: underline
              }

              .upload {
                width: 85%;
                float: left;

                .el-upload {
                  float: left;
                  display: initial !important;

                  .el-button {
                    padding: 5px 20px !important;
                    margin-right: 10px;
                  }
                }

                a {
                  font-size: 14px;
                  line-height: 25px;
                }

                img {
                  width: 100%;
                  height: 100%;
                  max-height: 120px;
                  margin-top: 10px;
                  border: 1px solid #ddd
                }
              }

              p {
                font-size: 14px;
                line-height: 25px;

                input.shipsign_h {
                  width: 50px;
                  border: 1px solid #ddd;
                  margin-right: 5px;
                  padding: 0 5px;
                  height: 20px;
                  line-height: 20px;
                  font-size: 13px;
                }

                i {
                  font-style: normal;
                  color: #999;
                  font-size: 14px;
                  line-height: 30px;
                  margin-left: 10px;
                }
              }
            }
          }
        }

        .custom {
          font-size: 14px;
          line-height: 30px;
          width: 90%;
          margin: 0 auto 5px;
          overflow: hidden;

          ul {
            li {
              width: 100%;
              overflow: hidden;
              margin-bottom: 5px;

              font {
                float: left;
                margin-right: 10px;
                width: 80px;
                text-align: right;
              }

              img {
                float: left;
                width: 85%;
                overflow: hidden;
                margin-top: 7px
              }

              p {
                font-size: 14px;
                line-height: 25px;

                input.shipsign_h {
                  width: 50px;
                  border: 1px solid #ddd;
                  margin-right: 5px;
                  padding: 0 5px;
                  height: 20px;
                  line-height: 20px;
                  font-size: 13px;
                }

                i {
                  font-style: normal;
                  color: #999;
                  font-size: 14px;
                  line-height: 30px;
                  margin-left: 10px;
                }
              }
            }
          }
        }
      }

      .dialog-btn {
        overflow: hidden;
        margin: 10px 0 10px;
        padding-left: 125px;

        button {
          float: left;
          padding: 0px 20px;
          font-size: 14px;
          line-height: 25px;
          border: 1px solid #ddd;
          background: #fff;
          margin-top: 10px;
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