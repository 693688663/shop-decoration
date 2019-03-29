export default {
  // 保存宝贝设置数据
  baby_set_data_ac: function (context, payload) {
    // console.log(payload)
    context.commit("baby_set_data_mu", payload)
  },
  // 首次发送数据信息
  first_save_data_ac: function (context, payload) {
    context.commit("first_save_data_mu", payload)
  },
  //  添加用户链接
  add_user_url_ac: function (context, payload) {
    context.commit("add_user_url_mu", payload)
  },
  // 删除用户链接
  del_user_url_ac: function (context, payload) {
    context.commit("del_user_url_mu", payload)
  },
  //导航显示切换
  change_data_show_ac: function (context, payload) {
    context.commit("change_data_show_mu", payload)
  },
} 