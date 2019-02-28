export default {
   // 保存数据
   save_data(dispatch, data) {
      dispatch({
         type: "baby_set_data_ac",
         data: data
      })
   },
   get_data(site, layout_data) {
      console.log(site)
      var data_list = {};
      // 根据位置获取模块设置数据
      if (site.location1 == "hd") {
         data_list = layout_data.hd[site.location4].data
      }
      if (site.location1 == "ft") {
         data_list = layout_data.ft[site.location4].data
      }
      if (site.location1 == "con") {
         if (site.location3 == "w19") {
            data_list = layout_data.con[site.location2].w19[site.location4].data
         }
         if (site.location3 == "w75") {
            data_list = layout_data.con[site.location2].w75[site.location4].data
         }
         if (site.location3 == "center") {
            data_list = layout_data.con[site.location2].w1920[site.location4].data
         }
      }
      // 当模块内部数据有意义则更新当前数据
      if (data_list.show_name) {
         return data_list
      }
      return
   },
}