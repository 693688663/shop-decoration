<template>
   <div class="index pr" ref="index" @mouseup="dy_move_up($event)">
      <!-- 头部 -->
      <div class="header" ref="header">
         <ul>
            <li :class="{active:header_active==1}" @click="header_active=1">电脑页面装修</li>
            <li :class="{active:header_active==2}" @click="header_active=2"> 手机页面装修</li>
         </ul>
      </div>
      <!-- 主体部分 -->
      <div class="content pr" ref="content" :style="content_height">
         <!-- 功能选择区 -->
         <div class="fun_area ofh fl" ref="fun_area" :style="content_height">
            <ul>
               <li :class="{active:content1_active==1}" @click="content1_active_fun(1)">模块</li>
               <li :class="{active:content1_active==2}" @click="content1_active_fun(2)">配色</li>
               <li :class="{active:content1_active==3}" @click="content1_active_fun(3)">页头</li>
               <li :class="{active:content1_active==4}" @click="content1_active_fun(4)">页面</li>
            </ul>
         </div>
         <!-- 功能区 -->
         <div class="fun_piece fl pr" ref="fun_piece" :style="content_height" v-show="content1_active!=0">
            <ul>
               <li :class="{active:content1_active==1||content1_active==0}">
                  <p class="remove">
                     <span class="gb" @click="content1_active_fun(0)"></span>
                  </p>
                  <p class="ts">选择所需模块，并拖动至相应位置</p>
                  <ul class="win_width">
                     <li :class="{active:mk_active==0}" @click="mk_change('mk_active',0)">所有</li>
                     <li :class="{active:mk_active==190}" @click="mk_change('mk_active',190)">190</li>
                     <li :class="{active:mk_active==750}" @click="mk_change('mk_active',750)">750</li>
                     <li :class="{active:mk_active==950}" @click="mk_change('mk_active',950)">950</li>
                     <li :class="{active:mk_active==1920}" @click="mk_change('mk_active',1920)">1920</li>
                  </ul>
                  <ul class="win_width">
                     <li :class="{active:mk1_active==0}" @click="mk_change('mk1_active',0)">所有</li>
                     <li :class="{active:mk1_active=='hd'}" @click="mk_change('mk1_active','hd')">头部</li>
                     <li :class="{active:mk1_active=='con'}" @click="mk_change('mk1_active','con')">主体</li>
                     <li :class="{active:mk1_active=='ft'}" @click="mk_change('mk1_active','ft')">尾部</li>
                  </ul>
                  <div class="tool_head">
                     <p>基础模块 <span class="fx"></span></p>
                  </div>
                  <ul class="basics">
                     <li v-for="(site,index) in basice_data">
                        <div @mousedown="mkmousedown($event,site)" @mouseup='mkmouseup($event)'>
                           <span :style="'background:url(../../static/img/'+site.icon+') no-repeat center'"></span>
                           <p>{{site.name}}</p>
                        </div>
                     </li>
                  </ul>
               </li>
               <li :class="{active:content1_active==2||content1_active==0}"></li>
               <li :class="{active:content1_active==3||content1_active==0}"></li>
               <li :class="{active:content1_active==4||content1_active==0}"></li>
            </ul>
         </div>
         <!-- 窗口显示 -->
         <div class="content_show fl pa" ref="content_show" :style="content_show">
            <!-- 窗口头部功能 -->
            <div class="con_header" ref="con_header">
               <select name="" class="fl">
                  <option value="">首页</option>
                  <option value="">宝贝详情页</option>
                  <option value="">宝贝列表页</option>
               </select>
               <ul class="fl">
                  <li :class="{active:edit_manage==1}" @click="edit_manage_fun(1)">页面编辑</li>
                  <li :class="{active:edit_manage==2}" @click="edit_manage_fun(2)">布局管理</li>
               </ul>
               <ul class="fr">
                  <li>备份</li>
                  <li>预览</li>
                  <li>发布站点</li>
               </ul>
            </div>
            <!-- 窗口主体 -->
            <div class="con_con" :style="con_con">
               <div class="html" ref="html">
                  <!-- 页面编辑窗口 -->
                  <div class="edit1" v-show="edit_manage==1">
                     <!-- 头部 -->
                     <div class="html_hd" ref="html_hd">
                        <h3 class="ts" v-if="layout_data.hd.length==0" ref="html_hd_h3">
                           页头部分，暂无功能模块
                        </h3>
                        <div v-for="(site,index) in layout_data.hd">
                           <component :is="site.name" style="margin: 0 auto 10px" :ref="'hd'+index+site.name" :dataref="'hd'+index+site.name"
                              :dataName="site.mkname" :data="site" :datamk="site.name" dataLocation1="hd" dataLocation2=""
                              dataLocation3="" :dataLocation4="index" :datalength="layout_data.hd.length-1"></component>
                        </div>
                     </div>
                     <!-- 主体 -->
                     <div class="html_con" ref="html_con">
                        <h3 class="ts" ref="html_con_h3" v-if="layout_data.con.length==0">
                           主体部分，请先进入布局管理添加单元模块
                        </h3>
                        <div v-for="(site,index) in layout_data.con">
                           <!-- left -->
                           <div id="leftEdit" class="ofh" :ref="'leftEdit'+index" v-if="site.name=='left'">
                              <div class="fl w19" :ref="'leftEdit'+index+'w19'">
                                 <h3 ref="left_w19_h3" v-if="site.w19.length==0">暂无功能模块</h3>
                                 <div v-else v-for="(site1,index1) in site.w19">
                                    <component :is="site1.name" style="margin: 0 auto 10px" :ref="'con'+index+'w19'+index1"
                                       :dataref="'con'+index+'w19'+index1" :dataName="site1.mkname" :data="site1"
                                       :datamk="site1.name" dataLocation1="con" :dataLocation2="index" dataLocation3="w19"
                                       :dataLocation4="index1" :datalength="site.w19.length-1"></component>
                                 </div>
                              </div>
                              <div class="fr w75" :ref="'leftEdit'+index+'w75'">
                                 <h3 ref="left_w75_h3" v-if="site.w75.length==0">暂无功能模块</h3>
                                 <div v-else v-for="(site1,index1) in site.w75">
                                    <component :is="site1.name" :ref="'con'+index+'w75'+index1" :dataref="'con'+index+'w75'+index1"
                                       :dataName="site1.mkname" style="margin: 0 auto 10px" :data="site1" :datamk="site1.name"
                                       dataLocation1="con" :dataLocation2="index" dataLocation3="w75" :dataLocation4="index1"
                                       :datalength="site.w75.length-1"></component>
                                 </div>
                              </div>
                           </div>
                           <!-- right -->
                           <div id="rightEdit" class="ofh" :ref="'rightEdit'+index" v-if="site.name=='right'">
                              <div class="fl w75" :ref="'rightEdit'+index+'w75'">
                                 <h3 ref="right_w75_h3" v-if="site.w75.length==0">暂无功能模块</h3>
                                 <div v-else v-for="(site1,index1) in site.w75">
                                    <component :is="site1.name" :ref="'con'+index+'w75'+index1" :dataref="'con'+index+'w75'+index1"
                                       :dataName="site1.mkname" style="margin: 0 auto 10px" :data="site1" :datamk="site1.name"
                                       dataLocation1="con" :dataLocation2="index" dataLocation3="w75" :dataLocation4="index1"
                                       :datalength="site.w75.length-1"></component>
                                 </div>
                              </div>
                              <div class="fr w19" :ref="'rightEdit'+index+'w19'">
                                 <h3 ref="right_w19_h3" v-if="site.w19.length==0">暂无功能模块</h3>
                                 <div v-else v-for="(site1,index1) in site.w19">
                                    <component :is="site1.name" :ref="'con'+index+'w19'+index1" :dataref="'con'+index+'w19'+index1"
                                       :dataName="site1.mkname" style="margin: 0 auto 10px" :data="site1" :datamk="site1.name"
                                       dataLocation1="con" :dataLocation2="index" dataLocation3="w19" :dataLocation4="index1"
                                       :datalength="site.w19.length-1"></component>
                                 </div>
                              </div>
                           </div>
                           <!-- center -->
                           <div id="centerEdit" class="ofh" :ref="'centerEdit'+index" v-if="site.name=='center'">
                              <div class="fl w1920">
                                 <h3 ref="center_w1920" v-if="site.w1920.length==0">暂无功能模块</h3>
                                 <div v-else v-for="(site1,index1) in site.w1920">
                                    <component :is="site1.name" style="margin: 0 auto 10px" :ref="'conter'+index+site1.name+index1"
                                       :dataref="'conter'+index+site1.name+index1" :dataName="site1.mkname" :data="site1"
                                       :datamk="site1.name" dataLocation1="con" :dataLocation2="index" dataLocation3="center"
                                       :dataLocation4="index1" :datalength="site.w1920.length-1"></component>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <!-- 尾部 -->
                     <div class="html_ft" ref="html_ft">
                        <h3 class="ts" ref="html_ft_h3" v-if="layout_data.ft.length==0">
                           页头部分，暂无功能模块
                        </h3>
                        <div v-for="(site,index) in layout_data.ft">
                           <component :is="site.name" style="margin: 0 auto 10px" :ref="'ft'+index+site.name" :dataref="'ft'+index+site.name"
                              :dataName="site.mkname" :data="site" :datamk="site.name" dataLocation1="ft" dataLocation2=""
                              dataLocation3="" :dataLocation4="index" :datalength="layout_data.ft.length-1"></component>
                        </div>
                     </div>
                  </div>
                  <!-- 布局管理窗口 -->
                  <div class="edit2" v-show="edit_manage==2">
                     <div>
                        <div class="layout_edit" ref="layout_edit">
                           <!-- 头部 -->
                           <div class="layout_hd" ref="layout_hd">
                              <p class="title">店铺页头</p>
                              <div class="layout_hd_con">
                                 <div v-for="(site,index) in layout_data.hd">
                                    <guanliButton :ref="'layout_hd'+index+site.name" :dataref="'layout_hd'+index+site.name"
                                       :datamkname="site.mkname" :dataName="site.name" dataLocation1="hd" dataLocation2=null
                                       dataLocation3=null :dataLocation4="index" :datalength="layout_data.hd.length-1">
                                    </guanliButton>
                                 </div>
                              </div>
                           </div>
                           <!-- 主体 -->
                           <div class="layout_con pr" ref="layout_con">
                              <!-- 单元模拟框 -->
                              <div ref="dymk" id="dymk" class="pa" :class="{dymk_active:dy_move_show==true}" :style=""></div>
                              <p class="title">主体内容</p>
                              <div class="layout_con_con pr">
                                 <div v-for="(site,index) in layout_data.con">
                                    <!-- left -->
                                    <div class="w1975  pr" :ref="'dy'+index+'left'" v-if="site.name=='left'">
                                       <div class="fl" :ref="'dy'+index+'leftw19'">
                                          <p v-if="site.w19.length==0"> 适用宽度的模块可拖入(190)</p>
                                          <div v-for="(site1,index1) in site.w19">
                                             <guanliButton :ref="'bjcon'+index+'w19'+index1" :dataref="'bjcon'+index+'w19'+index1"
                                                :datamkname="site1.mkname" :dataName="site1.name" dataLocation1="con"
                                                :dataLocation2="index" dataLocation3="w19" :dataLocation4="index1"
                                                :datalength=" site.w19.length-1">
                                             </guanliButton>
                                          </div>
                                       </div>
                                       <div class="fr" :ref="'dy'+index+'leftw75'">
                                          <p v-if="site.w75.length==0">适用宽度的模块可拖入(750)</p>
                                          <div v-for="(site1,index1) in site.w75">
                                             <guanliButton :ref="'bjcon'+index+'w75'+index1" :dataref="'bjcon'+index+'w75'+index1"
                                                :datamkname="site1.mkname" :dataName="site1.name" dataLocation1="con"
                                                :dataLocation2="index" dataLocation3="w75" :dataLocation4="index1"
                                                :datalength=" site.w75.length-1">
                                             </guanliButton>
                                          </div>
                                       </div>
                                       <div class="clear"></div>
                                       <ul>
                                          <li class="move fl" @mousedown="dymove($event,index)"></li>
                                          <li class="shezhi fl" @click.stop="layout_num=index;layout_center_choose=false;layout_choose=true;"></li>
                                          <li class="shanchu fr" @click="remove_layout(index) "></li>
                                       </ul>
                                    </div>
                                    <!-- right -->
                                    <div class="w7519  pr" :ref="'dy'+index+'right'" v-if="site.name=='right'">
                                       <div class="fl" :ref="'dy'+index+'rightw75'">
                                          <p v-if="site.w75.length==0">适用宽度的模块可拖入(750)</p>
                                          <div v-for="(site1,index1) in site.w75">
                                             <guanliButton :ref="'bjcon'+index+'w75'+index1" :dataref="'bjcon'+index+'w75'+index1"
                                                :datamkname="site1.mkname" :dataName="site1.name" dataLocation1="con"
                                                :dataLocation2="index" dataLocation3="w75" :dataLocation4="index1"
                                                :datalength=" site.w75.length-1">
                                             </guanliButton>
                                          </div>
                                       </div>
                                       <div class="fr" :ref="'dy'+index+'rightw19'">
                                          <p v-if="site.w19.length==0">适用宽度的模块可拖入(190)</p>
                                          <div v-for="(site1,index1) in site.w19">
                                             <guanliButton :ref="'bjcon'+index+'w19'+index1" :dataref="'bjcon'+index+'w19'+index1"
                                                :datamkname="site1.mkname" :dataName="site1.name" dataLocation1="con"
                                                :dataLocation2="index" dataLocation3="w19" :dataLocation4="index1"
                                                :datalength=" site.w19.length-1">
                                             </guanliButton>
                                          </div>
                                       </div>
                                       <div class="clear"></div>
                                       <ul>
                                          <li class="move fl" @mousedown="dymove($event,index)"></li>
                                          <li class="shezhi fl" @click.stop="layout_num=index;layout_center_choose=false;layout_choose=true;"></li>
                                          <li class="shanchu fr" @click="remove_layout(index)"></li>
                                       </ul>
                                    </div>
                                    <!-- center -->
                                    <div class="w1920  pr" :ref="'dy'+index+'center'" v-if="site.name=='center'">
                                       <div class="layout_body">
                                          <p v-if="site.w1920.length==0">适用宽度的模块可拖入(950/1920)</p>
                                          <div v-for="(site1,index1) in site.w1920">
                                             <guanliButton :ref="'dy'+index+'center'+index1" :dataref="'dy'+index+'center'+index1"
                                                :datamkname="site1.mkname" :dataName="site1.name" dataLocation1="con"
                                                :dataLocation2="index" dataLocation3="center" :dataLocation4="index1"
                                                :datalength=" site.w1920.length-1">
                                             </guanliButton>
                                          </div>
                                       </div>
                                       <div class="clear"></div>
                                       <ul>
                                          <li class="move fl" @mousedown="dymove($event,index)"></li>
                                          <li class="shanchu fr" @click="remove_layout(index)"></li>
                                       </ul>
                                    </div>
                                    <div id="dy_mn" v-if="site.name=='mn'"></div>
                                 </div>
                              </div>
                              <div class="new_layout" @click.stop="layout_choose=true;layout_center_choose=true">
                                 添加单元模块
                              </div>

                           </div>
                           <!-- 尾部 -->
                           <div class="layout_ft" ref="layout_ft">
                              <p class="title">店铺页尾</p>
                              <div class="layout_ft_con">
                                 <div v-for="(site,index) in layout_data.ft">
                                    <guanliButton :ref="'layout_ft'+index+site.name" :dataref="'layout_ft'+index+site.name"
                                       :datamkname="site.mkname" :dataName="site.name" dataLocation1="ft" dataLocation2=null
                                       dataLocation3=null :dataLocation4="index" :datalength="layout_data.ft.length-1">
                                    </guanliButton>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <!-- 添加布局单元 -->
      <div class="layout_choose pa" ref="layout_choose" v-show="layout_choose==true">
         <div class="title">
            <span>添加布局单元模块</span>
            <span class="gb fr" @click="layout_choose=false">关闭</span>
         </div>
         <div class="layout_content">
            <p class="fr">像素：px</p>
            <ul>
               <li class="w1975" @click="layout_choose_fun('left')">
                  <div class="clear"></div>
                  <div class="w75 fr">750</div>
                  <div class="w19 fl">190</div>
               </li>
               <li class="w7519" @click="layout_choose_fun('right')">
                  <div class="clear"></div>
                  <div class="w75 fl">750</div>
                  <div class="w19 fr">190</div>
               </li>
               <li v-if="layout_center_choose==true" class="w9519" @click="layout_choose_fun('center')">
                  <div class="clear"></div>
                  <div class="w95">950/1920</div>
               </li>
            </ul>
            <div class="clear"></div>
         </div>
      </div>
      <!-- 模块模拟框 -->

      <div ref="mkmk" id="mkmk" class="pa" v-if="mk_move_xy.display" :style="mk_move_xy.xy" @mouseup="bjmkmouseup($event)">
         {{layout_data_mk.mkname}}
      </div>
      <!-- 模块编辑框 -->
      <div class="mokuai_mask" v-if="edit_mk_data.type">
        
         <component :is="edit_mk_data.datamk+'_type'"></component>
      </div>

   </div>
