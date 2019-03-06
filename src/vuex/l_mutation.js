export default {
  //本地友情链接数据赋值到仓库
  f_links_data(state, n) {
    var site = state.edit_mk_data
    //console.log(n.data)
    if (site.location1 == "hd") {
      state.layout_data.hd[site.location4].data = n.data
    }
    if (site.location1 == "ft") {
      state.layout_data.ft[site.location4].data = n.data
      //console.log(state.layout_data.ft[site.location4].data)
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

  //设置初始化位置信息
  set_csh_mu(state, n) {
    var site = n.data.site;
    var data = n.data.linkdata;
    console.log(n.data)
    if (site.location1 == "hd") {
      state.layout_data.hd[site.location4].data = data
    }
    if (site.location1 == "ft") {
      state.layout_data.ft[site.location4].data = data
      //  console.log(state.layout_data.ft[site.location4].data)
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

  }
}