<template>
  <div class="index">
    <header v-if="$route.path =='/index/home'?true:false" class="header header2">
      <div class="left">
        <img :src="logo" alt />
      </div>
      <div class="right">
        <input type="text" @focus="inputFocus" placeholder="请输入搜索词" />
      </div>
    </header>

    <router-view class="indexinner"></router-view>
    <tab-bar :list="list"></tab-bar>
  </div>
</template>

<script>
import tab_home_hig from "../../assets/img/tab_home_hig.png";
import tab_home_nor from "../../assets/img/tab_home_nor.png";
import tab_menu_hig from "../../assets/img/tab_menu_hig.png";
import tab_menu_nor from "../../assets/img/tab_menu_nor.png";
import tab_me_hig from "../../assets/img/tab_me_hig.png";
import tab_me_nor from "../../assets/img/tab_me_nor.png";
import tab_shopping_hig from "../../assets/img/tab_shopping_hig.png";
import tab_shopping_nor from "../../assets/img/tab_shopping_nor.png";

import logo from "../../assets/img/img/home/logo.jpg";
import "../../components/index";
export default {
  data() {
    return {
      logo,
      list: [
        {
          path: "/index/home",
          select_img: tab_home_hig,
          no_select: tab_home_nor,
          text: "首页",
        },
        {
          path: "/index/cate",
          select_img: tab_menu_hig,
          no_select: tab_menu_nor,
          text: "分类",
        },
        {
          path: "/index/shop",
          select_img: tab_shopping_hig,
          no_select: tab_shopping_nor,
          text: "购物车",
        },
        {
          path: "/index/mine",
          select_img: tab_me_hig,
          no_select: tab_me_nor,
          text: "我的",
        },
      ],
    };
  },
  methods: {
    inputFocus() {
      console.log("聚焦了");
      this.$router.push("/search");
    },
  },
};
</script>

<style scoped lang="stylus">
@import '../../stylus/index.styl';

.indexinner {
  padding: $header 0 2rem 0;
}

.header2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $header;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: $selectColor;
}

.header2 img {
  width: 2rem;
}

.header2 .right {
  width: 3rem;
}

.right input {
  border: 1px solid #ccc;
  width: 2.5rem;
  height: 0.6rem;
  border-radius: 0.3rem;
  text-indent: 0.3rem;
}
</style>