</template>
<script>

   // vuex存储
   import { mapState, mapActions } from 'vuex'
   // 静态资源
   import Mokuai from '../assets/js/data.js';
   // 页面编辑页组件
   import mk from './mokuai/mk'//提示模块
   import mk1 from './mokuai/mk1'//功能模块
   import mk1_type from './mokuai/mk1_type'//功能模块
   import mk2 from './mokuai/mk2'//功能模块
   import mk3 from './mokuai/mk3'//功能模块
   import mk4 from './mokuai/mk4'//功能模块
   import mk5 from './mokuai/mk5'//功能模块
   import mk6 from './mokuai/mk6'//功能模块
   import mk7 from './mokuai/mk7'//功能模块
    import mk7_type from './mokuai/mk7_type'//功能模块
   import mk8 from './mokuai/mk8'//功能模块
   import mk9 from './mokuai/mk9'//功能模块
   import mk10 from './mokuai/mk10'//功能模块
   import mk11 from './mokuai/mk11'//功能模块
   import mk12 from './mokuai/mk12'//功能模块
   import mk13 from './mokuai/mk13'//功能模块
   import mk14 from './mokuai/mk14'//功能模块
   import mk15 from './mokuai/mk15'//功能模块
   import mk16 from './mokuai/mk16'//功能模块
   import mk17 from './mokuai/mk17'//功能模块
   import mk18 from './mokuai/mk18'//功能模块
   import mk19 from './mokuai/mk19'//功能模块
   import mk20 from './mokuai/mk20'//功能模块
   import mk21 from './mokuai/mk21'//功能模块
   import mk22 from './mokuai/mk22'//功能模块
   // 布局管理页组件
   import guanliButton from './mokuai/mkbutton/guanliButton'//功能模块
   export default {
      // 组件名
      name: 'index',
      components: {
         // 页面编辑页组件
         mk,
         mk1,
         mk1_type,
         mk2,
         mk3,
         mk4,
         mk5,
         mk6,
         mk7,
         mk7_type,
         mk8,
         mk9,
         mk10,
         mk11,
         mk12,
         mk13,
         mk14,
         mk15,
         mk16,
         mk17,
         mk18,
         mk19,
         mk20,
         mk21,
         mk22,
         // 布局管理页组件
         guanliButton,
      },
      // 原始数据
      data: function () {
         // console.log(123)
         return {
            header_active: 1,//切换PC或手机页面
            content_height: {
               height: "",
            },
            content_show: {
               height: "",
               width: ""
            },
            con_con: {
               height: ""
            },
            // first: 0,
            content1_active: 1,//功能板块按钮
            mk_active: 0,//模块尺寸选择
            mk1_active: 0,//模块类型选择
            edit_manage: 1,//页面编辑及布局切换
            basice_data: [],//保存筛选出的基本模块数据
            layout_choose: false,//布局单元模块显示或隐藏
            layout_center_choose: true,//是否显示center单元
            layout_num: "",// 当前单元的序列
            mksite: {},//模块位置参数
            hintsite: "",// 提示框位置参数
            dysite: null,//单元位置序列
            dy_hint_site: null,//单元提示框位置序列
            dy_data: {},
            dy_type: false,
            mk_type: null,
            mk_move_xy: {
               xy: {},
               display: false
            },
            // 布局管理是否显示
            dy_move_show: false,
            // 
         }
      },
      computed: mapState({
         layout_data: state => state.layout_data,//模块数据
         html_xy: state => state.html_xy,//页面编辑页模块坐标
         layout_xy: state => state.layout_xy,//布局管理页模块坐标
         layout_data_mk: state => state.layout_data_mk,//当前移动模块的数据
         layout_data_mk_xy: state => state.layout_data_mk_xy,//当前移动模块的起始位置
         layout_data_mk_move_xy: state => state.layout_data_mk_move_xy,//当前移动模块的移动轨迹
         layout_data_mk_site: state => state.layout_data_mk_site,//当前模块的位置信息
         edit_mk_data: state => state.edit_mk_data//编辑模块数据
      }),
      watch: {
         // 所有模块数据
         layout_data: {
            handler(newName, oldName) {
               var that = this
               localStorage.layoutData = JSON.stringify(newName)
               // localStorage.layoutData = ""
            },
            deep: true,
         },
         // 模块位置信息
         layout_data_mk_site: {
            handler(newName, oldName) {
               var that = this
               // 获取坐标
               for (var i = 0; i < Mokuai.basice_data.length; i++) {
                  // 循环获取模块信息
                  if (Mokuai.basice_data[i].name == newName.mkname) {
                     that.mk_type = Mokuai.basice_data[i]
                     break
                  }
               }
            },
            deep: true,
         },
         // 首次获取要移动的模块的坐标（按下事件）
         layout_data_mk_xy: {
            handler(newName, oldName) {
               // 按下删除模块
               // 获取模块坐标
               // 放置临时模块
               var that = this
               var dispatch = this.$store.dispatch
               // 按下删除模块
               var delmk = function () {
                  dispatch({
                     type: 'del_layout_mk_ac',
                     data: that.layout_data_mk_site,
                  })
                  return Promise.resolve("删除模块")
               }
               delmk().then(val => {
                  // 获取模块坐标
                  that.$nextTick(() => {
                     that.getGuanli_xy()
                     // return Promise.resolve("获取坐标")
                     // 放置临时模块
                     // 跟随鼠标的临时模块
                     that.mk_move_xy = newName
                     // 如果提示框存在则删除临时模块
                     if (that.hintsite) {
                        dispatch({
                           type: 'del_hint_mk_ac',
                           data: that.hintsite,
                        })
                     }
                     // 临时模块的路径信息
                     that.hintsite = {}
                     // 获取要放置位置的路径信息
                     that.mksite = {}
                     // 获取要添加模块的路径位置 将为mksite复制
                     that.setGuanli_mk(newName.xy.x, newName.xy.y, that.mk_type)
                     // 赋值
                     that.hintsite = {
                        name: "mk",
                        mkname: that.mksite.mkname,
                        location1: that.mksite.location1,
                        location2: that.mksite.location2,
                        location3: that.mksite.location3,
                        location4: that.mksite.location4,
                     }
                     dispatch({
                        type: 'setEdit_mk_ac',
                        data: that.hintsite,
                     })
                  })
               })


            },
            deep: true,
         },
         // 获取移动的模块的坐标（移动事件）
         layout_data_mk_move_xy: {
            handler(newName, oldName) {
               var that = this
               var dispatch = this.$store.dispatch
               // 移动  跟随鼠标移动的框
               that.mk_move_xy = newName
               // 如果提示框存在则删除临时模块
               if (that.hintsite) {
                  dispatch({
                     type: 'del_hint_mk_ac',
                     data: that.hintsite,
                  })
               }
               // 临时模块的路径信息
               that.hintsite = {}
               // 获取要放置位置的路径信息
               that.mksite = {}
               // 获取要添加模块的路径位置 将为mksite复制
               that.setGuanli_mk(newName.xy.x, newName.xy.y, that.mk_type)
               // 赋值
               that.hintsite = {
                  name: "mk",
                  mkname: that.mksite.mkname,
                  location1: that.mksite.location1,
                  location2: that.mksite.location2,
                  location3: that.mksite.location3,
                  location4: that.mksite.location4,
               }
               dispatch({
                  type: 'setEdit_mk_ac',
                  data: that.hintsite,
               })
            },
            deep: true,
         },
      },
      mounted: function () {
         var that = this;
         if (localStorage.layoutData) {
            var dispatch = this.$store.dispatch
            var data = JSON.parse(localStorage.layoutData)
            dispatch({
               type: "setlocalStorage_layout_data_ac",
               data: data
            })
         }
         // console.log(localStorage.lastname)
         //保存筛选出的基本模块数据
         that.basice_data = Mokuai.basice_data
         // 设置元素的content的高度
         function cont_height() {
            let windowHeight = Math.floor(window.innerHeight) // 获取window的高度
            let windowWidth = document.body.clientWidth// 获取window的宽度
            let header1 = Math.floor(that.$refs.header.offsetHeight)// 获取头部高度
            let fun_area = Math.floor(that.$refs.fun_area.offsetWidth)//获取侧边栏宽度
            let fun_piece = Math.floor(that.$refs.fun_piece.offsetWidth)//获取功能栏宽度
            let con_header_height = Math.floor(that.$refs.con_header.offsetHeight)// 获取内容头部的高度
            that.content_height.height = Math.floor(windowHeight - header1) + "px"  // 设置主体部分的高度
            that.content_show.height = Math.floor(windowHeight - header1) + "px"//设置主体窗口高度
            if (that.content1_active == 0) {
               that.content_show.width = Math.floor(windowWidth - 70) + "px"//设置主体窗口宽度
            } else {
               that.content_show.width = Math.floor(windowWidth - 70 - 230) + "px"//设置主体窗口宽度
            }
            that.con_con.height = Math.floor(windowHeight - header1 - con_header_height) + "px"
         }
         cont_height()
         window.onresize = function () {
            cont_height()
         }
         // 点击其他位置关闭弹窗
         document.addEventListener('click', function (e) {
            if (that.$refs.layout_choose) {
               if (!that.$refs.layout_choose.contains(e.target)) {
                  that.layout_choose = false;
               }
            }
         });

      },
      methods: {
         // 
         edit_manage_fun(num) {
            var that = this
            that.edit_manage = num
            var dispatch = this.$store.dispatch
            dispatch({
               type: "edit_manage_ac",
               data: num
            })
         },
         // 左侧工具栏的显示或隐藏
         content1_active_fun(num) {
            var that = this
            let windowWidth = that.$refs.header.offsetWidth// 获取window的宽度
            if (num == that.content1_active || num == 0) {
               that.content1_active = 0
               that.content_show.width = Math.floor(windowWidth - 70) + "px"//设置主体窗口宽度
            } else {
               that.content1_active = num
               that.content_show.width = Math.floor(windowWidth - 300) + "px"//设置主体窗口宽度

            }
         },
         // 模块筛选显示
         mk_change(name, num) {
            var that = this
            // 设置状态值
            if (name == "mk_active") {
               that.mk_active = num
            }
            // 设置状态值
            if (name == "mk1_active") {
               that.mk1_active = num
            }
            // 清空模块数据列表
            that.basice_data = []
            // 设置模块数据列表
            if (that.mk_active == 0 && that.mk1_active == 0) {
               that.basice_data = Mokuai.basice_data
               return
            }
            // 当尺寸为全部时
            if (that.mk_active == 0) {
               // 循环所有模块数据列表
               for (var i = 0; i < Mokuai.basice_data.length; i++) {
                  // 循环模块中的区域属性
                  for (var o = 0; o < Mokuai.basice_data[i].type.length; o++) {
                     // 判断模块区域是否相同
                     if (that.mk1_active == Mokuai.basice_data[i].type[o]) {
                        that.basice_data.push(Mokuai.basice_data[i])
                     }
                  }
               }
               return
            }
            // 当区域为全部时
            if (that.mk1_active == 0) {
               // 循环所有模块数据列表
               for (var i = 0; i < Mokuai.basice_data.length; i++) {
                  // 循环模块的宽度属性
                  for (var o = 0; o < Mokuai.basice_data[i].width.length; o++) {
                     // 判断模块宽度是否相同
                     if (that.mk_active == Mokuai.basice_data[i].width[o]) {
                        // 设置模块数据
                        that.basice_data.push(Mokuai.basice_data[i])
                     }
                  }
               }
               return
            }
            // 循环所有模块数据列表
            for (var i = 0; i < Mokuai.basice_data.length; i++) {
               // 循环模块的区域属性
               for (var o = 0; o < Mokuai.basice_data[i].type.length; o++) {
                  // 如果区域相同
                  if (that.mk1_active == Mokuai.basice_data[i].type[o]) {
                     // 循环宽度属性
                     for (var p = 0; p < Mokuai.basice_data[i].width.length; p++) {
                        // 如果宽度属性相同
                        if (that.mk_active == Mokuai.basice_data[i].width[p]) {
                           // 设置模块数据
                           that.basice_data.push(Mokuai.basice_data[i])
                        }
                     }
                  }
               }
            }
         },
         // 点击添加单元模块
         layout_choose_fun(num) {
            var that = this
            var dispatch = this.$store.dispatch
            var data = {
               name: num,
            }
            if (that.layout_center_choose) {
               dispatch({
                  type: 'layout_xy_choose_ac',
                  data: data,
               })
               that.layout_choose = false
            } else {
               var data = {
                  name: num,
                  num: that.layout_num
               }
               dispatch({
                  type: 'layout_data_change_ac',
                  data: data,
               })
               that.layout_choose = false
            }
         },
         // 点击删除单元格
         remove_layout(num) {
            var dispatch = this.$store.dispatch
            dispatch({
               type: "remove_layout_ac",
               data: num,
            })
            return Promise.resolve("删除单元")
         },
         // 模块移动功能
         mkmousedown(event, site) {
            var that = this
            var dispatch = this.$store.dispatch
            // 判断是否为div元素
            if (event.target.localName != "div") {
               // 获取div元素
               var _target = event.currentTarget

            } else {
               // 获取div元素
               var _target = event.target
            }
            // 设置层叠
            _target.style.zIndex = 10;
            // 获取当前鼠标位置x
            var startx = event.clientX;
            // 获取当前鼠标位置y
            var starty = event.clientY;
            // 获取页面编辑的坐标
            if (that.edit_manage == "1") {
               that.getEdit_xy()
               that.hintsite = ""

            }
            // 获取布局管理中的坐标
            if (that.edit_manage == "2") {
               that.getGuanli_xy()
            }
            // 鼠标移动事件
            document.onmousemove = function (ev) {
               // 获取对象
               var event = ev || window.event;
               // 获取位移量x=当前位置x-开始位置x
               var endx = event.clientX - startx;
               // 获取位移量y=当前位置y-开始位置y
               var endy = event.clientY - starty;
               // 设置位移位置x
               _target.style.left = Math.floor(endx) + 'px';
               // 设置位移位置y
               _target.style.top = Math.floor(endy) + 'px';
               // 鼠标移动显示模块可放入的位置
               if (that.edit_manage == "1") {
                  // 如果提示框存在则删除
                  if (that.hintsite) {
                     dispatch({
                        type: 'del_hint_mk_ac',
                        data: that.hintsite,
                     })
                  }
                  that.hintsite = {}
                  that.mksite = {}
                  // 鼠标移动显示模块可放置区域
                  that.setEdit_mk(event.clientX, event.clientY, site)
                  // 在相应位置添加提示框
                  that.hintsite = that.mksite
                  that.hintsite = {
                     name: "mk",
                     mkname: that.mksite.mkname,
                     location1: that.mksite.location1,
                     location2: that.mksite.location2,
                     location3: that.mksite.location3,
                     location4: that.mksite.location4,
                  }
                  dispatch({
                     type: 'setEdit_mk_ac',
                     data: that.hintsite,
                  })
               }
               if (that.edit_manage == "2") {
                  // 如果提示框存在则删除
                  if (that.hintsite) {
                     dispatch({
                        type: 'del_hint_mk_ac',
                        data: that.hintsite,
                     })
                  }
                  that.hintsite = {}
                  that.mksite = {}
                  // 设置布局管理模块
                  that.setGuanli_mk(event.clientX, event.clientY, site)
                  // 在相应位置添加提示框
                  that.hintsite = that.mksite
                  that.hintsite = {
                     name: "mk",
                     mkname: that.mksite.mkname,
                     location1: that.mksite.location1,
                     location2: that.mksite.location2,
                     location3: that.mksite.location3,
                     location4: that.mksite.location4,
                  }
                  dispatch({
                     type: 'setEdit_mk_ac',
                     data: that.hintsite,
                  })
               }
            }
         },
         // 鼠标松开
         mkmouseup: function (event) {
            var that = this
            var dispatch = this.$store.dispatch
            // 判断是否为div元素
            if (event.target.localName != "div") {
               // 获取div元素
               var _target = event.currentTarget
            } else {
               // 获取div元素
               var _target = event.target
            }
            // 鼠标松开将模块添加到对应位置
            // if (that.edit_manage == "1") {
            // 如果提示框存在则删除
            if (that.hintsite) {
               dispatch({
                  type: 'del_hint_mk_ac',
                  data: that.hintsite,
               })
            }
            that.hintsite = ""
            dispatch({
               type: 'setEdit_mk_ac',
               data: that.mksite,
            })
            // }

            // 回到位置x
            _target.style.left = 0 + 'px';
            // 回到位置y
            _target.style.top = 0 + 'px';
            // 设置层叠
            _target.style.zIndex = 1;
            // 移出鼠标事件
            document.onmousemove = null;
         },
         // save_localStorage() {
         //    var that = this
         //    localStorage.layoutData = JSON.stringify(that.layout_data)

         // },
         // 获取页面编辑中的xy坐标 
         getEdit_xy() {
            var that = this
            // 获取已有元素的坐标
            var html_xy = {
               //视窗范围
               xy: {
                  left: that.$refs.html.getBoundingClientRect().left,
                  right: that.$refs.html.getBoundingClientRect().right,
                  top: that.$refs.html.getBoundingClientRect().top,
                  bottom: that.$refs.html.getBoundingClientRect().bottom,
               },
               // 头部
               hd: {
                  //头部范围
                  xy: {
                     left: that.$refs.html_hd.getBoundingClientRect().left,
                     right: that.$refs.html_hd.getBoundingClientRect().right,
                     top: that.$refs.html_hd.getBoundingClientRect().top,
                     bottom: that.$refs.html_hd.getBoundingClientRect().bottom,
                  },
                  // 头部模块列表
                  mk: [],
                  // 当没有模块时的h3坐标
                  h3: {}
               },
               // 主体
               con: {
                  // 主体范围
                  xy: {
                     left: that.$refs.html_con.getBoundingClientRect().left,
                     right: that.$refs.html_con.getBoundingClientRect().right,
                     top: that.$refs.html_con.getBoundingClientRect().top,
                     bottom: that.$refs.html_con.getBoundingClientRect().bottom,
                  },
                  // 主体单元列表
                  dy: [],
               },
               // 尾部
               ft: {
                  // 尾部范围
                  xy: {
                     left: that.$refs.html_ft.getBoundingClientRect().left,
                     right: that.$refs.html_ft.getBoundingClientRect().right,
                     top: that.$refs.html_ft.getBoundingClientRect().top,
                     bottom: that.$refs.html_ft.getBoundingClientRect().bottom,
                  },
                  // 尾部模块列表
                  mk: [],
                  // 当没有模块时的h3坐标
                  h3: {}
               },
            }
            // 获取头部模块坐标
            // 有模块
            if (that.layout_data.hd.length > 0) {
               for (var i = 0; i < that.layout_data.hd.length; i++) {
                  var ref = "hd" + i + that.layout_data.hd[i].name
                  var data = {
                     name: that.layout_data.hd[i].name,
                     xy: {
                        left: that.$refs[ref][0].$refs[ref].getBoundingClientRect().left,
                        right: that.$refs[ref][0].$refs[ref].getBoundingClientRect().right,
                        top: that.$refs[ref][0].$refs[ref].getBoundingClientRect().top,
                        bottom: that.$refs[ref][0].$refs[ref].getBoundingClientRect().bottom,
                     }
                  }
                  html_xy.hd.mk.push(data)
               }
            }
            // 当头部没有模块时
            else {
               html_xy.hd.h3 = {
                  xy: {
                     left: that.$refs.html_hd_h3.getBoundingClientRect().left,
                     right: that.$refs.html_hd_h3.getBoundingClientRect().right,
                     top: that.$refs.html_hd_h3.getBoundingClientRect().top,
                     bottom: that.$refs.html_hd_h3.getBoundingClientRect().bottom,
                  }
               }
            }
            // 获取尾部模块坐标
            // 有模块
            if (that.layout_data.ft.length > 0) {
               for (var i = 0; i < that.layout_data.ft.length; i++) {
                  var ref = "ft" + i + that.layout_data.ft[i].name
                  var data = {
                     name: that.layout_data.ft[i].name,
                     xy: {
                        left: that.$refs[ref][0].$refs[ref].getBoundingClientRect().left,
                        right: that.$refs[ref][0].$refs[ref].getBoundingClientRect().right,
                        top: that.$refs[ref][0].$refs[ref].getBoundingClientRect().top,
                        bottom: that.$refs[ref][0].$refs[ref].getBoundingClientRect().bottom,
                     }
                  }
                  html_xy.ft.mk.push(data)
               }
            }
            // 当头部没有模块时
            else {
               html_xy.ft.h3 = {
                  xy: {
                     left: that.$refs.html_ft_h3.getBoundingClientRect().left,
                     right: that.$refs.html_ft_h3.getBoundingClientRect().right,
                     top: that.$refs.html_ft_h3.getBoundingClientRect().top,
                     bottom: that.$refs.html_ft_h3.getBoundingClientRect().bottom,
                  }
               }
            }
            // 获取内容坐标
            // 有布局单元
            if (that.layout_data.con.length > 0) {
               // 获取单元格坐标
               for (var i = 0; i < that.layout_data.con.length; i++) {
                  // 单元名同时也是单元的ref值
                  var name = that.layout_data.con[i].name + "Edit" + i;
                  // 如果不是center
                  if (that.layout_data.con[i].name != "center") {
                     // 单元内子单元名同时也是子单元的ref值
                     var w19 = name + "w19";
                     // 单元内子单元名同时也是子单元的ref值
                     var w75 = name + "w75";
                     // 单元坐标数据
                     var data = {
                        // 单元名
                        name: name,
                        // 单元坐标
                        xy: {
                           left: that.$refs[name][0].getBoundingClientRect().left,
                           right: that.$refs[name][0].getBoundingClientRect().right,
                           top: that.$refs[name][0].getBoundingClientRect().top,
                           bottom: that.$refs[name][0].getBoundingClientRect().bottom,
                        },
                        // 子单元坐标
                        w19: {
                           name: w19,
                           xy: {
                              left: that.$refs[w19][0].getBoundingClientRect().left,
                              right: that.$refs[w19][0].getBoundingClientRect().right,
                              top: that.$refs[w19][0].getBoundingClientRect().top,
                              bottom: that.$refs[w19][0].getBoundingClientRect().bottom,
                           },
                           // 子单元中模块坐标列表
                           mk: [],
                           // 当没有模块时的h3坐标
                           h3: {}
                        },
                        w75: {
                           name: w75,
                           xy: {
                              left: that.$refs[w75][0].getBoundingClientRect().left,
                              right: that.$refs[w75][0].getBoundingClientRect().right,
                              top: that.$refs[w75][0].getBoundingClientRect().top,
                              bottom: that.$refs[w75][0].getBoundingClientRect().bottom,
                           },
                           mk: [],
                           // 当没有模块时的h3坐标
                           h3: {}

                        }
                     };
                     // 如果没有模块时
                     // 获取w19的坐标
                     if (that.layout_data.con[i].w19.length == 0) {
                        data.w19.h3 = {
                           xy: {
                              left: that.$refs[that.layout_data.con[i].name + "_w19_h3"][0].getBoundingClientRect().left,
                              right: that.$refs[that.layout_data.con[i].name + "_w19_h3"][0].getBoundingClientRect().right,
                              top: that.$refs[that.layout_data.con[i].name + "_w19_h3"][0].getBoundingClientRect().top,
                              bottom: that.$refs[that.layout_data.con[i].name + "_w19_h3"][0].getBoundingClientRect().bottom,
                           }
                        }
                     }
                     // 获取w19中模块的坐标
                     else {
                        for (var o = 0; o < that.layout_data.con[i].w19.length; o++) {
                           var ref = "con" + i + "w19" + o
                           var data1 = {
                              name: that.layout_data.con[i].w19[0].name,
                              xy: {
                                 left: that.$refs[ref][0].$refs[ref].getBoundingClientRect().left,
                                 right: that.$refs[ref][0].$refs[ref].getBoundingClientRect().right,
                                 top: that.$refs[ref][0].$refs[ref].getBoundingClientRect().top,
                                 bottom: that.$refs[ref][0].$refs[ref].getBoundingClientRect().bottom,
                              }
                           }
                           data.w19.mk.push(data1)
                        }
                     }
                     // 获取w75中h3的坐标
                     if (that.layout_data.con[i].w75.length == 0) {
                        data.w75.h3 = {
                           xy: {
                              left: that.$refs[that.layout_data.con[i].name + "_w75_h3"][0].getBoundingClientRect().left,
                              right: that.$refs[that.layout_data.con[i].name + "_w75_h3"][0].getBoundingClientRect().right,
                              top: that.$refs[that.layout_data.con[i].name + "_w75_h3"][0].getBoundingClientRect().top,
                              bottom: that.$refs[that.layout_data.con[i].name + "_w75_h3"][0].getBoundingClientRect().bottom,
                           }
                        }
                     }
                     // 获取w75中的模块的数据
                     else {
                        for (var o = 0; o < that.layout_data.con[i].w75.length; o++) {
                           var ref = "con" + i + "w75" + o
                           var data1 = {
                              name: that.layout_data.con[i].w75[0].name,
                              xy: {
                                 left: that.$refs[ref][0].$refs[ref].getBoundingClientRect().left,
                                 right: that.$refs[ref][0].$refs[ref].getBoundingClientRect().right,
                                 top: that.$refs[ref][0].$refs[ref].getBoundingClientRect().top,
                                 bottom: that.$refs[ref][0].$refs[ref].getBoundingClientRect().bottom,
                              }
                           }
                           data.w75.mk.push(data1)
                        }
                     }
                  }
                  // 添加布局单元center坐标
                  else {
                     // console.log("添加center模块")
                     // var name = that.layout_data.con[i].name + "Edit" + i;
                     var data = {
                        name: name,
                        xy: {
                           left: that.$refs[name][0].getBoundingClientRect().left,
                           right: that.$refs[name][0].getBoundingClientRect().right,
                           top: that.$refs[name][0].getBoundingClientRect().top,
                           bottom: that.$refs[name][0].getBoundingClientRect().bottom,
                        },
                        mk: [],
                        h3: {}
                     }
                     // 如果center中没有模块时
                     if (that.layout_data.con[i].w1920.length == 0) {
                        data.h3 = {
                           xy: {
                              left: that.$refs["center_w1920"][0].getBoundingClientRect().left,
                              right: that.$refs["center_w1920"][0].getBoundingClientRect().right,
                              top: that.$refs["center_w1920"][0].getBoundingClientRect().top,
                              bottom: that.$refs["center_w1920"][0].getBoundingClientRect().bottom,
                           }
                        }
                     }
                     // center中有模块时
                     else {
                        // 循环center中的模块获取坐标
                        for (var o = 0; o < that.layout_data.con[i].w1920.length; o++) {
                           var ref = "conter" + i + that.layout_data.con[i].w1920[o].name + o
                           var data1 = {
                              name: that.layout_data.con[i].w1920[o].name,
                              xy: {
                                 left: that.$refs[ref][0].$refs[ref].getBoundingClientRect().left,
                                 right: that.$refs[ref][0].$refs[ref].getBoundingClientRect().right,
                                 top: that.$refs[ref][0].$refs[ref].getBoundingClientRect().top,
                                 bottom: that.$refs[ref][0].$refs[ref].getBoundingClientRect().bottom,
                              }
                           }
                           data.mk.push(data1)
                        }
                     }
                  }
                  html_xy.con.dy.push(data)
               }
            }
            // 没有布局单元
            else {
               // console.log("没有单元")

            }
            var dispatch = this.$store.dispatch
            dispatch({
               type: 'getEdit_xy_ac',
               data: html_xy,
            })
         },
         // 获取布局管理中的xy坐标
         getGuanli_xy() {
            var that = this
            var layout_xy = {
               xy: {
                  left: that.$refs.layout_edit.getBoundingClientRect().left,
                  right: that.$refs.layout_edit.getBoundingClientRect().right,
                  top: that.$refs.layout_edit.getBoundingClientRect().top,
                  bottom: that.$refs.layout_edit.getBoundingClientRect().bottom,
               },
               hd: {
                  xy: {
                     left: that.$refs.layout_hd.getBoundingClientRect().left,
                     right: that.$refs.layout_hd.getBoundingClientRect().right,
                     top: that.$refs.layout_hd.getBoundingClientRect().top,
                     bottom: that.$refs.layout_hd.getBoundingClientRect().bottom,
                  },
                  mk: [],
               },
               con: {
                  xy: {
                     left: that.$refs.layout_con.getBoundingClientRect().left,
                     right: that.$refs.layout_con.getBoundingClientRect().right,
                     top: that.$refs.layout_con.getBoundingClientRect().top,
                     bottom: that.$refs.layout_con.getBoundingClientRect().bottom,
                  },
                  dy: [],
               },
               ft: {
                  xy: {
                     left: that.$refs.layout_ft.getBoundingClientRect().left,
                     right: that.$refs.layout_ft.getBoundingClientRect().right,
                     top: that.$refs.layout_ft.getBoundingClientRect().top,
                     bottom: that.$refs.layout_ft.getBoundingClientRect().bottom,
                  },
                  mk: [],
               },
            }
            // 如果头部有模块
            if (that.layout_data.hd.length > 0) {
               for (var i = 0; i < that.layout_data.hd.length; i++) {
                  var ref = "layout_hd" + i + that.layout_data.hd[i].name

                  var data = {
                     name: that.layout_data.hd[i].name,
                     xy: {
                        left: that.$refs[ref][0].$refs[ref].getBoundingClientRect().left,
                        right: that.$refs[ref][0].$refs[ref].getBoundingClientRect().right,
                        top: that.$refs[ref][0].$refs[ref].getBoundingClientRect().top,
                        bottom: that.$refs[ref][0].$refs[ref].getBoundingClientRect().bottom,
                     }
                  }
                  layout_xy.hd.mk.push(data)
               }
            }
            // 如果尾部有模块
            if (that.layout_data.ft.length > 0) {
               for (var i = 0; i < that.layout_data.ft.length; i++) {
                  var ref = "layout_ft" + i + that.layout_data.ft[i].name
                  var data = {
                     name: that.layout_data.ft[i].name,
                     xy: {
                        left: that.$refs[ref][0].$refs[ref].getBoundingClientRect().left,
                        right: that.$refs[ref][0].$refs[ref].getBoundingClientRect().right,
                        top: that.$refs[ref][0].$refs[ref].getBoundingClientRect().top,
                        bottom: that.$refs[ref][0].$refs[ref].getBoundingClientRect().bottom,
                     }
                  }
                  layout_xy.ft.mk.push(data)
               }
            }
            // 如果主体有布局模块
            if (that.layout_data.con.length > 0) {
               for (var i = 0; i < that.layout_data.con.length; i++) {
                  // 单元名同时也是ref名
                  var name = "dy" + i + that.layout_data.con[i].name

                  // 如果不是center
                  if (that.layout_data.con[i].name != "center") {
                     var w19 = name + "w19";
                     var w75 = name + "w75";
                     var data = {
                        name: name,
                        xy: {
                           left: that.$refs[name][0].getBoundingClientRect().left,
                           right: that.$refs[name][0].getBoundingClientRect().right,
                           top: that.$refs[name][0].getBoundingClientRect().top,
                           bottom: that.$refs[name][0].getBoundingClientRect().bottom,
                        },
                        w19: {
                           name: w19,
                           xy: {
                              left: that.$refs[w19][0].getBoundingClientRect().left,
                              right: that.$refs[w19][0].getBoundingClientRect().right,
                              top: that.$refs[w19][0].getBoundingClientRect().top,
                              bottom: that.$refs[w19][0].getBoundingClientRect().bottom,
                           },
                           // 子单元中模块坐标列表
                           mk: [],
                        },
                        w75: {
                           name: w75,
                           xy: {
                              left: that.$refs[w75][0].getBoundingClientRect().left,
                              right: that.$refs[w75][0].getBoundingClientRect().right,
                              top: that.$refs[w75][0].getBoundingClientRect().top,
                              bottom: that.$refs[w75][0].getBoundingClientRect().bottom,
                           },
                           // 子单元中模块坐标列表
                           mk: [],
                        },
                     };
                     // 如果在w19中有数据时
                     if (that.layout_data.con[i].w19.length > 0) {
                        for (var o = 0; o < that.layout_data.con[i].w19.length; o++) {
                           var ref = "bjcon" + i + "w19" + o
                           var data1 = {
                              name: that.layout_data.con[i].w19[o].name,
                              xy: {
                                 left: that.$refs[ref][0].$refs[ref].getBoundingClientRect().left,
                                 right: that.$refs[ref][0].$refs[ref].getBoundingClientRect().right,
                                 top: that.$refs[ref][0].$refs[ref].getBoundingClientRect().top,
                                 bottom: that.$refs[ref][0].$refs[ref].getBoundingClientRect().bottom,
                              }
                           }
                           data.w19.mk.push(data1)
                        }
                     }
                     // 如果在w75中有数据时
                     if (that.layout_data.con[i].w75.length > 0) {
                        for (var o = 0; o < that.layout_data.con[i].w75.length; o++) {
                           var ref = "bjcon" + i + "w75" + o
                           var data1 = {
                              name: that.layout_data.con[i].w75[o].name,
                              xy: {
                                 left: that.$refs[ref][0].$refs[ref].getBoundingClientRect().left,
                                 right: that.$refs[ref][0].$refs[ref].getBoundingClientRect().right,
                                 top: that.$refs[ref][0].$refs[ref].getBoundingClientRect().top,
                                 bottom: that.$refs[ref][0].$refs[ref].getBoundingClientRect().bottom,
                              }
                           }
                           data.w75.mk.push(data1)
                        }
                     }
                  }
                  // 如果是中
                  else {
                     var data = {
                        name: name,
                        xy: {
                           left: that.$refs[name][0].getBoundingClientRect().left,
                           right: that.$refs[name][0].getBoundingClientRect().right,
                           top: that.$refs[name][0].getBoundingClientRect().top,
                           bottom: that.$refs[name][0].getBoundingClientRect().bottom,
                        },
                        mk: [],
                     }
                     for (var o = 0; o < that.layout_data.con[i].w1920.length; o++) {
                        var ref = "dy" + i + "center" + o
                        var data1 = {
                           name: that.layout_data.con[i].w1920[o].name,
                           xy: {
                              left: that.$refs[ref][0].$refs[ref].getBoundingClientRect().left,
                              right: that.$refs[ref][0].$refs[ref].getBoundingClientRect().right,
                              top: that.$refs[ref][0].$refs[ref].getBoundingClientRect().top,
                              bottom: that.$refs[ref][0].$refs[ref].getBoundingClientRect().bottom,
                           }
                        }
                        data.mk.push(data1)
                     }
                  }
                  layout_xy.con.dy.push(data)
               }

            }
            var dispatch = this.$store.dispatch
            dispatch({
               type: 'getGuanli_xy_ac',
               data: layout_xy,
            })
            return Promise.resolve("获取坐标")
         },
         // 鼠标移动显示模块可放入的位置
         setEdit_mk(mouseX, mouseY, site) {
            var that = this
            var mk = site.com
            var mkname = site.name
            // console.log(mkname)
            var dispatch = this.$store.dispatch
            var goOn = false
            // 当前鼠标位置与元素为位置进行对比
            // 不在合理范围内
            if (mouseX < that.html_xy.xy.left ||
               mouseX > that.html_xy.xy.right ||
               mouseY < that.html_xy.xy.top ||
               mouseY > that.html_xy.xy.bottom) {
               return
            }
            // 在合理范围内
            // 对比位置
            // 在头部**************************************************
            if (mouseX > that.html_xy.hd.xy.left &&
               mouseX < that.html_xy.hd.xy.right &&
               mouseY > that.html_xy.hd.xy.top &&
               mouseY < that.html_xy.hd.xy.bottom) {
               // 判断元素是否可放置在头部
               for (var i = 0; i < site.type.length; i++) {
                  if (site.type[i] == "hd") {
                     goOn = true
                     break
                  } else {
                     goOn = false

                  }
               }
               // 判断是否可放置
               if (!goOn) { return }
               // 当头部没有模块时
               if (that.layout_data.hd.length == 0) {
                  // 放在提示块中才能放入
                  if (mouseX > that.html_xy.hd.h3.xy.left &&
                     mouseX < that.html_xy.hd.h3.xy.right &&
                     mouseY > that.html_xy.hd.h3.xy.top &&
                     mouseY < that.html_xy.hd.h3.xy.bottom) {
                     // 添加头部模块
                     that.mksite = {
                        name: mk,//模块名
                        mkname: mkname,
                        location1: "hd",//主体位置(hd con ft)
                        location2: null,//单元位置(单元序列)   
                        location3: null,//左右位置（left right）
                        location4: 0,//模块序列（0····）
                     }
                  }
                  return
               }
               // 当头部有模块时
               if (that.layout_data.hd.length > 0) {
                  // 有模块
                  // 循环对比模块位置确定放置位置
                  var num = 0
                  for (var i = 0; i < that.layout_data.hd.length; i++) {
                     // 在模块范围内
                     if (!that.html_xy.hd.mk[i]) { return }
                     // 第num个模块的中点小于鼠标位置时虽然循环在继续但是里面已经没有可执行的代码了
                     if (mouseY > (that.html_xy.hd.mk[i].xy.top + that.html_xy.hd.mk[i].xy.bottom) / 2) {
                        num = i + 1

                     }
                  }
                  that.mksite = {
                     name: mk,//模块名
                     mkname: mkname,
                     location1: "hd",//主体位置(hd con ft)
                     location2: null,//单元位置(单元序列)   
                     location3: null,//左右位置（left right）
                     location4: num,//模块序列（0····）
                  }
                  return
               }
            }
            // 在尾部********************************************************************
            if (mouseX > that.html_xy.ft.xy.left &&
               mouseX < that.html_xy.ft.xy.right &&
               mouseY > that.html_xy.ft.xy.top &&
               mouseY < that.html_xy.ft.xy.bottom) {
               // 判断元素是否可放置在头部
               for (var i = 0; i < site.type.length; i++) {
                  if (site.type[i] == "ft") {
                     goOn = true
                     break
                  } else {
                     goOn = false
                  }
               }
               // 判断是否可放置
               if (!goOn) { return }
               // 当头部没有模块时
               if (that.layout_data.ft.length == 0) {
                  // 放在提示块中才能放入
                  if (mouseX > that.html_xy.ft.h3.xy.left &&
                     mouseX < that.html_xy.ft.h3.xy.right &&
                     mouseY > that.html_xy.ft.h3.xy.top &&
                     mouseY < that.html_xy.ft.h3.xy.bottom) {
                     // 添加头部模块
                     that.mksite = {
                        name: mk,//模块名
                        mkname: mkname,
                        location1: "ft",//主体位置(hd con ft)
                        location2: null,//单元位置(单元序列)    
                        location3: null,//左右位置（left right）
                        location4: 0,//模块序列（0····）
                     }
                     return
                  }
               }
               // 当尾部有模块时
               if (that.layout_data.ft.length > 0) {
                  var num = 0
                  // 有模块
                  // 循环对比模块位置确定放置位置
                  for (var i = 0; i < that.layout_data.ft.length; i++) {
                     // 在模块范围内
                     if (!that.html_xy.ft.mk[i]) { return }
                     // 第num个模块的中点小于鼠标位置时虽然循环在继续但是里面已经没有可执行的代码了
                     if (mouseY > (that.html_xy.ft.mk[i].xy.top + that.html_xy.ft.mk[i].xy.bottom) / 2) {
                        num = i + 1
                     }
                  }
                  that.mksite = {
                     name: mk,//模块名
                     mkname: mkname,
                     location1: "ft",//主体位置(hd con ft)
                     location2: null,//单元位置(单元序列)   
                     location3: null,//左右位置（left right）
                     location4: num,//模块序列（0····）
                  }
               }
               return

            }
            // 在主体中添加模块
            if (
               mouseX > that.html_xy.con.xy.left &&
               mouseX < that.html_xy.con.xy.right &&
               mouseY > that.html_xy.con.xy.top &&
               mouseY < that.html_xy.con.xy.bottom
            ) {
               // 循环判断布局单元
               //    循环所有布局单元
               for (var i = 0; i < that.layout_data.con.length; i++) {
                  // 如果在布局单元中
                  if (
                     mouseX > that.html_xy.con.dy[i].xy.left &&
                     mouseX < that.html_xy.con.dy[i].xy.right &&
                     mouseY > that.html_xy.con.dy[i].xy.top &&
                     mouseY < that.html_xy.con.dy[i].xy.bottom
                  ) {
                     // 在center中
                     if (!that.html_xy.con.dy[i].w19) {
                        // 判断元素是否可放置在头部
                        for (var o = 0; o < site.width.length; o++) {
                           if (site.width[o] == 1920 || site.width[o] == 950) {
                              goOn = true
                              break
                           } else {
                              goOn = false

                           }
                        }
                        // 判断是否可放置
                        if (!goOn) { return }
                        // 如果没有模块
                        if (that.layout_data.con[i].w1920.length == 0) {
                           // 模块放入到h3中方可使用
                           if (
                              mouseX > that.html_xy.con.dy[i].h3.xy.left &&
                              mouseX < that.html_xy.con.dy[i].h3.xy.right &&
                              mouseY > that.html_xy.con.dy[i].h3.xy.top &&
                              mouseY < that.html_xy.con.dy[i].h3.xy.bottom
                           ) {
                              // 添加模块
                              that.mksite = {
                                 name: mk,//模块名
                                 mkname: mkname,
                                 location1: "con",//主体位置(hd con ft)
                                 location2: i,//单元位置(单元序列)   
                                 location3: "center",//左右位置（left right）
                                 location4: 0,//模块序列（0····）
                              }
                           }
                           return

                        }
                        // 有模块时对比模块位置
                        else {
                           var num = 0
                           // 循环对比模块位置
                           for (var o = 0; o < that.layout_data.con[i].w1920.length; o++) {
                              if (!that.html_xy.con.dy[i].mk[o]) { return }
                              // 在上
                              if (mouseY > (that.html_xy.con.dy[i].mk[o].xy.top + that.html_xy.con.dy[i].mk[o].xy.bottom) / 2) {
                                 num = o + 1
                                 // console.log("在上")
                              }
                           }
                           // 在模块上添加模块
                           that.mksite = {
                              name: mk,//模块名
                              mkname: mkname,
                              location1: "con",//主体位置(hd con ft)
                              location2: i,//单元位置(单元序列)   
                              location3: "center",//左右位置（left right）
                              location4: num,//模块序列（0····）
                           }
                        }
                        return
                     }
                     // 在w19子单元中
                     if (mouseX > that.html_xy.con.dy[i].w19.xy.left &&
                        mouseX < that.html_xy.con.dy[i].w19.xy.right &&
                        mouseY > that.html_xy.con.dy[i].w19.xy.top &&
                        mouseY < that.html_xy.con.dy[i].w19.xy.bottom) {
                        // 判断元素是否可放置在头部
                        for (var o = 0; o < site.width.length; o++) {
                           if (site.width[o] == 190) {
                              goOn = true
                              break
                           } else {
                              goOn = false
                           }
                        }
                        // 判断是否可放置
                        if (!goOn) { return }
                        // 如果没有模块则与h3坐标对比
                        if (that.layout_data.con[i].w19.length == 0) {
                           // console.log("在w19中没有模块")
                           // 直接将模块放置到位置
                           // 添加模块
                           that.mksite = {
                              name: mk,//模块名
                              mkname: mkname,
                              location1: "con",//主体位置(hd con ft)
                              location2: i,//单元位置(单元序列)   
                              location3: "w19",//左右位置（left right）
                              location4: 0,//模块序列（0····）
                           }
                        } else {
                           var num = 0
                           for (var o = 0; o < that.layout_data.con[i].w19.length; o++) {
                              if (!that.html_xy.con.dy[i].w19.mk[o]) { return }
                              if (mouseY > (that.html_xy.con.dy[i].w19.mk[o].xy.top + that.html_xy.con.dy[i].w19.mk[o].xy.bottom) / 2) {
                                 num = o + 1
                              }
                           }
                           that.mksite = {
                              name: mk,//模块名
                              mkname: mkname,
                              location1: "con",//主体位置(hd con ft)
                              location2: i,//单元位置(单元序列)   
                              location3: "w19",//左右位置（left right）
                              location4: num,//模块序列（0····）
                           }
                        }
                        return
                     }
                     // 在w75子单元中
                     if (mouseX > that.html_xy.con.dy[i].w75.xy.left &&
                        mouseX < that.html_xy.con.dy[i].w75.xy.right &&
                        mouseY > that.html_xy.con.dy[i].w75.xy.top &&
                        mouseY < that.html_xy.con.dy[i].w75.xy.bottom) {
                        // 判断元素是否可放置在头部
                        for (var o = 0; o < site.width.length; o++) {
                           if (site.width[o] == 750) {
                              goOn = true
                              break
                           } else {
                              goOn = false

                           }
                        }
                        // 判断是否可放置
                        if (!goOn) { return }
                        // 如果没有模块则与h3坐标对比
                        if (that.layout_data.con[i].w75.length == 0) {
                           // 直接将模块放置到位置
                           // 添加模块
                           that.mksite = {
                              name: mk,//模块名
                              mkname: mkname,
                              location1: "con",//主体位置(hd con ft)
                              location2: i,//单元位置(单元序列)   
                              location3: "w75",//左右位置（w19 w75）
                              location4: 0,//模块序列（0····）
                           }
                        } else {
                           var num = 0
                           for (var o = 0; o < that.layout_data.con[i].w75.length; o++) {
                              if (!that.html_xy.con.dy[i].w75.mk[o]) { return }
                              if (mouseY > (that.html_xy.con.dy[i].w75.mk[o].xy.top + that.html_xy.con.dy[i].w75.mk[o].xy.bottom) / 2) {
                                 num = o + 1
                              }
                           }
                           // 在模块上添加模块
                           that.mksite = {
                              name: mk,//模块名
                              mkname: mkname,
                              location1: "con",//主体位置(hd con ft)
                              location2: i,//单元位置(单元序列)   
                              location3: "w75",//左右位置（left right）
                              location4: num,//模块序列（0····）
                           }
                        }
                        return
                     }
                  }
               }
            }
         },
         //布局管理添加模块
         setGuanli_mk(mouseX, mouseY, site) {
            var that = this
            var mk = site.com
            var mkname = site.name
            var dispatch = this.$store.dispatch
            var goOn = false
            // 当前鼠标位置与元素为位置进行对比
            // 不在合理范围内
            if (mouseX < that.layout_xy.xy.left ||
               mouseX > that.layout_xy.xy.right ||
               mouseY < that.layout_xy.xy.top ||
               mouseY > that.layout_xy.xy.bottom) {
               return
            }
            // 在合理范围内
            // 对比位置
            // 在头部**************************************************
            if (mouseX > that.layout_xy.hd.xy.left &&
               mouseX < that.layout_xy.hd.xy.right &&
               mouseY > that.layout_xy.hd.xy.top &&
               mouseY < that.layout_xy.hd.xy.bottom) {
               // 判断元素是否可放置在头部
               for (var i = 0; i < site.type.length; i++) {
                  if (site.type[i] == "hd") {
                     goOn = true
                     break
                  } else {
                     goOn = false

                  }
               }
               // 判断是否可放置
               if (!goOn) { return }
               // 当头部没有模块时
               if (that.layout_data.hd.length == 0) {
                  // 放在提示块中才能放入
                  if (mouseX > that.layout_xy.hd.xy.left &&
                     mouseX < that.layout_xy.hd.xy.right &&
                     mouseY > that.layout_xy.hd.xy.top &&
                     mouseY < that.layout_xy.hd.xy.bottom) {
                     // 添加头部模块
                     that.mksite = {
                        name: mk,//模块名
                        mkname: mkname,
                        location1: "hd",//主体位置(hd con ft)
                        location2: null,//单元位置(单元序列)   
                        location3: null,//左右位置（left right）
                        location4: 0,//模块序列（0····）
                     }
                  }
                  return
               }
               // 当头部有模块时
               if (that.layout_data.hd.length > 0) {
                  // 有模块
                  // 循环对比模块位置确定放置位置
                  var num = 0
                  for (var i = 0; i < that.layout_data.hd.length; i++) {
                     // 在模块范围内
                     if (!that.layout_xy.hd.mk[i]) { return }
                     // 第num个模块的中点小于鼠标位置时虽然循环在继续但是里面已经没有可执行的代码了
                     if (mouseY > (that.layout_xy.hd.mk[i].xy.top + that.layout_xy.hd.mk[i].xy.bottom) / 2) {
                        num = i + 1

                     }
                  }
                  that.mksite = {
                     name: mk,//模块名
                     mkname: mkname,
                     location1: "hd",//主体位置(hd con ft)
                     location2: null,//单元位置(单元序列)   
                     location3: null,//左右位置（left right）
                     location4: num,//模块序列（0····）
                  }
                  return
               }
            }
            // 在尾部********************************************************************
            if (mouseX > that.layout_xy.ft.xy.left &&
               mouseX < that.layout_xy.ft.xy.right &&
               mouseY > that.layout_xy.ft.xy.top &&
               mouseY < that.layout_xy.ft.xy.bottom) {
               // 判断元素是否可放置在头部
               for (var i = 0; i < site.type.length; i++) {
                  if (site.type[i] == "ft") {
                     goOn = true
                     break
                  } else {
                     goOn = false
                  }
               }
               // 判断是否可放置
               if (!goOn) { return }
               // 当头部没有模块时
               if (that.layout_data.ft.length == 0) {
                  // 放在提示块中才能放入
                  if (mouseX > that.layout_xy.ft.xy.left &&
                     mouseX < that.layout_xy.ft.xy.right &&
                     mouseY > that.layout_xy.ft.xy.top &&
                     mouseY < that.layout_xy.ft.xy.bottom) {
                     // 添加头部模块
                     that.mksite = {
                        name: mk,//模块名
                        mkname: mkname,
                        location1: "ft",//主体位置(hd con ft)
                        location2: null,//单元位置(单元序列)    
                        location3: null,//左右位置（left right）
                        location4: 0,//模块序列（0····）
                     }
                     return
                  }
               }
               // 当尾部有模块时
               if (that.layout_data.ft.length > 0) {
                  var num = 0
                  // 有模块
                  // 循环对比模块位置确定放置位置
                  for (var i = 0; i < that.layout_data.ft.length; i++) {
                     // 在模块范围内
                     if (!that.layout_xy.ft.mk[i]) { return }
                     // 第num个模块的中点小于鼠标位置时虽然循环在继续但是里面已经没有可执行的代码了
                     if (mouseY > (that.layout_xy.ft.mk[i].xy.top + that.layout_xy.ft.mk[i].xy.bottom) / 2) {
                        num = i + 1
                     }
                  }
                  that.mksite = {
                     name: mk,//模块名
                     mkname: mkname,
                     location1: "ft",//主体位置(hd con ft)
                     location2: null,//单元位置(单元序列)   
                     location3: null,//左右位置（left right）
                     location4: num,//模块序列（0····）
                  }
               }
               return
            }
            // 在主体中添加模块
            if (
               mouseX > that.layout_xy.con.xy.left &&
               mouseX < that.layout_xy.con.xy.right &&
               mouseY > that.layout_xy.con.xy.top &&
               mouseY < that.layout_xy.con.xy.bottom
            ) {
               // 循环判断布局单元
               //    循环所有布局单元
               for (var i = 0; i < that.layout_data.con.length; i++) {
                  // 如果在布局单元中
                  if (
                     mouseX > that.layout_xy.con.dy[i].xy.left &&
                     mouseX < that.layout_xy.con.dy[i].xy.right &&
                     mouseY > that.layout_xy.con.dy[i].xy.top &&
                     mouseY < that.layout_xy.con.dy[i].xy.bottom
                  ) {
                     // 在center中
                     if (!that.layout_xy.con.dy[i].w19) {
                        // 判断元素是否可放置在头部
                        for (var o = 0; o < site.width.length; o++) {
                           if (site.width[o] == 1920 || site.width[o] == 950) {
                              goOn = true
                              break
                           } else {
                              goOn = false

                           }
                        }
                        // 判断是否可放置
                        if (!goOn) { return }
                        // 如果没有模块
                        if (that.layout_data.con[i].w1920.length == 0) {
                           // 模块放入到h3中方可使用
                           if (
                              mouseX > that.layout_xy.con.dy[i].xy.left &&
                              mouseX < that.layout_xy.con.dy[i].xy.right &&
                              mouseY > that.layout_xy.con.dy[i].xy.top &&
                              mouseY < that.layout_xy.con.dy[i].xy.bottom
                           ) {
                              // 添加模块
                              that.mksite = {
                                 name: mk,//模块名
                                 mkname: mkname,
                                 location1: "con",//主体位置(hd con ft)
                                 location2: i,//单元位置(单元序列)   
                                 location3: "center",//左右位置（left right）
                                 location4: 0,//模块序列（0····）
                              }
                           }
                           return

                        }
                        // 有模块时对比模块位置
                        else {
                           var num = 0
                           // 循环对比模块位置
                           for (var o = 0; o < that.layout_data.con[i].w1920.length; o++) {
                              if (!that.layout_xy.con.dy[i].mk[o]) { return }
                              // 在上
                              if (mouseY > (that.layout_xy.con.dy[i].mk[o].xy.top + that.layout_xy.con.dy[i].mk[o].xy.bottom) / 2) {
                                 num = o + 1
                                 // console.log("在上")
                              }
                           }
                           // 在模块上添加模块
                           that.mksite = {
                              name: mk,//模块名
                              mkname: mkname,
                              location1: "con",//主体位置(hd con ft)
                              location2: i,//单元位置(单元序列)   
                              location3: "center",//左右位置（left right）
                              location4: num,//模块序列（0····）
                           }
                        }
                        return
                     }
                     // 在w19子单元中
                     if (mouseX > that.layout_xy.con.dy[i].w19.xy.left &&
                        mouseX < that.layout_xy.con.dy[i].w19.xy.right &&
                        mouseY > that.layout_xy.con.dy[i].w19.xy.top &&
                        mouseY < that.layout_xy.con.dy[i].w19.xy.bottom) {
                        // 判断元素是否可放置在头部
                        for (var o = 0; o < site.width.length; o++) {
                           if (site.width[o] == 190) {
                              goOn = true
                              break
                           } else {
                              goOn = false
                           }
                        }
                        // 判断是否可放置
                        if (!goOn) { return }
                        // 如果没有模块则与h3坐标对比
                        if (that.layout_data.con[i].w19.length == 0) {
                           // console.log("在w19中没有模块")
                           // 直接将模块放置到位置
                           // 添加模块
                           that.mksite = {
                              name: mk,//模块名
                              mkname: mkname,
                              location1: "con",//主体位置(hd con ft)
                              location2: i,//单元位置(单元序列)   
                              location3: "w19",//左右位置（left right）
                              location4: 0,//模块序列（0····）
                           }
                        } else {
                           var num = 0
                           for (var o = 0; o < that.layout_data.con[i].w19.length; o++) {
                              if (!that.layout_xy.con.dy[i].w19.mk[o]) { return }
                              if (mouseY > (that.layout_xy.con.dy[i].w19.mk[o].xy.top + that.layout_xy.con.dy[i].w19.mk[o].xy.bottom) / 2) {
                                 num = o + 1
                              }
                           }
                           that.mksite = {
                              name: mk,//模块名
                              mkname: mkname,
                              location1: "con",//主体位置(hd con ft)
                              location2: i,//单元位置(单元序列)   
                              location3: "w19",//左右位置（left right）
                              location4: num,//模块序列（0····）
                           }
                        }
                        return
                     }
                     // 在w75子单元中
                     if (mouseX > that.layout_xy.con.dy[i].w75.xy.left &&
                        mouseX < that.layout_xy.con.dy[i].w75.xy.right &&
                        mouseY > that.layout_xy.con.dy[i].w75.xy.top &&
                        mouseY < that.layout_xy.con.dy[i].w75.xy.bottom) {
                        // 判断元素是否可放置在头部
                        for (var o = 0; o < site.width.length; o++) {
                           if (site.width[o] == 750) {
                              goOn = true
                              break
                           } else {
                              goOn = false

                           }
                        }
                        // 判断是否可放置
                        if (!goOn) { return }
                        // 如果没有模块则与h3坐标对比
                        if (that.layout_data.con[i].w75.length == 0) {
                           // 直接将模块放置到位置
                           // 添加模块
                           that.mksite = {
                              name: mk,//模块名
                              mkname: mkname,
                              location1: "con",//主体位置(hd con ft)
                              location2: i,//单元位置(单元序列)   
                              location3: "w75",//左右位置（w19 w75）
                              location4: 0,//模块序列（0····）
                           }
                        } else {
                           var num = 0
                           for (var o = 0; o < that.layout_data.con[i].w75.length; o++) {
                              if (!that.layout_xy.con.dy[i].w75.mk[o]) { return }
                              if (mouseY > (that.layout_xy.con.dy[i].w75.mk[o].xy.top + that.layout_xy.con.dy[i].w75.mk[o].xy.bottom) / 2) {
                                 num = o + 1
                              }
                           }
                           // 在模块上添加模块
                           that.mksite = {
                              name: mk,//模块名
                              mkname: mkname,
                              location1: "con",//主体位置(hd con ft)
                              location2: i,//单元位置(单元序列)   
                              location3: "w75",//左右位置（left right）
                              location4: num,//模块序列（0····）
                           }
                        }
                        return
                     }
                  }
               }
            }
         },
         // 删除模块
         del_mk() {
            var that = this
            var dispatch = this.$store.dispatch
            var data = {
               name: arguments[0],
               location1: arguments[1],
               location2: arguments[2],
               location3: arguments[3],
               location4: arguments[4],
               datalength: arguments[5],

            }
            dispatch({
               type: "del_mk_ac",
               data: data,
            })
         },
         // 布局管理页移动模块
         guanli_move_mk(event, site) {
            // 需要数据、名称、原始位置
            // 最终停留在放置的位置
            var that = this
            var dispatch = this.$store.dispatch
            // 判断是否为div元素
            if (event.target.localName != "div") {
               // 获取div元素
               var _target = event.currentTarget

            } else {
               // 获取div元素
               var _target = event.target
            }
            // 设置层叠
            _target.style.zIndex = 10;
            // 获取当前鼠标位置x
            var startx = event.clientX;
            // 获取当前鼠标位置y
            var starty = event.clientY;
            // 获取页面编辑的坐标
            if (that.edit_manage == "1") {
               that.getEdit_xy()
               that.hintsite = ""

            }
            // 获取布局管理中的坐标
            if (that.edit_manage == "2") {
               that.getGuanli_xy()
            }
            // 鼠标移动事件
            document.onmousemove = function (ev) {
               // 获取对象
               var event = ev || window.event;
               // 获取位移量x=当前位置x-开始位置x
               var endx = event.clientX - startx;
               // 获取位移量y=当前位置y-开始位置y
               var endy = event.clientY - starty;
               // 设置位移位置x
               _target.style.left = Math.floor(endx) + 'px';
               // 设置位移位置y
               _target.style.top = Math.floor(endy) + 'px';
               // 鼠标移动显示模块可放入的位置
               if (that.edit_manage == "1") {
                  // 如果提示框存在则删除
                  if (that.hintsite) {
                     dispatch({
                        type: 'del_hint_mk_ac',
                        data: that.hintsite,
                     })
                  }
                  that.hintsite = {}
                  that.mksite = {}
                  // 鼠标移动显示模块可放置区域
                  that.setEdit_mk(event.clientX, event.clientY, site)
                  // 在相应位置添加提示框
                  that.hintsite = that.mksite
                  that.hintsite = {
                     name: "mk",
                     mkname: that.mksite.mkname,
                     location1: that.mksite.location1,
                     location2: that.mksite.location2,
                     location3: that.mksite.location3,
                     location4: that.mksite.location4,
                  }
                  dispatch({
                     type: 'setEdit_mk_ac',
                     data: that.hintsite,
                  })
               }
               if (that.edit_manage == "2") {
                  // 如果提示框存在则删除
                  if (that.hintsite) {
                     dispatch({
                        type: 'del_hint_mk_ac',
                        data: that.hintsite,
                     })
                  }
                  that.hintsite = {}
                  that.mksite = {}
                  that.setGuanli_mk(event.clientX, event.clientY, site)
                  // 在相应位置添加提示框
                  that.hintsite = that.mksite
                  that.hintsite = {
                     name: "mk",
                     mkname: that.mksite.mkname,
                     location1: that.mksite.location1,
                     location2: that.mksite.location2,
                     location3: that.mksite.location3,
                     location4: that.mksite.location4,
                  }
                  dispatch({
                     type: 'setEdit_mk_ac',
                     data: that.hintsite,
                  })
               }
            }
         },
         shezhi(num) {
            var that = this
            console.log(num)
            that.layout_choose = true
         },
         // 松开模块模拟框
         bjmkmouseup(event) {
            var that = this
            var dispatch = this.$store.dispatch
            // 隐藏跟随狂
            that.mk_move_xy.display = false
            // 删除临时模块
            if (that.hintsite) {
               dispatch({
                  type: 'del_hint_mk_ac',
                  data: that.hintsite,
               })
            }
            // 添加模块
            if (!that.mksite.location1) {
               var data = {
                  site: that.layout_data_mk_site,
                  data: that.layout_data_mk
               }
            } else {
               var data = {
                  site: that.mksite,
                  data: that.layout_data_mk
               }
            }
            that.hintsite = ""
            // 添加模块
            dispatch({
               type: 'setEdit_move_mk_ac',
               data: data,
            })
            document.onmousemove = null;

         },
         // 单元移动功能
         dymove(event, index) {
            var that = this
            var dispatch = this.$store.dispatch
            that.dy_type = true
            // 获取单元数据
            that.dy_data = that.layout_data.con[index]
            // 删除单元
            that.remove_layout(index).then(val => {
               // 获取坐标
               that.$nextTick(
                  () => {
                     that.getGuanli_xy()
                  }
               )
            })
            var starty = event.clientY
            var layout_con_top = that.$refs.layout_con.getBoundingClientRect().top
            that.$refs.dymk.style.border = "2px dashed #FF9831"
            that.$refs.dymk.style.display = "block"
            that.$refs.dymk.style.top = event.clientY - layout_con_top - 15 + "px"
            document.onmousemove = function (ev) {
               var event = ev || window.event;
               that.$refs.dymk.style.top = event.clientY - layout_con_top - 15 + "px"

               // 如果存在则删除
               if (that.dy_hint_site != null) {
                  dispatch({
                     type: "del_mndy_ac",
                     data: { num: that.dy_hint_site }
                  })
               }
               that.dysite = null
               that.dy_hint_site = null
               // 移动对比位置
               that.setGuanli_dy(event.clientY)
               that.dy_hint_site = that.dysite
               // // 添加模拟单元
               var add_mndy = {
                  name: "mn",
                  num: that.dy_hint_site
               }
               dispatch({
                  type: "add_mndy_ac",
                  data: add_mndy
               })
            };
         },
         // 对比单元位置
         setGuanli_dy(mousey) {
            var that = this
            var dispatch = this.$store.dispatch
            var num = 0
            for (var i = 0; i < that.layout_xy.con.dy.length; i++) {
               var dy_center = (that.layout_xy.con.dy[i].xy.top + that.layout_xy.con.dy[i].xy.bottom) / 2
               if (mousey > dy_center) { num = i + 2 - 1 }
            }
            that.dysite = num
         },
         // 删除模拟单元
         dy_move_up() {
            var that = this
            var dispatch = this.$store.dispatch
            if (that.dy_type) {
               // 删除模拟单元
               dispatch({
                  type: "del_mndy_ac",
                  data: { num: that.dy_hint_site }
               })
               // 添加单元
               var data = {
                  num: that.dy_hint_site,
                  data: that.dy_data
               }
               dispatch({
                  type: "add_dy_data_ac",
                  data: data
               })
               that.$refs.dymk.style.border = "none"
               that.$refs.dymk.style.display = "none"
               that.$refs.dymk.style.top = 0
               document.onmousemove = null;
            }
            that.dy_type = false
         },
        
      },
   }
