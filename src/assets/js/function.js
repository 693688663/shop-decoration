export default {
   // 保存数据
   save_data(dispatch, data) {
      dispatch({
         type: "baby_set_data_ac",
         data: data
      })
   },
   get_data(site, layout_data) {
      // 根据位置获取模块设置数据
      if (site.location1 == "hd") {
         return JSON.parse(JSON.stringify(layout_data.hd[site.location4].data))
      }
      if (site.location1 == "ft") {
         return JSON.parse(JSON.stringify(layout_data.ft[site.location4].data))
      }
      if (site.location1 == "con") {
         if (site.location3 == "w19") {
            return JSON.parse(JSON.stringify(layout_data.con[site.location2].w19[site.location4].data))
         }
         if (site.location3 == "w75") {
            return JSON.parse(JSON.stringify(layout_data.con[site.location2].w75[site.location4].data))
         }
         if (site.location3 == "center") {
            return JSON.parse(JSON.stringify(layout_data.con[site.location2].w1920[site.location4].data))
         }
      }
   },
}