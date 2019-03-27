export default {
  // 保存宝贝设置数据
  baby_set_data_ac: function (context, payload) {
    console.log(payload)
    context.commit("baby_set_data_mu", payload)
  },
  // 首次发送数据信息
  first_save_data_ac: function (context, payload) {
    context.commit("first_save_data_mu", payload)
  },
  //  添加自定义链接
  again_data_ac: function (context, payload) {
    context.commit("again_data_mu", payload)
  },
  //  删除自定义链接
  del_url_ac: function (context, payload) {
    context.commit("del_url_mu", payload)
  },
} 