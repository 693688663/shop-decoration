
export default {
    //获取本地存储友情链接数据
    link_data: function (context, data) {
       context.commit("f_links_data", data)
         console.log(data)
    },
 
 }