import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//一级路由
let login = () => Promise.resolve(import("../pages/login/login"));
let register = () => Promise.resolve(import("../pages/register/register"));
let index = () => Promise.resolve(import("../pages/index/index"));
let detail = () => Promise.resolve(import("../pages/detail/detail"));
let catelist = () => Promise.resolve(import("../pages/catelist/catelist"));
let order = () => Promise.resolve(import("../pages/order/order"));
let search = () => Promise.resolve(import("../pages/search/search"));

//二级路由
let home = () => Promise.resolve(import("../pages/home/home"));
let cate = () => Promise.resolve(import("../pages/cate/cate"));
let shop = () => Promise.resolve(import("../pages/shop/shop"));
let mine = () => Promise.resolve(import("../pages/mine/mine"));

//配置路由规则
let router = new Router({
  routes: [
    {
      path: "/login",
      name: "登录",
      component: login
    },
    {
      path: "/register",
      name: "注册",
      component: register
    },
    {
      path: "/index",
      component: index,
      children: [
        {
          path: "home",
          name: "首页",
          component: home
        },
        {
          path: "cate",
          name: "分类",
          component: cate
        },
        {
          path: "shop",
          name: "购物车",
          component: shop
        },
        {
          path: "mine",
          name: "我的",
          component: mine
        },
        {
          path: "",
          redirect: "/index/home"
        },
      ]
    },
    {
      path: "/detail",
      name: "商品详情",
      component: detail,
    },
    {
      path: "/catelist",
      name: "商品列表",
      component: catelist,
      beforeEnter(to, from, next) {
        //判断是从哪里来的
        if (from.path === "/index/cate" || from.path === "/detail") {
          //不拦截
          next();
          return;
        }
        next("/index/home");
      }
    },
    {
      path: "/order",
      name: "订单",
      component: order
    },
    {
      path: "/search",
      component: search
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
})

//登录拦截
router.beforeEach((to, from, next) => {
  let isLogin = localStorage.getItem("isLogin");
  if (to.path === "/login" || to.path === "/register" || isLogin) {
    //不拦截
    next();
    return;
  }
  next("/login");
})

export default router;