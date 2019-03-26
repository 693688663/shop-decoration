
export default {
  // 宝贝推荐赋值
  baby_set_data_mu(state, n) {
    var site = state.edit_mk_data
    if (site.location1 == "hd") {
      state.layout_data.hd[site.location4].data = n.data
    }
    if (site.location1 == "ft") {
      state.layout_data.ft[site.location4].data = n.data
    }
    if (site.location1 == "con") {
      if (site.location3 == "w19") {
        state.layout_data.con[site.location2].w19[site.location4].data = n.data
      }
      if (site.location3 == "w75") {
        state.layout_data.con[site.location2].w75[site.location4].data = n.data
      }
      if (site.location3 == "center") {
        state.layout_data.con[site.location2].w1920[site.location4].data = n.data
      }
    }
  },
  first_save_data_mu(state, n) {
    var site = n.data.site
    var data = n.data.data
    if (site.location1 == "hd") {
      state.layout_data.hd[site.location4].data = data
    }
    if (site.location1 == "ft") {
      state.layout_data.ft[site.location4].data = data
    }
    if (site.location1 == "con") {
      if (site.location3 == "w19") {
        state.layout_data.con[site.location2].w19[site.location4].data = data
      }
      if (site.location3 == "w75") {
        state.layout_data.con[site.location2].w75[site.location4].data = data
      }
      if (site.location3 == "center") {
        state.layout_data.con[site.location2].w1920[site.location4].data = data
      }
    }
  },
  // 添加自定义链接
  again_data_mu(state, n) {
    var site = state.edit_mk_data
    if (site.location1 == "hd") {
      state.layout_data.hd[site.location4].data[Object.keys(state.layout_data.hd[site.location4].data).length] = n.data
    }
  },
  // 删除自定义链接
  del_url_mu(state, n) {
    var site = state.edit_mk_data
    if (site.location1 == "hd") {
      delete state.layout_data.hd[site.location4].data[n.data];
    }
  },
} 