</script>
<style>
   /* 全局设置 */
   .index {
      height: 100%;
   }

   html,
   body {
      height: 100%;
      min-width: 1300px;
      overflow-x: hidden;

   }

   /* 头部样式 */
   .header {
      padding-top: 20px;
      background: #293749;
   }

   .header ul {
      margin: 0 auto;
      display: block;
      overflow: hidden;
      text-align: center;
      width: 520px;
   }

   .header li {
      width: 50%;
      height: 34px;
      line-height: 34px;
      background: #3e4b5b;
      float: left;
      color: #9fa6ad;
      cursor: pointer;
   }

   .header .active {
      background: #fff;
      color: #666;
      border-radius: 4px 4px 0 0;
   }

   /* 主体内容左侧工具栏 */

   .content .fun_area {
      z-index: 1002;
   }

   .content .fun_area ul {
      float: left;
      width: 69px;
      height: 100%;
      background: #f8f9fa;
      border-right: 1px solid #cad0d8;
      /* z-index: 2; */
   }

   .content .fun_area li {
      height: 69px;
      text-align: center;
      line-height: 69px;
      border-bottom: 1px solid #ddd;
      cursor: pointer;
   }

   .content .fun_area .active {
      color: #0589d8;
   }


   /* 主题内容模块栏 */
   .content .fun_piece {
      position: relative;
      left: 0;
      width: 229px;
      border-right: 1px solid #cad0d8;
      height: 100%;
      z-index: 1001;
   }

   .content .fun_piece>ul>li {
      display: none;
   }

   .content .fun_piece .active {
      display: block;
   }

   .content .fun_piece .gb {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: url(../../static/img/GB.png)no-repeat center;
      cursor: pointer;
   }

   .content .fun_piece .remove {
      text-align: right;
      margin-top: 10px !important;
      padding-right: 10px;
   }

   .content .fun_piece li .ts {
      text-align: center;
      font-size: 12px;
      margin-top: 20px;
   }

   .content .fun_piece .win_width {
      width: 80%;
      margin: 0 auto;
      overflow: hidden;
      margin-top: 20px;
   }

   .content .fun_piece .win_width>li:first-child {
      margin-left: 0px;
   }

   .content .fun_piece .win_width li {
      float: left;
      font-size: 12px;
      width: 19%;
      height: 16px;
      line-height: 16px;
      text-align: center;
      border: 1px solid #DDDDDD;
      margin-left: -1px;
      cursor: pointer;
   }

   .content .fun_piece .win_width li.active {
      border-color: #428ce8;
      background: #428ce8;
      color: #fff;
   }

   .content .fun_piece .tool_head {
      padding: 0 10px;
      line-height: 35px;
      font-size: 14px;
      border-top: 1px solid #dee1e7;
      background: #ebedf3;
      margin-top: 20px;
      cursor: pointer;
   }

   .content .fun_piece .tool_head .fx {
      display: inline-block;
      float: right;
      height: 12px;
      margin-top: 11px;
      width: 20px;
      background: url(../../static/img/FX.png) 0px 12px;
   }

   .content .fun_piece .basics li {
      float: left;
      width: 33%;
      margin-top: 10px;
      height: 62px;
      position: relative;
   }

   .content .fun_piece .basics li div {
      width: 60px;
      height: 60px;
      border: 1px solid #dee1e7;
      margin: 0px 7px;
      background: #ebedf3;
      cursor: move;
      position: absolute;
      left: 0;
      top: 0;
   }

   .content .fun_piece .basics li span {
      width: 36px;
      height: 36px;
      display: block;
      margin: 5px auto 0;
   }

   .content .fun_piece .basics li p {
      font-size: 12px;
      text-align: center;
      font-weight: 900;
      line-height: 18px;
   }

   /* 视窗窗口 */
   .content .content_show {
      right: 0;
   }

   /* 视窗头部选择按钮 */
   .content .content_show .con_header {
      height: 59px;
      width: 100%;
      border-bottom: 1px solid #d9dae0;
   }

   .con_header select {
      outline: none;
      width: 200px;
      margin: 15px 0 0 20px;
      border: 1px solid #9FA6AD;
      height: 30px;
      padding-left: 10px;
      font-size: 14px;
      cursor: pointer;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      background: url(../../static/img/FXX.png) no-repeat right 10px center;
   }

   .con_header ul {
      height: 32px;
      margin: 15px 0 0 20px;
   }

   .con_header ul.fl li {
      line-height: 30px;
      width: 80px;
      text-align: center;
      float: left;
      font-size: 14px;
      border: 1px solid #b2b4b6;
      background: url(../../static/img/FXXbg.png) 0px 30px;
      cursor: pointer;
      border-radius: 3px;
      color: #666;
   }

   .con_header ul.fl li:last-child {
      margin-left: -1px;
   }

   .con_header ul.fl li.active {
      background: url(../../static/img/FXXbg.png) 0px 0px;
   }

   .con_header ul.fr li {
      font-size: 14px;
      line-height: 30px;
      padding: 0 20px;
      text-align: center;
      border: 1px solid #b2b4b6;
      float: left;
      border-radius: 3px;
      margin: 0 10px 0;
      cursor: pointer;
   }

   .con_header ul.fr li:last-child {
      background: #3487ec;
      border: 1px solid #3487ec;
      color: #fff;
   }

   /* 展示视窗 */
   .con_con {
      /* overflow: scroll */
   }

   .con_con .html {
      width: 100%;
      height: 100%;
      overflow: scroll;
   }

   /* 页面编辑视窗 */
   .html .edit1 {
      min-width: 1000px;
      min-height: 80%;
   }

   .html .edit1>div {
      margin-bottom: 10px;
   }

   .html .edit1 .html_con>div {
      margin-top: 10px !important;
   }

   .html .edit1 .ts {
      width: 950px;
      margin: 0 auto;
      margin-top: 10px;
      text-align: center;
      line-height: 100px;
      color: #B2B4B6;
      background: #eeeeee;
   }

   /* 模块单元编辑视窗 */
   .html .edit2 {
      width: 100%;
   }

   .html .edit2 .layout_edit {
      width: 850px;
      margin: 0 auto
   }

   .html .edit2>div {
      padding-top: 70px
   }

   .html .edit2 .layout_edit>div {
      padding: 5px;
      border: 1px solid #ddd;
      margin-bottom: 10px;
   }

   .html .edit2 .layout_edit>div>.title {
      text-align: center;
      font-size: 12px;
   }

   .html .edit2 .layout_edit .layout_con .new_layout {

      border: 1px dashed #FF9831;
      background: #fff2e3;
      cursor: pointer;
      font-size: 12px;
      text-align: center;
      line-height: 16px;
      padding: 5px;
   }

   .html .edit2 .layout_edit .layout_con .layout_con_con {
      margin-top: 10px
   }

   .html .edit2 .layout_edit .layout_con .layout_con_con .clear {
      margin: 0;
      padding: 0
   }

   .html .edit2 .layout_edit .layout_con .layout_con_con .move {
      background: url(../../static/img/move.png) no-repeat center;
      cursor: move;
   }

   .html .edit2 .layout_edit .layout_con .layout_con_con .shezhi {
      background: url(../../static/img/sz.png) no-repeat center;
      cursor: pointer;
   }

   .html .edit2 .layout_edit .layout_con .layout_con_con .shanchu {
      background: url(../../static/img/del.png) no-repeat center;
      cursor: pointer;
   }

   .html .edit2 .layout_edit .layout_con .layout_con_con .move,
   .html .edit2 .layout_edit .layout_con .layout_con_con .shezhi,
   .html .edit2 .layout_edit .layout_con .layout_con_con .shanchu {
      width: 30px;
      height: 30px;
   }

   .html .edit2 .layout_edit .module {
      border: 1px solid #add2fe;
      font-size: 12px;
      margin-bottom: 10px;
      height: 34px;
      line-height: 34px;
      padding-left: 10px;
      background-color: #daeaff;
   }

   .html .edit2 .layout_edit .module span.fr {
      display: inline-block;
      width: 34px;
      height: 34px;
   }

   .html .edit2 .layout_edit .module span.modulebd {
      background: url(../../static/img/del.png) no-repeat center;
      cursor: pointer;
   }

   .html .edit2 .layout_edit .module span.module_move {
      background: url(../../static/img/move.png) no-repeat center;
      cursor: move;
   }

   .html .edit2 .layout_edit .moduleDom {
      border: 2px dashed #FF9831;
      font-size: 12px;
      margin: 10px;
      height: 34px;
      max-width: 926px;
      margin: 0 auto;
      line-height: 34px;
      padding: 0 10px;
      background-color: #fff;
      margin-bottom: 10px;
   }

   .layout_con_con .w1975>div {
      padding: 5px 10px;
   }

   .layout_con_con .w1975>ul {
      position: absolute;
      right: -90px;
      top: 1px;
      width: 90px;
      height: 30px;
      overflow: hidden;
      background: #daeaff;
   }

   .layout_con_con .w1975>.fl {
      width: 150px;
      padding: 5px 10px;
      min-height: 20px;
      border: 1px solid #d4d4d4;
      background: #ececec;
      margin-bottom: 10px;

   }

   .layout_con_con .w1975>.fr {
      width: 635px;
      padding: 5px 10px;
      min-height: 20px;
      border: 1px solid #d4d4d4;
      background: #ececec;
      margin-bottom: 10px;
   }

   .layout_con_con .w1975>.fl p,
   .layout_con_con .w1975>.fr p {
      font-size: 12px;
   }

   .layout_con_con .w7519>div {
      padding: 5px 10px;
   }

   .layout_con_con .w7519>ul {
      position: absolute;
      right: -90px;
      top: 1px;
      width: 90px;
      height: 30px;
      overflow: hidden;
      background: #daeaff;
   }

   .layout_con_con .w7519>.fl {
      width: 635px;
      padding: 5px 10px;
      min-height: 20px;
      border: 1px solid #d4d4d4;
      background: #ececec;
      margin-bottom: 10px;

   }

   .layout_con_con .w7519>.fr {
      width: 150px;
      padding: 5px 10px;
      min-height: 20px;
      border: 1px solid #d4d4d4;
      background: #ececec;
      margin-bottom: 10px;
   }

   .layout_con_con .w7519>.fl p,
   .layout_con_con .w7519>.fr p {
      font-size: 12px;
   }

   .layout_con_con .w1920>div {
      padding: 5px 10px;
   }

   .layout_con_con .w1920>ul {
      position: absolute;
      right: -90px;
      top: 1px;
      width: 90px;
      height: 30px;
      overflow: hidden;
      background: #daeaff;
   }

   .layout_con_con .w1920 .layout_body {

      padding: 5px 10px;
      min-height: 20px;
      border: 1px solid #d4d4d4;
      background: #ececec;
      margin-bottom: 10px;
   }

   .layout_con_con .w1920 .layout_body>p {
      font-size: 12px;
   }



   /* 布局单元模块选择 */
   .layout_choose {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -350px;
      margin-top: -200px;
      width: 700px;
      padding: 10px 20px;
      background: rgba(100, 100, 100, 0.2);
      z-index: 100;
   }

   .layout_choose .title {

      background: #293749;
      color: #fff;
      padding: 5px 10px;
      font-size: 12px;
      cursor: move;
   }

   .layout_choose .title .gb {
      cursor: pointer;
   }

   .layout_choose .layout_content {
      background: #fff;
      padding: 5px 10px;
   }

   .layout_choose .layout_content .fr {
      font-size: 12px;
   }

   .layout_choose .layout_content ul li {
      float: left;
      width: 32%;
      margin: 5px;
      padding: 5px;
      border: 1px solid #add2fe;
      color: #369;
      cursor: pointer;
   }

   .layout_choose .layout_content ul li:hover {
      border: 1px solid #FF9831;
   }

   .layout_choose .layout_content .w75 {
      width: 150px;
      height: 50px;
      border: 1px solid #ddd;
      font-size: 12px;
      text-align: center;
   }

   .layout_choose .layout_content .w19 {
      height: 50px;
      width: 50px;
      border: 1px solid #ddd;
      font-size: 12px;
      text-align: center;
   }

   .layout_choose .layout_content .w95 {
      width: 215px;
      border: 1px solid #ddd;
      height: 50px;
      font-size: 12px;
      text-align: center;
   }

   #leftEdit {
      width: 950px;
      margin: 0 auto;
   }

   #leftEdit .w19 {
      width: 190px;
   }

   #leftEdit .w75 {
      width: 750px
   }

   #leftEdit .w19 h3,
   #leftEdit .w75 h3 {
      color: #B2B4B6;
      text-align: center;
      line-height: 100px;
      background: #eeeeee
   }

   #rightEdit {
      width: 950px;
      margin: 0 auto;
   }

   #rightEdit .w19 {
      width: 190px;
   }

   #rightEdit .w75 {
      width: 750px
   }

   #rightEdit .w19 h3,
   #rightEdit .w75 h3 {
      color: #B2B4B6;
      text-align: center;
      line-height: 100px;
      background: #eeeeee
   }

   #centerEdit {
      min-width: 1000px;
      margin: 0 auto;
   }

   #centerEdit .w1920 {
      width: 100%;
      margin: 0 auto;
   }

   #centerEdit .w1920 h3 {
      width: 950px;
      color: #B2B4B6;
      text-align: center;
      line-height: 100px;
      background: #eeeeee;
      margin: 0 auto
   }

   #mkmk {
      width: 136px;
      height: 32px;
      left: 446px;
      top: 0;
      border: 2px dashed #FF9831;
      padding: 0 5px;
      background: #fff2e3;
      font-size: 12px;
      cursor: move;
      line-height: 32px;
      z-index: 1002;
   }

   #dymk {
      width: 834px;
      height: 28px;

      cursor: move;
      z-index: 1002;
   }

   #dy_mn {
      width: 834px;
      height: 28px;
      border: 2px dashed #FF9831;
      margin-bottom: 10px;
   }

   .mokuai_mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1005;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6)
   }
   .mokuai_mask>.del {
      width: 40px;
      height: 40px;
      background-size: 20px 20px ;
   }
</style>