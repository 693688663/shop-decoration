import Vue from 'vue'
import Vuex from 'vuex'
import d_action from "./d_action"
import d_mutation from "./d_mutation"
import l_action from "./l_action"
import l_mutation from "./l_mutation"
Vue.use(Vuex);
const state = {
   edit_manage: 1,
   // 保存页面编辑中的坐标
   html_xy: {
      hd: {
         xy: {},
         mk: [],
      },
      con: {
         xy: {},
         dy: [],
      },
      ft: {
         xy: {},
         mk: [],
      },
   },
   // 保存布局管理中的坐标
   layout_xy: {
      hd: {
         xy: {},
         mk: [],
      },
      con: {
         xy: {},
         dy: [],
      },
      ft: {
         xy: {},
         mk: [],
      },
   },
   // 保存单元及模块的数据  此数据为后台保存数据
   layout_data: {
      hd: [],
      con: [],
      ft: [],
   },
   // 布局管理页要移动的模块数据
   layout_data_mk: {},
   // 需移动模块的位置信息
   layout_data_mk_site: {},
   // 布局管理页要移动的模块位置信息以及是否显示模态框
   layout_data_mk_xy: {
      xy: {
         left: 0,
         top: 0,
         x: 0,
         y: 0
      },
      display: ""
   },
   // 已有模块移动时的坐标
   layout_data_mk_move_xy: {
      xy: {
         left: 0,
         top: 0,
         x: 0,
         y: 0
      },
      display: ""
   },
   edit_mk_data: {},
}
const mutations = {
   setlocalStorage_layout_data_mu(state, n) {
      state.layout_data = n.data
   },
   // 添加单元模块
   layout_xy_choose_mu(state, n) {
      if (n.data.name != 'center') {
         n.data['w19'] = []
         n.data['w75'] = []
         state.layout_data.con.push(n.data)
      } else if (n.data.name = 'center') {
         n.data['w1920'] = []
         state.layout_data.con.push(n.data)
      }
   },
   // 删除单元模块
   remove_layout_mu(state, n) {
      state.layout_data.con.splice(n.data, 1)
   },
   // 获取页面编辑页的坐标
   getEdit_xy_mu(state, n) {
      state.html_xy = n.data
   },
   getGuanli_xy_mu(state, n) {
      state.layout_xy = n.data
   },
   // 添加模块
   setEdit_mk_mu(state, n) {
      var data = {
         name: n.data.name,
         mkname: n.data.mkname,
         data: {}
      }
      if (n.data.location1 == "hd") {
         state.layout_data.hd.splice(n.data.location4, 0, data)
      }
      if (n.data.location1 == "ft") {

         state.layout_data.ft.splice(n.data.location4, 0, data)
      }
      if (n.data.location1 == "con") {
         if (n.data.location3 == "w19") {
            state.layout_data.con[n.data.location2].w19.splice(n.data.location4, 0, data)
         }
         if (n.data.location3 == "w75") {
            state.layout_data.con[n.data.location2].w75.splice(n.data.location4, 0, data)
         }
         if (n.data.location3 == "center") {
            state.layout_data.con[n.data.location2].w1920.splice(n.data.location4, 0, data)
         }
      }

   },
   // 添加模块
   setEdit_move_mk_mu(state, n) {
      var site = n.data.site
      var data = n.data.data
      if (site.location1 == "hd") {
         state.layout_data.hd.splice(site.location4, 0, data)
      }
      if (site.location1 == "ft") {

         state.layout_data.ft.splice(site.location4, 0, data)
      }
      if (site.location1 == "con") {
         if (site.location3 == "w19") {
            state.layout_data.con[site.location2].w19.splice(site.location4, 0, data)
         }
         if (site.location3 == "w75") {
            state.layout_data.con[site.location2].w75.splice(site.location4, 0, data)
         }
         if (site.location3 == "center") {
            state.layout_data.con[site.location2].w1920.splice(site.location4, 0, data)
         }
      }
   },
   // 删除提示框
   del_hint_mk_mu(state, n) {
      if (n.data.location1 == "hd") {
         state.layout_data.hd.splice(n.data.location4, 1)
      }
      if (n.data.location1 == "ft") {

         state.layout_data.ft.splice(n.data.location4, 1)
      }
      if (n.data.location1 == "con") {
         if (n.data.location3 == "w19") {
            state.layout_data.con[n.data.location2].w19.splice(n.data.location4, 1)
         }
         if (n.data.location3 == "w75") {
            state.layout_data.con[n.data.location2].w75.splice(n.data.location4, 1)
         }
         if (n.data.location3 == "center") {
            state.layout_data.con[n.data.location2].w1920.splice(n.data.location4, 1)
         }
      }
   },
   // 删除编辑页的模块
   del_mk_mu(state, n) {
      if (n.data.location1 == "hd") {
         state.layout_data.hd.splice(n.data.location4, 1)
      }
      if (n.data.location1 == "ft") {

         state.layout_data.ft.splice(n.data.location4, 1)
      }
      if (n.data.location1 == "con") {
         if (n.data.location3 == "w19") {
            state.layout_data.con[n.data.location2].w19.splice(n.data.location4, 1)
         }
         if (n.data.location3 == "w75") {
            state.layout_data.con[n.data.location2].w75.splice(n.data.location4, 1)
         }
         if (n.data.location3 == "center") {
            state.layout_data.con[n.data.location2].w1920.splice(n.data.location4, 1)
         }
      }
   },
   // 上下移动模块
   move_edit_mk_mu(state, n) {
      if (n.data.location1 == "hd") {
         let data = state.layout_data.hd[n.data.location4]
         state.layout_data.hd.splice(n.data.location4, 1)
         state.layout_data.hd.splice(n.data.nowsite, 0, data)
      }
      if (n.data.location1 == "ft") {
         let data = state.layout_data.ft[n.data.location4]
         state.layout_data.ft.splice(n.data.location4, 1)
         state.layout_data.ft.splice(n.data.nowsite, 0, data)
      }
      if (n.data.location1 == "con") {
         if (n.data.location3 == "w19") {
            let data = state.layout_data.con[n.data.location2].w19[n.data.location4]
            state.layout_data.con[n.data.location2].w19.splice(n.data.location4, 1)
            state.layout_data.con[n.data.location2].w19.splice(n.data.nowsite, 0, data)
         }
         if (n.data.location3 == "w75") {
            let data = state.layout_data.con[n.data.location2].w75[n.data.location4]
            state.layout_data.con[n.data.location2].w75.splice(n.data.location4, 1)
            state.layout_data.con[n.data.location2].w75.splice(n.data.nowsite, 0, data)
         }
         if (n.data.location3 == "center") {
            let data = state.layout_data.con[n.data.location2].w1920[n.data.location4]
            state.layout_data.con[n.data.location2].w1920.splice(n.data.location4, 1)
            state.layout_data.con[n.data.location2].w1920.splice(n.data.nowsite, 0, data)
         }
      }
   },
   // 布局管理页单元布局改变
   layout_data_change_mu(state, n) {
      state.layout_data.con[n.data.num].name = n.data.name
   },
   // 布局管理页模块当前位置
   setmove_mk_mu(state, n) {
      // 保存模块初始位置信息
      state.layout_data_mk_site = n.data
      if (n.data.location1 == "hd") {
         // 保存模块信息
         state.layout_data_mk = state.layout_data.hd[n.data.location4]
         // 删除模块
         // state.layout_data.hd.splice(n.data.location4, 1)
      }
      if (n.data.location1 == "ft") {
         // 保存模块信息
         state.layout_data_mk = state.layout_data.ft[n.data.location4]
         // 删除模块
         // state.layout_data.ft.splice(n.data.location4, 1)
      }
      if (n.data.location1 == "con") {
         if (n.data.location3 == "w19") {
            //   保存模块信息
            state.layout_data_mk = state.layout_data.con[n.data.location2].w19[n.data.location4]
            // 删除模块
            // state.layout_data.con[n.data.location2].w19.splice(n.data.location4, 1)
         }
         if (n.data.location3 == "w75") {
            //   保存模块信息
            state.layout_data_mk = state.layout_data.con[n.data.location2].w75[n.data.location4]
            // 删除模块
            // state.layout_data.con[n.data.location2].w75.splice(n.data.location4, 1)
         }
         if (n.data.location3 == "center") {
            //   保存模块信息
            state.layout_data_mk = state.layout_data.con[n.data.location2].w1920[n.data.location4]
            // 删除模块
            // state.layout_data.con[n.data.location2].w1920.splice(n.data.location4, 1)
         }
      }
   },
   del_layout_mk_mu(state, n) {
      if (n.data.location1 == "hd") {
         // 删除模块
         state.layout_data.hd.splice(n.data.location4, 1)
      }
      if (n.data.location1 == "ft") {
         // 删除模块
         state.layout_data.ft.splice(n.data.location4, 1)
      }
      if (n.data.location1 == "con") {
         if (n.data.location3 == "w19") {
            // 删除模块
            state.layout_data.con[n.data.location2].w19.splice(n.data.location4, 1)
         }
         if (n.data.location3 == "w75") {
            // 删除模块
            state.layout_data.con[n.data.location2].w75.splice(n.data.location4, 1)
         }
         if (n.data.location3 == "center") {
            // 删除模块
            state.layout_data.con[n.data.location2].w1920.splice(n.data.location4, 1)
         }
      }
   },
   // 获取首次点击时的坐标
   eventmove_mk_mu(state, n) {
      state.layout_data_mk_xy.xy = {
         left: n.data.x - 75 + "px",
         top: n.data.y - 16 + "px",
         x: n.data.x,
         y: n.data.y,
      }
      state.layout_data_mk_xy.display = n.data.display
   },
   // 获取移动时的坐标
   eventmove_mk_move_mu(state, n) {
      state.layout_data_mk_move_xy.xy = {
         left: n.data.x - 75 + "px",
         top: n.data.y - 16 + "px",
         x: n.data.x,
         y: n.data.y,
      }
      state.layout_data_mk_move_xy.display = n.data.display
   },
   // 添加模拟单元
   add_mndy_mu(state, n) {
      var data = {
         name: n.data.name
      }
      state.layout_data.con.splice(n.data.num, 0, data)
   },
   // 删除单元
   del_mndy_mu(state, n) {
      if (!state.layout_data.con[n.data.num]) { return }
      if (state.layout_data.con[n.data.num].name == "mn") {
         state.layout_data.con.splice(n.data.num, 1)
      }
   },
   // 添加单元数据
   add_dy_data_mu(state, n) {
      state.layout_data.con.splice(n.data.num, 0, n.data.data)
   },
   // 编辑模块
   edit_mk_mu(state, n) {
      console.log(n)
      state.edit_mk_data = n.data
   },
   // 隐藏编辑模块
   mokuai_mask_mu(state, n) {
      state.edit_mk_data.type = n.data
   }
}
const actions = {
   // 获取本地存储中的数据信息
   setlocalStorage_layout_data_ac(context, payload) {
      context.commit('setlocalStorage_layout_data_mu', payload)
   },
   // 添加单元
   layout_xy_choose_ac(context, payload) {
      context.commit('layout_xy_choose_mu', payload)
   },
   // 删除单元模块
   remove_layout_ac(context, payload) {
      context.commit("remove_layout_mu", payload)
   },
   // 获取页面编辑位置信息
   getEdit_xy_ac(context, payload) {
      context.commit("getEdit_xy_mu", payload)
   },
   getGuanli_xy_ac(context, payload) {
      context.commit("getGuanli_xy_mu", payload)
   },
   // 添加模块
   setEdit_mk_ac(context, payload) {
      context.commit("setEdit_mk_mu", payload)
   },
   //   删除提示框
   del_hint_mk_ac(context, payload) {
      context.commit("del_hint_mk_mu", payload)
   },
   // 删除编辑页模块
   del_mk_ac(context, payload) {
      context.commit("del_mk_mu", payload)

   },
   // 上下移动模块
   move_edit_mk_ac(context, payload) {
      context.commit("move_edit_mk_mu", payload)
   },
   //布局管理页单元布局改变
   layout_data_change_ac(context, payload) {
      context.commit("layout_data_change_mu", payload)
   },
   //布局管理页模块移动
   setmove_mk_ac(context, payload) {
      context.commit("setmove_mk_mu", payload)
   },
   // 获取模块坐标
   eventmove_mk_ac(context, payload) {
      context.commit("eventmove_mk_mu", payload)
   },
   // 获取模块移动坐标
   eventmove_mk_move_ac(context, payload) {
      context.commit("eventmove_mk_move_mu", payload)
   },
   // 删除模块信息
   del_layout_mk_ac(context, payload) {
      context.commit("del_layout_mk_mu", payload)
   },
   // 添加模块
   setEdit_move_mk_ac(context, payload) {
      context.commit("setEdit_move_mk_mu", payload)
   },
   // 添加模拟单元
   add_mndy_ac(context, payload) {
      context.commit("add_mndy_mu", payload)
   },
   // 删除单元
   del_mndy_ac(context, payload) {
      context.commit("del_mndy_mu", payload)
   },
   // 添加单元数据
   add_dy_data_ac(context, payload) {
      context.commit("add_dy_data_mu", payload)
   },
   // 编辑模块
   edit_mk_ac(context, payload) {
      context.commit("edit_mk_mu", payload)
   },
   // 隐藏编辑模块
   mokuai_mask_ac(context, payload) {
      context.commit("mokuai_mask_mu", payload)
   }
}
const action = Object.assign(
   actions,
   d_action,
   l_action
);
const mutation = Object.assign(
   mutations,
   d_mutation,
   l_mutation
);
export default new Vuex.Store({
   state,
   actions: action,
   mutations: mutation,
   // getters
})