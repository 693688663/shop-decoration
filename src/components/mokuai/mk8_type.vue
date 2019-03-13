<template>
   <div class="dialog">
     <div class="dialog-cont">
        <h2 :style="title_bg">
            <p>客服中心</p>
            <i @click="edit_mk_data_fun(false)">x</i>
        </h2>

        <!--tab-nav切换-->
        <div class="dialog-tab">
            <a :class="{actived:tabShow==true}" v-on:click="tabChange(true)">内容设置</a>
            <a :class="{actived:tabShow==false}" v-on:click="tabChange(false)">显示设置</a>
            <span>
                <img src=''>使用帮助
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
                        <select>                                        
                            <option>周一</option>
                            <option>周二</option>                         
                        </select><font>至</font>
                        <select>                                        
                            <option>周一</option>
                            <option>周二</option>                         
                        </select><font>:</font>
                        </td>
                      <td>
                         <select>                                        
                            <option>周一</option>
                            <option>周二</option>                         
                        </select><font>-</font>
                        <select>                                        
                            <option>周一</option>
                            <option>周二</option>                         
                        </select>
                      </td>
                      <td><input type="checkbox"></td>
                    </tr>
                    <tr>
                      <td>                  
                        <select>                                        
                            <option>周一</option>
                            <option>周二</option>                         
                        </select><font>至</font>
                        <select>                                        
                            <option>周一</option>
                            <option>周二</option>                         
                        </select><font>:</font>
                        </td>
                      <td>
                         <select>                                        
                            <option>周一</option>
                            <option>周二</option>                         
                        </select><font>-</font>
                        <select>                                        
                            <option>周一</option>
                            <option>周二</option>                         
                        </select>
                      </td>
                      <td><input type="checkbox"></td>
                    </tr>
                  </tbody>
                </table>
              </li>
              <li>
                <span>联系方式</span>
                <p>联系电话：<input type="text"><input type="checkbox"></p>
                <p>联系手机：<input type="text"><input type="checkbox"></p>
              </li>
            </ul>
          </div>
        </div>
        <div class="dialog-tab-cont" v-if="!tabShow">
          <div class="show-title">
            <font>模块标题:</font>
            <div class="set-title">
            <input type="text" placeholder="设置标题">
            <input type="checkbox" name="showTitle">显示标题栏
            <span>30个字符以内,支持中英文数字和符号</span>
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
     title_bg:{
        background: "#0079fe"
     },
     tabShow:true,
    };
  },
  computed: mapState({
    
  }),
  mounted:function(){
    var that = this;
  },
  methods: {
    tabChange:function(status){
      var that = this;
      that.tabShow = status;
    },

    // 隐藏编辑模块
    edit_mk_data_fun(val){
      var that = this;
      var dispatch = this.$store.dispatch
      dispatch({
        type: "mokuai_mask_ac",
        data: val
      });
    }
  }    
}
</script>
<style lang="less">
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
          }
      }

      .dialog-tab-cont {
        width: 100%;
        overflow: hidden;
        margin: 15px auto 10px;
        .customser_info{
          width: 90%;
          margin: 5px auto 40px;
          overflow: hidden;
          ul li{
            margin-bottom: 20px;
            span{
              font-size: 14px;
              display:block;
              line-height: 25px;
              margin-bottom: 5px;
              font-weight: bold
            }
            table{
              width: 100%;
              line-height: 25px;
              th{
                font-weight: normal;
                font-size: 14px;
                color: #36C;
              }
              td{
                select{
                  width: 85px;
                  height: 22px;
                  line-height: 22px;
                  font-size: 12px;
                  border: 1px solid #ccc;
                  padding: 0 5px;
                }
                font{
                  margin:0 0 0 5px;
                  font-size: 12px;
                }
              }
            }
            p{
              font-size: 14px;
              line-height: 25px;
              width: 48.5%;
              float: left;
              input[type="text"]{
                width: 98px;
                height: 18px;
                line-height: 18px;
                font-size: 12px;
                border: 1px solid #ccc;
                padding: 0 5px;
              }
            }
            p:last-child{
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
            margin-right:5px;
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
        padding-left:28px;
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
