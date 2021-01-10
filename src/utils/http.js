//配置数据库交互
import Vue from "vue"
import axios from "axios"
import { Toast } from "vant"
import router from "../router"
import qs from "qs"

//开发时用到的  8080
// let baseUrl = "/api"
// Vue.prototype.$pre = "http://localhost:3000"

// 生产时使用
let baseUrl = ""
Vue.prototype.$pre = ""


// 请求拦截

axios.interceptors.request.use(req => {
    if (req.url != baseUrl + "/api/login" && req.url != baseUrl + "/api/register") {
        req.headers.authorization = JSON.parse(localStorage.getItem("user")).token;
    }
    return req;
})

//响应拦截
axios.interceptors.response.use(res => {
    // console.log("=========响应拦截:本次请求的地址是" + res.config.url + "===========");
    // console.log(res);
    //如果code不是200就弹框
    if (res.data.code !== 200) {
        //弹框  
        Toast(res.data.msg);
    }

    //如果掉线了就自动跳转到登录页面
    if (res.data.msg === "登录已过期或访问权限受限") {
        //跳转页面
        router.push("/login");
    }
    return res;
})

//注册
export let reqRegister = (data) => {
    return axios({
        url: baseUrl + "/api/register",
        method: "post",
        data: qs.stringify(data)
    })
}

//登录
export let reqLogin = (data) => {
    return axios({
        url: baseUrl + "/api/login",
        method: "post",
        data: qs.stringify(data)
    })
}

//banner轮播图
export let reqBanner = () => {
    return axios({
        url: baseUrl + "/api/getbanner",
        method: "get"
    })
}

//限时抢购
// export let reqSeckill = () => {
//     return axios({
//         url: baseUrl + "/api/getseckill",
//         method:"get"
//     })
// }

//首页商品列表
export let reqListGoods = () => {
    return axios({
        url: baseUrl + "/api/getindexgoods",
        method: "get"
    })
}

//首页下的分类页面
export let reqCate = () => {
    return axios({
        url: baseUrl + "/api/getcatetree",
        method: "get"
    })
}

//获取单个的商品信息
export let getGoodsInfo = (id) => {
    return axios({
        url: baseUrl + "/api/getgoodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}

//获取分类商品的信息
export let getCateListGoods = (fid) => {
    return axios({
        url: baseUrl + "/api/getgoods",
        method: "get",
        params: {
            fid
        }
    })
}

//添加购物车
export let addCart = (data) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/cartadd",
        data: qs.stringify(data)
    })
}

//取出购物车中的商品  cartlist
export let getCart = (uid) => {
    return axios({
        method: "get",
        url: baseUrl + "/api/cartlist",
        params: {
            uid
        }
    })
}

//改变购物车的商品数量
export let goodsNumUpdate = (data) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/cartedit",
        data: qs.stringify(data)
    })
}

//删除购物车商品
export let deleteGoods = (id) => {
    return axios({
        method: "post",
        url: baseUrl + "/api/cartdelete",
        data: qs.stringify({ id })
    })
}