
export default {
    //获取本地存储友情链接数据
    link_data: function (context, data) {
       context.commit("f_links_data", data)
         //console.log(data)
    },

    //初始化信息存储到本地仓库
    set_csh_info: function (context, data) {
      context.commit("set_csh_mu", data)
        //console.log(data)
   },
 
 }