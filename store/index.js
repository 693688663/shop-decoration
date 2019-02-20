import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        //模板数据
        basice_data: {
            "0": {
                "name": "宝贝推荐",
                "icon": "mk_03.png", //
                "width_price": [190, 750, 950],
                "data": {
                    "width": null, //窗口宽度 
                    "auto_sort": null, //自动排序方式
                    "classify": null, //分类
                    "keyword": null, //关键字
                    "range_price": [], //价格范围
                    "num": null, //就显示个数
                    "line_num": null //一排显示个数 行
                },
                "div": function () {
                    return "<div></div>"
                }
            },
            "1": {
                "name": "宝贝排行",
                "icon": "mk_05.png",
                "width_price": [190]
            },
            "2": {
                "name": "默认分类",
                "icon": "mk_07.png",
                "width_price": [190]
            },
            "3": {
                "name": "个性分类",
                "icon": "mk_12.png",
                "width_price": [190]
            },
            "4": {
                "name": "自定义区",
                "icon": "mk_13.png",
                "width_price": [190, 750, 950],
                "layout": ["layout-bd", "layout-ft"],

            },
            "5": {
                "name": "图片轮播",
                "icon": "mk_14.png",
                "width_price": [190, 750, 950]
            },
            "6": {
                "name": "友情链接",
                "icon": "mk_18.png",
                "width_price": [190, 950]
            },
            "7": {
                "name": "客服中心",
                "icon": "mk_19.png",
                "width_price": [190]
            },
            "8": {
                "name": "生意参谋",
                "icon": "mk_20.png",
                "width_price": [190]
            },
            "9": {
                "name": "无线二维",
                "icon": "mk_24.png",
                "width_price": [190]
            },
            "10": {
                "name": "充值中心",
                "icon": "mk_25.png",
                "width_price": [190]
            },
            "11": {
                "name": "宝贝搜索",
                "icon": "mk_26.png",
                "width_price": [190, 750, 950]
            },
            "12": {
                "name": "满返",
                "icon": "mk_30.png",
                "width_price": [950]
            },
            "13": {
                "name": "红包",
                "icon": "mk_31.png",
                "width_price": [750, 950]
            },
            "14": {
                "name": "购物券",
                "icon": "mk_32.png",
                "width_price": [750, 950]
            },
            "15": {
                "name": "小黄条",
                "icon": "mk_36.png",
                "width_price": [950]
            },
            "16": {
                "name": "满减",
                "icon": "mk_37.png",
                "width_price": [950]
            },
            "17": {
                "name": "悬浮导航",
                "icon": "mk_38.png",
                "width_price": [1920]
            },
            "18": {
                "name": "全屏宽图",
                "icon": "mk_42.png",
                "width_price": [1920]
            },
            "19": {
                "name": "全屏轮播",
                "icon": "mk_43.png",
                "width_price": [1920],
                "layout": ["layout-bd"],
                "max_width": 1920,
                "data": {
                    "height": 120, //招牌高度
                    "name": null, //名称
                    "ba_img": null //背景图

                },
                "add": function (val) {
                    return eval("basice_data[" + val + "].div(basice_data[" + val + "].data.height, basice_data[" + val + "].data.name,  basice_data[" + val + "].name )")
                },
                "div": function (height, name, key) {
                    return "<div class='sign' value=" +
                        key +
                        " style='height: " +
                        height +
                        "px;position:relative'><h2 style='line-height:" +
                        height +
                        "px; font-weight: 500;'>" +
                        "全屏轮播" +
                        "</h2></div>";
                }
            },
            "20": {
                "name": "公益广告",
                "icon": "mk_44.png",
                "width_price": [190, 750, 950],
                "layout": ["layout-hd", "layout-bd", "layout-ft"],
                "data": {
                    "height": 120, //招牌高度
                    "width": null, //宽度
                    "name": null, //名称
                    "ba_img": null //背景图
                },
                "add": function (val) {
                    return eval("basice_data[" + val + "].div(basice_data[" + val + "].data.height, basice_data[" + val + "].data.name,  basice_data[" + val + "].name )")
                },
                "div": function (height, name, key) {
                    return "<div class='sign' value=" +
                        key +
                        " style='height: " +
                        height +
                        "px;position:relative'><h2 style='line-height:" +
                        height +
                        "px; font-weight: 500;'>" +
                        "公益广告" +
                        "</h2></div>"
                }
            },
            "21": {
                "name": "店铺招牌",
                "icon": "mk_48.png",
                "width_price": [190, 750, 950],
                "layout": ["layout-hd", "layout-bd", "layout-ft"],
                "data": {
                    "height": 120, //招牌高度
                    "name": null, //名称
                    "ba_img": null //背景图
                },
                "add": function (val) {
                    return eval("basice_data[" + val + "].div(basice_data[" + val + "].data.height, basice_data[" + val + "].data.name,  basice_data[" + val + "].name )")
                },
                "div": function (height, name, key) {
                    return "<div class='sign' value=" +
                        key +
                        " style='height: " +
                        height +
                        "px;position:relative'><h2 style='line-height:" +
                        height +
                        "px; font-weight: 500;'>" +
                        "店铺招牌" +
                        "</h2></div>";
                }
            },
            "22": {
                "name": "头部导航",
                "icon": "mk_48.png",
                "width_price": [950],
                "layout": ["layout-hd"],
                "data": {
                    "nav_li": []
                },
                "add": function (val) {
                    return eval("basice_data[" + val + "].div(basice_data[" + val + "].data.height, basice_data[" + val + "].data.name,  basice_data[" + val + "].name )")
                },
                "div": function (height, name, key) {
                    return "<div class='sign nav' value='" + key + "'><ul><li><a href=''>首页</a></li></ul></div>"

                }
            }
        },
        //布局数据及用户数据
        layout: {
            "layout_hd": [],
            "layout_bd": [],
            "layout_ft": [],
        },
        //模块的坐标以及其祖先模块的坐标
        domXy: {}
    },
    mutations: {

    },
    actions: {

    },
})
export default store